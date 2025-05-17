const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReceiptEmail(toEmail, subject, htmlContent) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendReceiptEmail };
