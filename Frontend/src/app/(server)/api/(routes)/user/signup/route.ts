import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {sendEmail} from '@/helper/nodemailer';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            Email:email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        //send verification email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}