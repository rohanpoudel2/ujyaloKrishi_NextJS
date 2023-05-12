import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {

  const transport = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  transport.sendMail({
    from: "Ujyalo Krishi <system@ujyalokrishi.com>",
    to: to,
    subject: subject,
    text: text
  },
    (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    }
  );
}