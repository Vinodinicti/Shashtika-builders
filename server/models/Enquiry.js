import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      index: true,
      default: () => `ENQ-${Date.now().toString().slice(-6)}`
    },
    // Customer Contact Details
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },

    // Plot & Project Requirements
    project: {
      type: String,
      default: 'Coimbatore & Pollachi Corridors',
      trim: true
    },
    plotNumber: {
      type: String,
      default: 'General Layout Enquiry',
      trim: true
    },
    message: {
      type: String,
      default: 'Interested in DTCP approved layout plot.',
      trim: true
    },
    budget: {
      type: String,
      default: '₹ 25.00 - 40.00 Lakhs'
    },
    timeline: {
      type: String,
      default: 'Immediate (Within 15 Days)'
    },
    paymentMode: {
      type: String,
      default: 'Bank Loan / Self Funded'
    },
    siteVisitRequested: {
      type: Boolean,
      default: false
    },

    // =========================================================================
    // AI LEAD PRIORITIZATION DATA
    // =========================================================================
    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 70,
      index: true
    },
    aiPriority: {
      type: String,
      enum: ['HIGH PRIORITY', 'MEDIUM PRIORITY', 'STANDARD'],
      default: 'STANDARD',
      index: true
    },
    category: {
      type: String,
      enum: ['HOT', 'WARM', 'COLD'],
      default: 'WARM'
    },
    aiSummary: {
      type: String,
      default: ''
    },
    recommendedAction: {
      type: String,
      default: ''
    },

    // =========================================================================
    // WORKFLOW & CRM MANAGEMENT
    // =========================================================================
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'SITE_VISIT_SCHEDULED', 'IN_PROGRESS', 'BOOKED', 'CLOSED'],
      default: 'NEW',
      index: true
    },
    assignedStaff: {
      type: String,
      default: 'Unassigned'
    },
    adminNotes: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'Website Contact / Plot Modal'
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast lookup and priority filtering
enquirySchema.index({ aiScore: -1, createdAt: -1 });
enquirySchema.index({ status: 1, aiPriority: 1 });

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
