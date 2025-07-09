import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Define Project schema
const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// GET: Fetch all projects
export async function GET() {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Add a new project
export async function POST(req) {
  try {
    const { title, description } = await req.json();
    const newProject = await Project.create({ title, description });
    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
