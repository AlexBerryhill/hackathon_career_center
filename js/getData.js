// import fetch from 'electron-fetch'
// or
// const fetch = require('electron-fetch').default
// var nodemailer = require("nodemailer");

// plain text or html

// appointments = fetch('https://momsstore.herokuapp.com/customer')
// 	.then(res => res.text())
// 	.then(body => console.log(body))
async function getNames(url){
	return await fetch(url)
	.then((response) => {
		return response.json()
	})
}

async function populateNames(){
	console.log("'"+String(document.getElementById('url').value)+"'")
	var appointments = await getNames(document.getElementById('url').value)
	console.log(appointments)
	var appointment_div = []
	//For every appointment put the student into the sidebar
	for(var i = 0; i < appointments.length; i++){
		appointment_div += "<div class='appointment'>"+appointments[i].FirstName+"</div>"
	}
	console.log(appointment_div)
	document.getElementById('name_container').innerHTML=appointment_div;
}

