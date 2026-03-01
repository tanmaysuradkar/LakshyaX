import {connect} from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
connect();
export async function POST(request: NextRequest) {
    try {

        // Get the token from the request cookies
        const token = request.cookies.get("token")?.value || " ";
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Verify the token
        console.log("Decoded token:", "Verifying token...");
        const decoded:any = jwt.verify(token, "secret");
        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.log("Decoded token:", decoded);
        if (!decoded) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const response = NextResponse.json({
           message: "User About",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.Email,
                isVerified: user.isVerified
            }
        });
        return response;
    } catch (error: any) {
        console.error("Error in /api/user/me:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }   
}