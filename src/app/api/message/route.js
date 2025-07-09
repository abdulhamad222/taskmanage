
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../config/mongodb';
import Message from '../../../../models/Message';

export async function GET(req) {
  const url = new URL(req.url);
  const withUser = url.searchParams.get('with');
  const currentUser = req.headers.get('userid');

  await connectDB();

  const messages = await Message.find({
    $or: [
      { sender: currentUser, receiver: withUser },
      { sender: withUser, receiver: currentUser },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json({ messages });
}

export async function POST(req) {
  const { to, message } = await req.json();
  const from = req.headers.get('userid');

  await connectDB();

  const newMsg = await Message.create({
    sender: from,
    receiver: to,
    text: message,
  });

  return NextResponse.json({ success: true, message: newMsg });
}
