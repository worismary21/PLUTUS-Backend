import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DEV_GMAIL_USER,
        pass: process.env.DEV_GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
//  otp details

export const OTP_LENGTH = 4;
export const OTP_CONFIG = { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false };


export type MAIL_PARAMS = {
    to: string,
    OTP: string
}

export const sendmail = async(from:string, to:string, subject:string, html:string)=>{
    try{
        const reponse = await transporter.sendMail({
            from: process.env.DEV_GMAIL_USER,
            to,
            subject: "Welcome",
            html,
        })
    }catch(err){
        console.log(err)
    }
}

export const emailHtml = (email:string, OTP:string)=>{
    const mail = `<h1>Welcome to Plutus<h1>
                    <p>Your username: ${email}</p><br>
                    <p>Your OTP: ${OTP}</p><br>
                    <p>Thank You</p>`

                    return mail
}

export const emailHtmlForAdmin = (email:string, OTP:string)=>{

    const mail = `<h1>PLUTUS<h1><br>
                    <p>Welcome to Plutus. We're thrilled to have you join our thriving community. To access our private content, we need you to quickly verify your plutus account with email address- ${email}. Use the otp below to verify on the Plutus web app.</p><br>
                    <p>OTP - ${OTP}</p>
                    <p>Note: Do not forward or give this code to anyone</p>
                    <p>Thank You</p>
                    <p>Best Regards,</p>
                    <p>From </P>
                    <P>Team Plutus</p>`

                    return mail
}

export const emailHtmlForCompany = (companyName:string, email:string, password:string,)=>{
    const mail = `<h1>Welcome to Plutus<h1>
                    <p>Hello ${companyName},</p><br>
                    <p> Thank you for registering your company with Plutus. Here you have access to attract a lot of investors to your company and scale your business so high.</p>
                    <p>Please use the details below to log into your account.</p><br>
                    <p>email: ${email}</p><br>
                    <p>password: ${password}</p><br>
                    <p>Don't hesistate in reaching out via our customer service mail to resolve any issues or concerns regarding your account.</p><br>
                    <p>Thank You</p><br>
                    <p>Best Regards,</p>
                    <p>From </P>
                    <P>Team Plutus</p>`

                    return mail
}
