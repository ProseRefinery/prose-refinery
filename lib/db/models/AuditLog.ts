import mongoose, { Schema, Document, Model } from "mongoose";

export type AuditAction =
  | "view_conversation"
  | "search_messages"
  | "export_messages"
  | "view_project"
  | "update_project_status"
  | "assign_editor"
  | "approve_editor"
  | "reject_editor"
  | "suspend_user"
  | "login"
  | "update_user";

export interface IAuditLog extends Document {
  _id: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  action: AuditAction;
  resourceType: "conversation" | "message" | "project" | "user" | "editor_application";
  resourceId?: mongoose.Types.ObjectId;
  reason?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "view_conversation",
        "search_messages",
        "export_messages",
        "view_project",
        "update_project_status",
        "assign_editor",
        "approve_editor",
        "reject_editor",
        "suspend_user",
        "login",
        "update_user",
      ],
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["conversation", "message", "project", "user", "editor_application"],
    },
    resourceId: {
      type: Schema.Types.ObjectId,
    },
    reason: {
      type: String,
      maxlength: 500,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Index for efficient queries
AuditLogSchema.index({ adminId: 1, createdAt: -1 });
AuditLogSchema.index({ resourceType: 1, resourceId: 1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

export default AuditLog;

// Helper function to create audit log entries
export async function logAdminAction(
  adminId: string,
  action: AuditAction,
  resourceType: IAuditLog["resourceType"],
  resourceId?: string,
  reason?: string,
  metadata?: Record<string, unknown>,
  request?: { ip?: string; headers?: { get: (name: string) => string | null } }
) {
  try {
    await AuditLog.create({
      adminId: new mongoose.Types.ObjectId(adminId),
      action,
      resourceType,
      resourceId: resourceId ? new mongoose.Types.ObjectId(resourceId) : undefined,
      reason,
      metadata,
      ipAddress: request?.ip,
      userAgent: request?.headers?.get?.("user-agent") || undefined,
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}
