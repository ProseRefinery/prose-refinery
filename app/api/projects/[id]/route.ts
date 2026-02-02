import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

// GET /api/projects/[id] - Get a single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const project = await Project.findById(id)
      .populate("authorId", "name email")
      .populate("editorId", "name email image")
      .lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check access permissions
    const isAuthor = (project.authorId as any)?._id?.toString() === session.user.id;
    const isEditor = (project.editorId as any)?._id?.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isAuthor && !isEditor && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] - Update a project
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check permissions
    const isAuthor = project.authorId?.toString() === session.user.id;
    const isEditor = project.editorId?.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isAuthor && !isEditor && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Authors can only update certain fields
    if (isAuthor && !isAdmin) {
      const allowedFields = ["title", "pitch", "concerns"];
      const updateData: any = {};
      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          updateData[field] = body[field];
        }
      }
      Object.assign(project, updateData);
    } else if (isEditor && !isAdmin) {
      // Editors can update status
      const allowedFields = ["status", "editorNotes"];
      const updateData: any = {};
      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          updateData[field] = body[field];
        }
      }
      Object.assign(project, updateData);
    } else {
      // Admins can update everything
      Object.assign(project, body);
    }

    await project.save();

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
