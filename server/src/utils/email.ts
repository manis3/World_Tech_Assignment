import nodemailer from 'nodemailer'
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USER,
} from '../../secrets'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,

  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
} as SMTPTransport.Options)

export const sentOPTEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject: 'Your Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
    html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending OTP email:', error)
  }
}
