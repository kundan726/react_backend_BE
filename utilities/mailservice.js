const nodemailer = require('nodemailer');

const sendEmail = async(params) => {
    try {
        const { to, subject, text, html} = params;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SYSTEM_EMAIL,
                pass: process.env.SYSTEM_EMAILS_PASSWORD
            }
        })
        const mailoptions = {
            from: process.env.SYSTEM_EMAIL,
            to,
            subject,
            text,html
        }
        const mailResponse = await transporter.sendMail(mailoptions);
        console.log("EMail response",mailResponse);
        return {
            statusCode: 200, response:mailResponse, msg: 'email sent successful'
        }
    } catch (error) {
        console.log("Error inside sendMail", error);
        throw error;
    }
}

module.exports = sendEmail;