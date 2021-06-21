const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "iamrahulrnair.github.io",
    to: options.mail,
    subject: options.subject,
    text: options.message,
    // html:
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
