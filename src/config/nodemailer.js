const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 465,
  secure: true,
  auth: {
      user: "en.el.horno@outlook.com.ar",
      pass: 'Enelhorno.p5'
    }
})
    
transporter.verify().then(() => {
  console.log("Ready for send emails");
})