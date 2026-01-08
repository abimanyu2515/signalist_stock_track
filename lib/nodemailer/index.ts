import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
})

export const sendWelcomeMail = async({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist" <abimanyus@signalist.com>`,
        to: email,
        subject: 'Welcome to Signalist!',
        text: "Thanks for joining us",
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}