var nodemailer = require("nodemailer");;
require("dotenv").config();

// Create the transporter with the required configuration for Outlook
// change the user and pass !

async function sendIt() {
  var email = await getUserEmail();
  var password = await getUserPassword();
  let content = document.getElementById("filled-template").children;
  let message = content[1].innerHTML;
  let recipient = document.getElementById("recipient_email").value;
  "filled-template".textContent;

  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: email,
      pass: password,
    },
  });

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: `"Our Code TESTING " <${process.env.OUTLOOK}>`, // sender address (who sends)
    to: recipient, // list of receivers (who receives)
    subject: "Hello ", // Subject line
    text: "Hello world ", // plaintext body
    html: message, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });
  fillTemplateCards();
}

// function sendIt() {
//   let content = document.getElementById("recipient_email").value;

//   console.log(content);
// }

module.exports = { sendIt };
