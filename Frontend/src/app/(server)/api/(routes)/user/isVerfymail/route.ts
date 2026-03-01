import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Request body:", reqBody);
        // Check if user exists
        const user = await User.findOne({ verifiedToken: token , verifiedTokenExpiry: { $gt: Date.now() }});
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 404 });
        }
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "User verified successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}