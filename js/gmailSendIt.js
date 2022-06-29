var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

require("dotenv").config();

async function sendIt() {
  var GMAIL = await getUserEmail();
  var GMAILPASSWORD = await getUserPassword();
  let content = document.getElementById("filled-template").children[1].children;
  let HEADER = content[0].innerHTML;
  let MESSAGE = "<!DOCTYPE html><html><body>" + 
  content[1].innerHTML +
  "</body></html>";
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
    subject: HEADER,
    html: MESSAGE,
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
