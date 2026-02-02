import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface NotificationPreferences {
  email: {
    projectUpdates: boolean;
    documentRequests: boolean;
    messages: boolean;
    marketing: boolean;
  };
  inApp: {
    projectUpdates: boolean;
    documentRequests: boolean;
    messages: boolean;
  };
}

export const defaultNotificationPreferences: NotificationPreferences = {
  email: {
    projectUpdates: true,
    documentRequests: true,
    messages: true,
    marketing: false,
  },
  inApp: {
    projectUpdates: true,
    documentRequests: true,
    messages: true,
  },
};

export type UserRole = "author" | "editor" | "admin";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  phone?: string;
  // Author-specific
  authorNumber?: string;
  penName?: string;
  // Editor-specific
  editorNumber?: string;
  editorStatus?: "pending" | "approved" | "rejected" | "suspended";
  editorTier?: "junior" | "senior" | "expert";
  specialties?: string[];
  bio?: string;
  portfolioUrl?: string;
  hourlyRate?: number;
  // General
  role: UserRole;
  isActive: boolean;
  notificationPreferences: NotificationPreferences;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date;
  image?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    // Author fields
    authorNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    penName: {
      type: String,
      trim: true,
    },
    // Editor fields
    editorNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    editorStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },
    editorTier: {
      type: String,
      enum: ["junior", "senior", "expert"],
    },
    specialties: [{
      type: String,
      enum: ["structural", "developmental", "line", "copy", "proofread"],
    }],
    bio: {
      type: String,
      maxlength: 1000,
    },
    portfolioUrl: {
      type: String,
    },
    hourlyRate: {
      type: Number,
    },
    // General
    role: {
      type: String,
      enum: ["author", "editor", "admin"],
      default: "author",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notificationPreferences: {
      email: {
        projectUpdates: { type: Boolean, default: true },
        documentRequests: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false },
      },
      inApp: {
        projectUpdates: { type: Boolean, default: true },
        documentRequests: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
      },
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate author number for new authors
UserSchema.pre("save", async function () {
  if (this.isNew && this.role === "author" && !this.authorNumber) {
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `PR${year}`;

    const lastUser = await mongoose.models.User.findOne({
      authorNumber: { $regex: `^${prefix}` }
    }).sort({ authorNumber: -1 }).select("authorNumber");

    let nextSequence = 1;
    if (lastUser?.authorNumber) {
      const lastSequence = parseInt(lastUser.authorNumber.slice(-5), 10);
      nextSequence = lastSequence + 1;
    }

    this.authorNumber = `${prefix}${nextSequence.toString().padStart(5, "0")}`;
  }

  // Generate editor number for new editors
  if (this.isNew && this.role === "editor" && !this.editorNumber) {
    const year = new Date().getFullYear().toString().slice(-2);
    const prefix = `ED${year}`;

    const lastEditor = await mongoose.models.User.findOne({
      editorNumber: { $regex: `^${prefix}` }
    }).sort({ editorNumber: -1 }).select("editorNumber");

    let nextSequence = 1;
    if (lastEditor?.editorNumber) {
      const lastSequence = parseInt(lastEditor.editorNumber.slice(-5), 10);
      nextSequence = lastSequence + 1;
    }

    this.editorNumber = `${prefix}${nextSequence.toString().padStart(5, "0")}`;
  }
});

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
