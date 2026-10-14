import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB, isDbConnected } from './db.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure local data directory exists for fallback & cache
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'enquiries.json');

function readEnquiries() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8')) || [];
  } catch (err) {
    return [];
  }
}

function saveEnquiries(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to local JSON cache:', err.message);
  }
}

// Auto-migrate local JSON records into MongoDB if collection is freshly connected
async function migrateJsonToMongoIfEmpty() {
  try {
    if (!isDbConnected()) return;
    const count = await Enquiry.countDocuments();
    if (count === 0) {
      const localList = readEnquiries();
      if (localList.length > 0) {
        console.log(`📦 Auto-migrating ${localList.length} existing local enquiries into MongoDB...`);
        for (const item of localList) {
          await Enquiry.updateOne(
            { id: item.id },
            { $setOnInsert: item },
            { upsert: true }
          );
        }
        console.log('✅ Local enquiries successfully seeded into MongoDB.');
      }
    }
  } catch (err) {
    console.error('Error during auto-migration to MongoDB:', err.message);
  }
}

// Connect to MongoDB upon server initialization
connectDB().then((connected) => {
  if (connected) {
    migrateJsonToMongoIfEmpty();
  }
});

// =========================================================================
// AI LEAD PRIORITIZATION SCORING ALGORITHM
// =========================================================================
function evaluateAiLeadScore(body) {
  let score = 70;
  const reasons = [];

  const rawPlot = String(body.plotNumber || body.targetPlot || body.plot || '').trim();
  const rawMessage = String(body.message || body.notes || body.specification || '').trim();

  // 1. SPECIFIC PLOT PICKED (e.g. Plot #01, Plot #14, East Facing, etc.)
  const hasSpecificPlot = rawPlot && !/general|layout|any/i.test(rawPlot);
  if (hasSpecificPlot) {
    score += 10;
    reasons.push(`Specific plot chosen (${rawPlot})`);
  }

  // 2. DETAILED SPECIFICATIONS OR CUSTOM NOTES TYPED
  const hasCustomNotes = rawMessage && rawMessage.length >= 8 && !/^(site visit request)$/i.test(rawMessage);
  if (hasCustomNotes) {
    score += 10;
    reasons.push('Custom specifications & buyer requirements provided');
  }

  // CRITICAL RULE: If customer is specific picking plot number AND typing specifications or notes -> AUTOMATIC HIGH PRIORITY / HOT LEAD (92-98)
  if (hasSpecificPlot && hasCustomNotes) {
    score = Math.max(score, 94);
    reasons.push('HIGH PRIORITY: Specific Plot + Custom Specifications/Notes');
  }

  if (body.phone && String(body.phone).replace(/\D/g, '').length >= 10) {
    score += 5;
    reasons.push('Verified phone number');
  }

  if (body.siteVisitRequested || /visit|site|see|inspect/i.test(rawMessage)) {
    score += 5;
    reasons.push('Direct site visit requested');
  }

  const budget = String(body.budget || '');
  if (/50|lakh|crore|40|35|30/i.test(budget)) {
    score += 4;
    reasons.push('Confirmed budget allocation');
  }

  score = Math.min(score, 98);

  // If specific plot and custom notes, strictly guarantee High Priority HOT category (>= 90)
  if (hasSpecificPlot && hasCustomNotes) {
    score = Math.max(score, 92);
  }

  const priority = score >= 80 ? 'HIGH PRIORITY' : (score >= 60 ? 'MEDIUM PRIORITY' : 'STANDARD');
  const category = score >= 80 ? 'HOT' : (score >= 60 ? 'WARM' : 'COLD');

  return {
    score,
    priority,
    category,
    summary: `Customer intent evaluated at ${score}/100 (${priority}): ${reasons.join(', ')}.`,
    recommendedAction: score >= 80
      ? `Call immediately regarding ${rawPlot || 'selected plot'}; client specified custom requirements and is ready for site booking.`
      : 'Schedule automated follow-up & layout brochure sharing'
  };
}

// =========================================================================
// API ROUTES
// =========================================================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'SHASHTIKA Backend API',
    database: isDbConnected() ? 'MongoDB Connected' : 'Local JSON Storage',
    timestamp: new Date().toISOString()
  });
});

// Database Connection Status
app.get('/api/db-status', (req, res) => {
  res.json({
    connected: isDbConnected(),
    storageMode: isDbConnected() ? 'MongoDB' : 'Local JSON Fallback',
    uriConfigured: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0)
  });
});

