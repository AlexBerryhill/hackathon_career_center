// I know why these are behaving strangely, make sure you have both of them installed
const requestPromise = require('request-promise');
const ical = require('node-ical');

// Variable initialization
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Event class to pass data on to be used in the actual email process
class Event {
	constructor(date, time, location, FirstName, LastName, email, oFirstName, oLastName, oEmail){
	  this.date = date;
	  this.time = time;
	  this.location = location;
	  this.FirstName = FirstName;
	  this.LastName = LastName;
	  this.email = email;
	  this.oFirstName = oFirstName;
	  this.oLastName = oLastName;
	  this.oEmail = oEmail;
	}
  }

ical.fromURLNoSuck = function(url, opts, cb){
	// If the user doesn't define any code to run
	if (!cb)
	  // Terminate the program
	  return;
	// Otherwise return a promise that will resolve to their functions returned value
	return requestPromise(url).then(data => {
	  // Run their function
	  return cb(undefined, ical.parseICS(data));
	}); 
  }

// import fetch from 'electron-fetch'
// or
// const fetch = require('electron-fetch').default
// var nodemailer = require("nodemailer");

// plain text or html

// appointments = fetch('https://momsstore.herokuapp.com/customer')
// 	.then(res => res.text())
// 	.then(body => console.log(body))

async function getEvents(url, date, email){
  
	let todaysEvents = [];
	
	// Access ICS data
	return ical.fromURLNoSuck(url, {}, function (err, data) {
    
		// For each item in the ICS file
		for (let k in data) {
		  if (data.hasOwnProperty(k)) {
	  
			// EV will contain it if it is an event
			const ev = data[k];
			if (data[k].type == 'VEVENT') {
	  
			  // If the date of the meeting
			  let meetingDate = ev.start.getMonth() + "/" + ev.start.getDate() + "/" + (ev.start.getYear() + 1900);
			  console.log(meetingDate + " - " + date);
			  if (date == meetingDate || date == "") {

				// Get the email that the meeting uses
				let oEmail = ev.organizer.val.substr(7);

				// If the email matches eg we are looking at the meetings of the right person, or if no email is provided
				if (/*oEmail == email || email == ""*/true) {
	
					// Split each word from the summary
					let summary = ev.summary.split(" ");
					
					// Get users name and organizers name
					let oFname = summary[summary.indexOf("and") + 1];
					let oLname = summary[summary.indexOf("and") + 2];
					let fname = summary[summary.indexOf("with") + 1];
					let lname = summary[summary.indexOf("with") + 2];

					// Get organizers email
					let email = "jdoe@yahoo.com";
					
					// Add it to the list of todays events
					todaysEvents.push(new Event(months[ev.start.getMonth()] + " " + ev.start.getDate() + ", " + (ev.start.getYear() + 1900), ev.start.toLocaleTimeString("en-US", {timeStyle: "short"}), ev.location, fname, lname, email, oFname, oLname, oEmail));
			  	}
			  }
			}
		  }
		}
	
	  return todaysEvents;
		
	  });

	/*
	return await fetch(url)
	.then((response) => {
		return response.json()
	})
	*/

}

async function populateNames(){
	var appointments = await getEvents(document.getElementById('url').value, document.getElementById('date').value, document.getElementById('email').value)
	console.log(appointments)
	var appointment_div = []
	//For every appointment put the student into the sidebar
	for(var i = 0; i < appointments.length; i++){
		appointment_div += "<div class='appointment' onclick='openData("+i+")'><p>" + appointments[i].FirstName + " " + appointments[i].LastName + "</p></div>"
	}
	console.log(appointment_div)
	document.getElementById('name_container').innerHTML=appointment_div;
}

async function openData(index){
	var appointments = await getEvents(document.getElementById('url').value, document.getElementById('date').value, document.getElementById('email').value)
	const person = appointments[index]
	document.getElementById('name').innerHTML=person.FirstName + " " + person.LastName;
	document.getElementById('yourName').innerHTML=person.oFirstName + " " + person.oLastName;
	document.getElementById('dateMeet').innerHTML=person.date;
	document.getElementById('time').innerHTML=person.time;
	document.getElementById('location').innerHTML=person.location;

	html = ""
}

function getToday(){
	const date = new Date();
	const [month, day, year] = [date.getMonth()+1, date.getDate(), date.getFullYear()];
	return month+'/'+day+'/'+year
}

function setDateToToday(){
	document.getElementById('date').value=getToday()
}