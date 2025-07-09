import { NextResponse } from 'next/server';
import { connectDB } from '../../../../config/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ success: false, error: 'Email already registered.' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

console.log(newUser , 'user')
  return NextResponse.json({ success: true, user: { name: newUser.name, email: newUser.email } });
}
