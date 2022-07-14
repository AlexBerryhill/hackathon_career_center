// Dependencies
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

// Function to send a message using gmail authentication
async function sendIt() {

  // Get the user email and password from the userData.json
  var GMAIL = await getUserEmail();
  var GMAILPASSWORD = await getUserPassword();

  // Load in the content we will use for the email
  let content = document.getElementById("filled-template").children[1].children;
  let HEADER = content[0].innerHTML;

  // Formatting the message
  let MESSAGE = "<!DOCTYPE html><html><body>" + 
  content[1].innerHTML +
  "</body></html>";

  // Load the recipient from the hidden html on the page, from the meetings sidebar
  let RECIPIENT = document.getElementById("recipient_email").value;
  "filled-template".textContent;
  
  // Create the email transporter, using the users email, and their app specific password
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

  // Prepare the message to be sent
  var mailOptions = {
    from: GMAIL,
    to: RECIPIENT,
    subject: HEADER,
    html: MESSAGE,
  };

  // Send the message
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {

      // If there is an error, log it
      console.log(error);
    } else {

      //Otherwise, log the success
      console.log("Email sent: " + info.response);
    }
  });

  // Fill the template cards again after sending an email
  fillTemplateCards();
}

// Export the send it function
module.exports = { sendIt };
