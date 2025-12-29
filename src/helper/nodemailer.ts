import User from "@/models/userModel";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { $set: { verifiedToken: hashedToken, verifiedTokenExpiry: Date.now() + 3600000 } })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } })
        }
        console.log("hashed token", hashedToken + " emailType: " + emailType);
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4d3fdd70a950fe",
              pass: "81ce72804460a9"
            }
        });

        
        const mailOptions = {
            from: 'tanmaysuradkar2008@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.URLWEBSITE}verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.URLWEBSITE}verifyemail?token=${hashedToken}
            </p>`
        }
        console.log("transport", transport);
        const mailresponse = await transport.sendMail(mailOptions);
        console.log("mailresponse", mailresponse);
        return mailresponse;

    } catch (error: any) {
        console.error("Error sending email:", error);
        throw new Error(error.message);
    }
};
