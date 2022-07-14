const express = require("express");
var msal = require("@azure/msal-node");
var needle = require('needle');
const { urlencoded } = require("express");

let usedAuthorities = ['https://login.microsoftonline.com/common/'];
let cliId = 'ecda5e65-eb76-435f-b79a-4c44372034ab';

const clientConfig = {
  auth: {
      clientId: cliId,
      authority: usedAuthorities[0],
      knownAuthorities: usedAuthorities,
  }
};

// Initialize MSAL Node object using auth parameters
const pca = new msal.PublicClientApplication(clientConfig);

// Initialize authCodeUrlParameters
let appScopes = ["https://graph.microsoft.com/.default"/*,"https://outlook.office.com/SMTP.Send"*/];
let redirUri = "http://localhost:5858/code";

// Initialize express
const app = express();

app.get('/oauth', (req, res) => {

  // Construct a request object for auth code
  const authCodeUrlParameters = {
      scopes: appScopes,
      redirectUri: redirUri,
      state: "getting auth code",
      prompt: "select_account"
  };

  // Request auth code, then redirect
  pca.getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        //console.log("Requesting Auth Code");
        //console.log(response);
        res.redirect(response);
      }).catch((error) => res.send(error));
});

app.get('/code', (req, res) => {

  if (req.query.state == "getting auth code"){
    
  let cliSecret = encodeURIComponent("DpV8Q~RmlsKOqTb5IdwyEKqnbJVcc1dhlnTnabrb");
  let oauthArray = [];

  // Use the auth code in redirect request to construct
  // a token request object
    const tokenRequest = {
      client_id: cliId,
      grant_type: "authorization_code",
      code: req.query.code,
      scope: appScopes[1],
      redirect_uri: redirUri,
      state: "getting token",
      client_secret: cliSecret,
    };

    let pathUsed = usedAuthorities[0] + "oauth2/v2.0/token"

    //console.log(pathUsed)

    needle.post(pathUsed, tokenRequest, {
      multipart: false,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }, function(err, resp) {
      
      // If there is an oauth token
      if(resp.complete){

        oauthArray.push(resp.body.access_token);

          console.log(resp)

          needle.get("https://graph.microsoft.com/v1.0/me", {
            headers: {"Authorization": 'Bearer ' + resp.body.access_token}
          }, function(err, resp1) {
            
            console.log(resp1)
            oauthArray.push(resp1.body.mail)
    
            // Load the oauth array into the session storage
            sessionStorage.setItem("oauthArray", JSON.stringify(oauthArray));

            // Open the email window on the main page, and close the oauth page
            window.open("index.html", "_self");
            res.send("<script>window.close();</script > ");

            
          })

      }
    });

  }

});

app.listen(5858, () => console.log("listening on port 5858!"));

window.open("http://localhost:5858/oauth", "_blank");
