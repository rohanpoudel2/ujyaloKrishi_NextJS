import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import Handlebars from "handlebars";



export const sendMail = async (to, subject, text) => {

  const transport = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const emailTemplateSource = fs.readFileSync(path.join(__dirname, "./templates/offer_template.hbs"), "utf8");

  const template = Handlebars.compile(emailTemplateSource);

  const htmlToSend = template({ message: text, title: subject })

  transport.sendMail({
    from: "Ujyalo Krishi <system@ujyalokrishi.com>",
    to: to,
    subject: subject,
    html: htmlToSend
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