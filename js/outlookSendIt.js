var nodemailer = require("nodemailer");
require("dotenv").config();

// Create the transporter with the required configuration for Outlook
// change the user and pass !

function sendIt() {
  let content = document.getElementById("template_cards_container").children;
  let message = content[0].innerHTML;
  "template_cards_container".textContent;

  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.OUTLOOK,
      pass: process.env.OUTLOOKPASSWORD,
    },
  });

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: `"Our Code TESTING " <${process.env.OUTLOOK}>`, // sender address (who sends)
    to: "denislazo1610@gmail.com", // list of receivers (who receives)
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
}

// function sendIt() {
//   var message = document.getElementById("template_cards_container");

//   let content = message.children;
//   console.log(content[1].innerHTML);
// }

module.exports = { sendIt };
