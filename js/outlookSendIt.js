// Dependencies
var needle = require('needle');

// Function to send a message using outlook authentication
async function sendIt() {

  // Load in the content we will use for the email
  let content = document.getElementById("filled-template").children[1].children;
  let HEADER = content[0].innerHTML;

  // Formatting the message
  let MESSAGE = "<!DOCTYPE html><html><body>" + 
  content[1].innerHTML +
  "</body></html>";

  // Load the recipient from the hidden html on the page, from the meetings sidebar
  let recipient = document.getElementById("recipient_email").value;
  "filled-template".textContent;

  // Send mail via post request to microsoft graph
  needle.post("https://graph.microsoft.com/v1.0/me/sendMail", JSON.stringify({
              "message": {
                    "subject": HEADER,
                    "body": {
                        "contentType": "html",
                        "content": MESSAGE
                    },
                    "toRecipients": [
                        {
                            "emailAddress": {
                                "address": recipient
                            }
                        }
                    ]
                }
            }), {
              headers: {
                "Authorization": 'Bearer ' + JSON.parse(sessionStorage.getItem("oauthArray"))[0],
                'Content-Type': "application/json"
              }
            }, function(err, resp){
              if (err) {
                // If there is an error log it
                return console.log(err)
              }

              // Otherwise tell the world of our success!!
              console.log(resp)
              console.log("Message Sent!")
            })

  // Fill the template cards when the email is sent
  fillTemplateCards();
}

module.exports = { sendIt };

