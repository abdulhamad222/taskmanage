import { connectDB } from '../../../../config/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    // Save user
    const newUser = new User({ email, password });
    await newUser.save();

    return Response.json({ success: true });
  } catch (err) {
    console.error('Error saving user:', err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
