// Dependencies
const express = require("express");
var msal = require("@azure/msal-node");
var needle = require('needle');
const { urlencoded } = require("express");

// Data needed for oauth
let usedAuthorities = ['https://login.microsoftonline.com/common/'];
let cliId = 'ecda5e65-eb76-435f-b79a-4c44372034ab';

// Get the data passed from main js, to be further passed on
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

// Client configuration
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

// When the client requests the auth code page
app.get('/oauth', (req, res) => {

  // Construct a request object for auth code
  const authCodeUrlParameters = {
      scopes: appScopes,
      redirectUri: redirUri,
      state: "getting auth code"
  };

  // Request auth code, then redirect
  pca.getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        
        // Redirect to obtain the authentication code
        res.redirect(response);

      // Send an error if there is one when getting the auth code url
      }).catch((error) => res.send(error));

});

// When the client requests the token page
app.get('/code', (req, res) => {

  // If the user has just received an auth code
  if (req.query.state == "getting auth code"){
    
  // Variable initialization
  let cliSecret = encodeURIComponent("DpV8Q~RmlsKOqTb5IdwyEKqnbJVcc1dhlnTnabrb");
  let oauthArray = [];

  // Use the auth code in redirect request to construct a token request object
    const tokenRequest = {
      client_id: cliId,
      grant_type: "authorization_code",
      code: req.query.code,
      scope: appScopes[1],
      redirect_uri: redirUri,
      state: "getting token",
      client_secret: cliSecret,
    };

    // Path to get the token
    let pathUsed = usedAuthorities[0] + "oauth2/v2.0/token"

    // Send a post request to microsoft in order to get the access token
    needle.post(pathUsed, tokenRequest, {
      multipart: false,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }, function(err, resp) {
      
      // If there is an oauth token
      if(resp.complete){

        // Add the access token to the oauth array
        oauthArray.push(resp.body.access_token);

        // Use a get request to get the users email, in case we need it later
        needle.get("https://graph.microsoft.com/v1.0/me", {
          headers: {"Authorization": 'Bearer ' + resp.body.access_token}
        }, function(err, resp1) {
          
          // Push the users email into the oauth array
          oauthArray.push(resp1.body.mail)
  
          // Load the oauth array into the session storage
          sessionStorage.setItem("oauthArray", JSON.stringify(oauthArray));
          sessionStorage.setItem("data_path", JSON.stringify(urlParams.get("data_path")));

          // Open the email window on the main page, and close the oauth page
          window.open("index.html", "_self");
          res.send("<script>window.close();</script > ");

          
        })

      }
    });

  }

});

// Listen for requests on port 5858
app.listen(5858, () => console.log("listening on port 5858!"));

// Send a request to port 5858 to authenticate the app!!
window.open("http://localhost:5858/oauth", "_blank");
