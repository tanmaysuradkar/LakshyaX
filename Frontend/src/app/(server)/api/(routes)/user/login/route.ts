import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email,password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ Email: email});
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        const tokenData = {
            id: user._id,
            email: user.email
        };
        // Generate JWT token
        const token = jwt.sign(tokenData, "secret", { expiresIn: '1h' });
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });
        response.cookies.set("token", token, {httpOnly: true, maxAge: 3600000 });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}   