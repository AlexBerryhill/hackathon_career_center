var needle = require('needle');

// Create the transporter with the required configuration for Outlook
// change the user and pass !

async function sendIt() {
  let content = document.getElementById("filled-template").children[1].children;
  let HEADER = content[0].innerHTML;
  let MESSAGE = "<!DOCTYPE html><html><body>" + 
  content[1].innerHTML +
  "</body></html>";
  let recipient = document.getElementById("recipient_email").value;
  "filled-template".textContent;

  // send mail with defined transport object
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
                return console.log(err)
              }
              console.log(resp)
              console.log("Message Sent!")
            })


  fillTemplateCards();
}

// function sendIt() {
//   let content = document.getElementById("recipient_email").value;

//   console.log(content);
// }

module.exports = { sendIt };

