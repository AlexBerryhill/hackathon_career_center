var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

require("dotenv").config();

async function sendIt() {
  var GMAIL = await getUserEmail();
  var GMAILPASSWORD = await getUserPassword();
  let content = document.getElementById("filled-template").children;
  let MESSAGE = content[1].innerHTML;
  let RECIPIENT = document.getElementById("recipient_email").value;
  "filled-template".textContent;
  
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: GMAIL,
        pass: GMAILPASSWORD,
      },
    })
  );

  var mailOptions = {
    from: GMAIL,
    to: RECIPIENT,
    subject: "Subject TBD",
    text: MESSAGE,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  fillTemplateCards();
}

module.exports = { sendIt };
