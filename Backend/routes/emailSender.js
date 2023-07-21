// emailSender.js

const nodemailer = require('nodemailer');

async function sendEmail(receiverEmail, subject, text) {
    try {
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'abhishek.johri.07@outlook.com',
                pass: '9997777663@Ab'// Replace with your Gmail account password
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'abhishek.johri.07@outlook.com',
            to: receiverEmail,
            subject: subject,
            text: text
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
