var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

require("dotenv").config();

function sendIt() {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAILPASSWORD,
      },
    })
  );

  var mailOptions = {
    from: "denislazo1610@gmail.com",
    to: "mhendrick000@gmail.com",
    subject: "Sending Email using Node.js[nodemailer]",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendIt };
