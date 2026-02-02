import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ["author", "editor"];
    const userRole = validRoles.includes(role) ? role : "author";

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Create user (password is hashed automatically by the User model pre-save hook)
    const userData: any = {
      name,
      email: email.toLowerCase(),
      password, // Will be hashed by User model
      role: userRole,
    };

    // Set editor status for editors
    if (userRole === "editor") {
      userData.editorStatus = "pending";
    }

    const user = await User.create(userData);

    // Return success (don't include password)
    return NextResponse.json({
      message: "Account created successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        ...(userRole === "editor" && { editorStatus: user.editorStatus }),
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
