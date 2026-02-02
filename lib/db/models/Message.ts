import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttachment {
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  attachments: IAttachment[];
  type: "text" | "system";
  readBy: {
    userId: mongoose.Types.ObjectId;
    readAt: Date;
  }[];
  deletedFor: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [{
      filename: { type: String, required: true },
      originalName: { type: String, required: true },
      url: { type: String, required: true },
      size: { type: Number, required: true },
      mimeType: { type: String, required: true },
    }],
    type: {
      type: String,
      enum: ["text", "system"],
      default: "text",
    },
    readBy: [{
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      readAt: { type: Date, default: Date.now },
    }],
    deletedFor: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  {
    timestamps: true,
  }
);

// Index for fetching messages in a conversation
MessageSchema.index({ conversationId: 1, createdAt: 1 });

const Message: Model<IMessage> =
  mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
