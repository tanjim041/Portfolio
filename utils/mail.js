const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to any provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_RECEIVER, // Your receiving email
    subject: `Portfolio Contact: ${subject}`,
    text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <h3>New Message from Portfolio</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
