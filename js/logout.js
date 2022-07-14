// Dependencies
const express = require("express");

// Create a function to log the user out
function logout(){

    // Create the window we will use to log out with
    const win2 = express();
    
    // When the client requests the logout page
    win2.get('/logout', (req, res) => {
        
        // Redirect the user to the oauth2 logout page
        res.redirect("https://login.microsoftonline.com/0df8c571-f645-4c6e-bae0-f76b9d1197b1/oauth2/v2.0/logout?post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A5858%2Ftest&client_id=ecda5e65-eb76-435f-b79a-4c44372034ab");

    });

    // When the client is done logging out
    win2.get('/test', (req,res) => {

        // Close the logout window and take the user back to login
        res.send("<script>window.close();</script > ");
        window.open("oauth.html", "_self");

    });

    // Listen for requests on port 5858
    win2.listen(5858, () => console.log("listening on port 5858!"));

    // Open the logout window
    window.open("http://localhost:5858/logout", "_blank");
    

}

