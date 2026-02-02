import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

// GET /api/projects - Get projects for current user
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    let query: any = {};

    // Role-based filtering
    if (session.user.role === "author") {
      query.authorId = session.user.id;
    } else if (session.user.role === "editor") {
      query.editorId = session.user.id;
    }
    // Admin can see all projects

    if (status && status !== "all") {
      query.status = status;
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("authorId", "name email")
      .populate("editorId", "name")
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, genre, wordCount, serviceType, pitch, concerns } = body;

    // Validate required fields
    if (!title || !genre || !wordCount || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const project = await Project.create({
      title,
      genre,
      wordCount: parseInt(wordCount),
      serviceType,
      synopsis: pitch,
      authorId: session.user.id,
      status: "draft",
      price: 0, // Will be calculated based on service type
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
