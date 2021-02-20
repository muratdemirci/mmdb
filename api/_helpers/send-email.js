const nodemailer = require('nodemailer');

module.exports = sendEmail;

const mailOptions =  {
    "emailFrom": process.env.CONFIG_EMAIL_FROM,
    "smtpOptions": {
        "host": process.env.CONFIG_SMTP_OPTIONS_HOST,
        "port": process.env.CONFIG_SMTP_OPTIONS_PORT,
        "auth": {
            "user": process.env.CONFIG_SMTP_OPTIONS_AUTH_USER,
            "pass": process.env.CONFIG_SMTP_OPTIONS_AUTH_PASS
        }
    }
}

async function sendEmail({ to, subject, html, from = mailOptions.emailFrom }) {
    const transporter = nodemailer.createTransport(mailOptions.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}