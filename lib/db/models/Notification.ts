import mongoose, { Schema, Document, Model } from "mongoose";

export type NotificationType =
  // Project lifecycle
  | "project_submitted"
  | "project_paid"
  | "project_assigned"
  | "project_started"
  | "project_completed"
  | "project_cancelled"
  // Document related
  | "document_request"
  | "document_uploaded"
  | "document_approved"
  | "document_rejected"
  // Bidding
  | "new_bid"
  | "bid_accepted"
  | "bid_rejected"
  | "job_available"
  // Editor status
  | "editor_approved"
  | "editor_rejected"
  | "editor_suspended"
  // Messaging
  | "new_message"
  // Payments
  | "payment_received"
  | "payout_sent";

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  metadata?: {
    projectId?: string;
    referenceNumber?: string;
    serviceType?: string;
    editorId?: string;
    editorName?: string;
    authorId?: string;
    authorName?: string;
    bidAmount?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "project_submitted",
        "project_paid",
        "project_assigned",
        "project_started",
        "project_completed",
        "project_cancelled",
        "document_request",
        "document_uploaded",
        "document_approved",
        "document_rejected",
        "new_bid",
        "bid_accepted",
        "bid_rejected",
        "job_available",
        "editor_approved",
        "editor_rejected",
        "editor_suspended",
        "new_message",
        "payment_received",
        "payout_sent",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: String,
    read: {
      type: Boolean,
      default: false,
    },
    metadata: {
      projectId: String,
      referenceNumber: String,
      serviceType: String,
      editorId: String,
      editorName: String,
      authorId: String,
      authorName: String,
      bidAmount: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
