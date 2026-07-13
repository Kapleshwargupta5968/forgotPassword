const nodemailer = require("nodemailer");

/**
 * Utility to send an email using nodemailer.
 * 
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email plain text content
 * @param {string} [options.html] - Email HTML content
 */
const sendEmail = async (options) => {
    // Create a transporter using standard SMTP (can be Gmail, Mailtrap, etc based on .env)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${process.env.APP_NAME || 'Your App'}" <${process.env.MAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
