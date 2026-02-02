import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConversation extends Document {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  projectId?: mongoose.Types.ObjectId;
  subject?: string;
  lastMessageAt: Date;
  lastMessagePreview?: string;
  // Track read/unread per participant
  readBy: {
    odataId: mongoose.Types.ObjectId;
    readAt: Date;
  }[];
  // Archive status per participant
  archivedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    lastMessagePreview: {
      type: String,
      maxlength: 100,
    },
    readBy: [{
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      readAt: { type: Date, default: Date.now },
    }],
    archivedBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes
ConversationSchema.index({ participants: 1, lastMessageAt: -1 });
ConversationSchema.index({ projectId: 1 });

const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
