import {connect} from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
connect();
export async function POST(request: NextRequest) {
    try {
        // Clear the token cookie
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        });
        response.cookies.set("token", "", { httpOnly: true, maxAge: 0 ,expires: new Date(0) });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}