import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '../../../../models/User';
import { connectDB } from '../../../../config/mongodb';

export async function PUT(req) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    user.name = name;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
