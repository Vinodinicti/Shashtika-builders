import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure data directory exists
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
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// AI Lead Prioritization Scoring Algorithm
function evaluateAiLeadScore(body) {
  let score = 75;
  const reasons = [];

  if (body.phone && body.phone.replace(/\D/g, '').length >= 10) {
    score += 10;
    reasons.push('Verified phone number');
  }

  if (body.siteVisitRequested || (body.message && /visit|site|see/i.test(body.message))) {
    score += 8;
    reasons.push('High intent for direct site visit');
  }

  if (body.plotNumber && body.plotNumber.trim()) {
    score += 5;
    reasons.push('Specific plot selected');
  }

  const budget = body.budget || '';
  if (/50|lakh|crore|40/i.test(budget)) {
    score += 5;
    reasons.push('High budget allocation');
  }

  score = Math.min(score, 98);
  const priority = score >= 85 ? 'HIGH PRIORITY' : (score >= 75 ? 'MEDIUM PRIORITY' : 'STANDARD');

  return {
    score,
    priority,
    summary: `Customer intent evaluated at ${score}/100 based on ${reasons.join(', ') || 'standard criteria'}.`,
    recommendedAction: score >= 85 ? 'Direct call from Senior Project Engineer within 30 minutes' : 'Schedule automated follow-up & layout brochure sharing'
  };
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'SHASHTIKA Backend API', timestamp: new Date().toISOString() });
});

// Enquiries API
app.get('/api/enquiries', (req, res) => {
  const enquiries = readEnquiries();
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

app.post('/api/enquiries', (req, res) => {
  const { customerName, phone, project, plotNumber, message, budget, timeline, paymentMode, siteVisitRequested } = req.body;

  if (!customerName || !phone) {
    return res.status(400).json({ success: false, error: 'Name and phone number are required.' });
  }

  const aiEval = evaluateAiLeadScore(req.body);
  const newEnquiry = {
    id: `ENQ-${Date.now().toString().slice(-6)}`,
    customerName,
    phone,
    project: project || 'Coimbatore & Pollachi Corridors',
    plotNumber: plotNumber || 'General Layout Enquiry',
    message: message || 'Interested in DTCP approved layout plot.',
    budget: budget || '₹ 25.00 - 40.00 Lakhs',
    timeline: timeline || 'Immediate (Within 15 Days)',
    paymentMode: paymentMode || 'Bank Loan / Self Funded',
    siteVisitRequested: Boolean(siteVisitRequested),
    aiScore: aiEval.score,
    aiPriority: aiEval.priority,
    aiSummary: aiEval.summary,
    recommendedAction: aiEval.recommendedAction,
    status: 'NEW',
    createdAt: new Date().toISOString()
  };

  const list = readEnquiries();
  list.unshift(newEnquiry);
  saveEnquiries(list);

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully with AI lead evaluation.',
    lead: newEnquiry
  });
});

app.listen(PORT, () => {
  console.log(`✨ SHASHTIKA Node.js API Server running on http://localhost:${PORT}`);
});