// 1. GET ALL ENQUIRIES (From MongoDB if connected, else JSON fallback)
app.get('/api/enquiries', async (req, res) => {
  try {
    if (isDbConnected()) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return res.json({
        success: true,
        count: enquiries.length,
        storage: 'MongoDB',
        data: enquiries
      });
    }

    // Fallback
    const enquiries = readEnquiries();
    return res.json({
      success: true,
      count: enquiries.length,
      storage: 'Local JSON',
      data: enquiries
    });
  } catch (err) {
    console.error('Error fetching enquiries:', err.message);
    const enquiries = readEnquiries();
    return res.json({
      success: true,
      count: enquiries.length,
      storage: 'Local JSON (Error Fallback)',
      data: enquiries
    });
  }
});

// 2. CREATE NEW ENQUIRY (Evaluates AI Lead Score and saves to MongoDB)
app.post('/api/enquiries', async (req, res) => {
  try {
    const customerName = (req.body.customerName || req.body.name || '').trim();
    const phone = (req.body.phone || '').trim();
    const email = (req.body.email || '').trim();
    const { project, plotNumber, message, budget, timeline, paymentMode, siteVisitRequested } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone number are required.' });
    }

    // AI Evaluation
    const aiEval = evaluateAiLeadScore(req.body);

    const enquiryPayload = {
      id: `ENQ-${Date.now().toString().slice(-6)}`,
      customerName,
      phone,
      email,
      project: project || 'Coimbatore & Pollachi Corridors',
      plotNumber: plotNumber || 'General Layout Enquiry',
      message: message || 'Interested in DTCP approved layout plot.',
      budget: budget || '₹ 25.00 - 40.00 Lakhs',
      timeline: timeline || 'Immediate (Within 15 Days)',
      paymentMode: paymentMode || 'Bank Loan / Self Funded',
      siteVisitRequested: Boolean(siteVisitRequested),
      aiScore: aiEval.score,
      aiPriority: aiEval.priority,
      category: aiEval.category,
      aiSummary: aiEval.summary,
      recommendedAction: aiEval.recommendedAction,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    let savedLead = enquiryPayload;

    if (isDbConnected()) {
      try {
        const doc = await Enquiry.create(enquiryPayload);
        savedLead = doc.toObject();
      } catch (dbErr) {
        console.error('Failed to write enquiry to MongoDB, saving to local JSON:', dbErr.message);
      }
    }

    // Always keep local JSON cache synchronized
    const localList = readEnquiries();
    localList.unshift(enquiryPayload);
    saveEnquiries(localList);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully with AI lead evaluation.',
      storage: isDbConnected() ? 'MongoDB' : 'Local JSON Cache',
      lead: savedLead
    });
  } catch (err) {
    console.error('Error creating enquiry:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 3. UPDATE ENQUIRY STATUS / ASSIGNED STAFF / NOTES
app.patch('/api/enquiries/:id', async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const updates = req.body;

    let updatedDoc = null;

    if (isDbConnected()) {
      updatedDoc = await Enquiry.findOneAndUpdate(
        { id: enquiryId },
        { $set: updates },
        { new: true }
      ).lean();
    }

    // Update in local JSON cache as well
    const localList = readEnquiries();
    const idx = localList.findIndex((item) => item.id === enquiryId);
    if (idx !== -1) {
      localList[idx] = { ...localList[idx], ...updates, updatedAt: new Date().toISOString() };
      saveEnquiries(localList);
      if (!updatedDoc) updatedDoc = localList[idx];
    }

    if (!updatedDoc) {
      return res.status(404).json({ success: false, error: 'Enquiry not found.' });
    }

    return res.json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: updatedDoc
    });
  } catch (err) {
    console.error('Error updating enquiry:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 4. DELETE ENQUIRY
app.delete('/api/enquiries/:id', async (req, res) => {
  try {
    const enquiryId = req.params.id;

    if (isDbConnected()) {
      await Enquiry.findOneAndDelete({ id: enquiryId });
    }

    const localList = readEnquiries().filter((item) => item.id !== enquiryId);
    saveEnquiries(localList);

    return res.json({ success: true, message: `Enquiry ${enquiryId} deleted.` });
  } catch (err) {
    console.error('Error deleting enquiry:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✨ SHASHTIKA Node.js API Server running on http://localhost:${PORT}`);
  console.log(`📡 Storage Engine: ${isDbConnected() ? 'MongoDB' : 'Local JSON Fallback'}`);
});
