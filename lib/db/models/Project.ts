import mongoose, { Schema, Document, Model } from "mongoose";

export type ProjectStatus =
  | "draft"
  | "submitted"
  | "pending_payment"
  | "paid"
  | "matching"
  | "assigned"
  | "in_progress"
  | "review"
  | "revision"
  | "completed"
  | "cancelled";

export type ServiceType =
  | "structural_diagnostic"    // Tier 1 - Story Integrity Diagnostic
  | "single_pillar"            // Tier 2 - Single-Pillar Structural Audit
  | "full_structural"          // Tier 3 - Full Structural Edit
  | "editorial_partnership"    // Tier 4 - Editorial Partnership
  | "line_editing"             // Marketplace
  | "copyediting"              // Marketplace
  | "proofreading";            // Marketplace

export type Genre =
  | "fantasy"
  | "science_fiction"
  | "horror"
  | "urban_fantasy"
  | "epic_fantasy"
  | "space_opera"
  | "dystopian"
  | "paranormal"
  | "magical_realism"
  | "other";

export interface IDocumentRequest {
  _id?: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  status: "pending" | "uploaded" | "approved" | "rejected";
  requestedAt: Date;
  uploadedAt?: Date;
  uploadedUrl?: string;
  rejectionReason?: string;
}

export interface IBid {
  _id?: mongoose.Types.ObjectId;
  editorId: mongoose.Types.ObjectId;
  amount: number;
  turnaroundDays: number;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  createdAt: Date;
}

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  editorId?: mongoose.Types.ObjectId;
  referenceNumber: string;
  // Manuscript details
  title: string;
  genre: Genre;
  wordCount: number;
  synopsis?: string;
  stage: "early_draft" | "first_draft" | "revised" | "polished";
  // Service details
  serviceType: ServiceType;
  status: ProjectStatus;
  priority: "normal" | "rush";
  price: number;
  editorPayout?: number;
  // Stripe
  stripePaymentId?: string;
  stripeSessionId?: string;
  // Files
  manuscriptUrl?: string;
  manuscriptFileName?: string;
  deliverables: {
    name: string;
    url: string;
    uploadedAt: Date;
    type: string;
  }[];
  documentRequests: IDocumentRequest[];
  // Bidding (for marketplace services)
  bids: IBid[];
  biddingDeadline?: Date;
  // Timeline
  timeline: {
    status: ProjectStatus;
    message: string;
    createdAt: Date;
    userId?: mongoose.Types.ObjectId;
  }[];
  // Notes
  notes: {
    content: string;
    createdAt: Date;
    isInternal: boolean;
    authorId?: mongoose.Types.ObjectId;
  }[];
  // Dates
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    editorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    referenceNumber: {
      type: String,
      unique: true,
      index: true,
    },
    // Manuscript details
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "fantasy",
        "science_fiction",
        "horror",
        "urban_fantasy",
        "epic_fantasy",
        "space_opera",
        "dystopian",
        "paranormal",
        "magical_realism",
        "other",
      ],
    },
    wordCount: {
      type: Number,
      required: true,
    },
    synopsis: {
      type: String,
      maxlength: 2000,
    },
    stage: {
      type: String,
      enum: ["early_draft", "first_draft", "revised", "polished"],
      default: "first_draft",
    },
    // Service details
    serviceType: {
      type: String,
      required: true,
      enum: [
        "structural_diagnostic",
        "single_pillar",
        "full_structural",
        "editorial_partnership",
        "line_editing",
        "copyediting",
        "proofreading",
      ],
    },
    status: {
      type: String,
      default: "draft",
      enum: [
        "draft",
        "submitted",
        "pending_payment",
        "paid",
        "matching",
        "assigned",
        "in_progress",
        "review",
        "revision",
        "completed",
        "cancelled",
      ],
    },
    priority: {
      type: String,
      default: "normal",
      enum: ["normal", "rush"],
    },
    price: {
      type: Number,
      required: true,
    },
    editorPayout: {
      type: Number,
    },
    // Stripe
    stripePaymentId: String,
    stripeSessionId: String,
    // Files
    manuscriptUrl: String,
    manuscriptFileName: String,
    deliverables: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
        type: { type: String, required: true },
      },
    ],
    documentRequests: [
      {
        name: { type: String, required: true },
        description: String,
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "uploaded", "approved", "rejected"],
        },
        requestedAt: { type: Date, default: Date.now },
        uploadedAt: Date,
        uploadedUrl: String,
        rejectionReason: String,
      },
    ],
    // Bidding
    bids: [
      {
        editorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, required: true },
        turnaroundDays: { type: Number, required: true },
        message: String,
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "accepted", "rejected", "withdrawn"],
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    biddingDeadline: Date,
    // Timeline
    timeline: [
      {
        status: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    // Notes
    notes: [
      {
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        isInternal: { type: Boolean, default: false },
        authorId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    // Dates
    dueDate: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Generate reference number on creation
ProjectSchema.pre("save", async function () {
  if (this.isNew) {
    if (!this.referenceNumber) {
      const year = new Date().getFullYear();
      const count = await mongoose.models.Project.countDocuments();
      const sequence = String(count + 1).padStart(5, "0");
      this.referenceNumber = `PR-${year}-${sequence}`;
    }

    // Add initial timeline entry
    if (this.timeline.length === 0) {
      this.timeline.push({
        status: this.status,
        message: "Project created",
        createdAt: new Date(),
      });
    }
  }
});

// Indexes for efficient queries
ProjectSchema.index({ authorId: 1, status: 1 });
ProjectSchema.index({ editorId: 1, status: 1 });
ProjectSchema.index({ status: 1, createdAt: -1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
