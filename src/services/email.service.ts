// import nodemailer from 'nodemailer'
// import { render } from '@react-email/render'
// import VerificationEmail from '@/emails/VerificationEmail'

// export class EmailService {
//   private static transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_SERVER_HOST,
//     port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
//     auth: {
//       user: process.env.EMAIL_SERVER_USER,
//       pass: process.env.EMAIL_SERVER_PASSWORD,
//     },
//     secure: process.env.EMAIL_SERVER_SECURE === 'true',
//   })

//   static async sendVerificationEmail(email: string, token: string) {
//     const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
    
//     const emailHtml = render(
//       VerificationEmail({
//         verificationLink,
//         userEmail: email,
//       })
//     )

//     const mailOptions = {
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject: 'Verify your email address',
//       html: emailHtml,
//     }

//     try {
//       await this.transporter.sendMail(mailOptions)
//     } catch (error) {
//       console.error('Failed to send verification email:', error)
//       throw new Error('Failed to send verification email')
//     }
//   }
// }
