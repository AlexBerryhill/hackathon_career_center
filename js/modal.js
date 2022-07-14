// A function to open the user information modal
function openModal() {
    document.getElementById("modal_container").style.display = "block";
}

// A function to close the user information modal
function closeModal() {
    document.getElementById("modal_container").style.display = "none";
}

// A function to save th euser data into the userData.json
function saveUserData(){
    
    // Get the userData from the form
    const userData ={
        url: document.getElementById("url").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    
    // Convert userData JSON object to string
    const data = JSON.stringify(userData);

    // Write JSON string to a file
    fs.writeFile('./json/userData.json', data, (err) => {
        if (err) {
            
            // Throw an error if there is an error
            throw err;
        }

        // If there is no error, log our success!!
        console.log("JSON data is saved.");
    });

    // After saving the user data close the modal and return true
    closeModal();
    return true;
}
