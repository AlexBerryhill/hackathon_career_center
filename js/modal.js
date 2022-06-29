// const fs = require('fs');

//open the Form
function openModal() {
    document.getElementById("modal_container").style.display = "block";
}
  
function closeModal() {
    document.getElementById("modal_container").style.display = "none";
}

function saveUserData(){
    // const userData ={
// https://app.joinhandshake.com/users/xbtk_XBBD2Xo3Kny6PIbEvEr3WWxkkvimug2b8FY/calendar_sync.ics',
    //         email: 'hen21023@byui.edu',
    //         password: 'PASSWORD'
    //     }
    const userData ={
        url: document.getElementById("url").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    
        // convert JSON object to string
    const data = JSON.stringify(userData);

    // write JSON string to a file
    fs.writeFile('./json/userData.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    return true;
}

function getUserData(){
    // read JSON object from file
    fs.readFile('./json/userData.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        const user = JSON.parse(data.toString());

        // print JSON object
        console.log(user);
    });
}