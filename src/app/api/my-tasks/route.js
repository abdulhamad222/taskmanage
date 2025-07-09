import { NextResponse } from 'next/server';
import { connectDB } from '../../../../config/mongodb';
import Task from '../../../../models/Task';

export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, status } = await req.json();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    await connectDB();
    const task = await Task.create({ title, status });
    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
