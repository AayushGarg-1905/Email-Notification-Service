import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export async function sendEmail(to: string, subject: string, text:string){

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const info = await transporter.sendMail({
        from: `"Notifier" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text
    });

    console.log(`Email sent to ${to}: ${info.messageId}`);
}
