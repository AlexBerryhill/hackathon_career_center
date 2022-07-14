// I know why these are behaving strangely, make sure you have both of them installed
const requestPromise = require("request-promise");
const ical = require("node-ical");

// Variable initialization
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Event class to pass data on to be used in the actual email process
class Event {
  constructor(
    rtime,
    date,
    time,
    location,
    FirstName,
    LastName,
    email,
    oFirstName,
    oLastName,
    oEmail,
    noDate
  ) {
    this.rtime = rtime;
    this.date = date;
    this.time = time;
    this.location = location;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.email = email;
    this.oFirstName = oFirstName;
    this.oLastName = oLastName;
    this.oEmail = oEmail;
    this.noDate = noDate;
  }
}

ical.fromURLNoSuck = function (url, opts, cb) {
  // If the user doesn't define any code to run
  if (!cb)
    // Terminate the program
    return;
  // Otherwise return a promise that will resolve to their functions returned value
  return requestPromise(url, opts).then((data) => {
    // Run their function
    return cb(undefined, ical.parseICS(data));
  });
};


// https://momsstore.herokuapp.com/customer

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
			  let meetingDate = (ev.start.getMonth() + 1) + "/" + ev.start.getDate() + "/" + (ev.start.getYear() + 1900);
			  //console.log(meetingDate + " - " + date);
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
					todaysEvents.push(new Event(ev.start, months[ev.start.getMonth()] + " " + ev.start.getDate() + ", " + (ev.start.getYear() + 1900), ev.start.toLocaleTimeString("en-US", {timeStyle: "short"}), ev.location, fname, lname, email, oFname, oLname, oEmail, (date == "")));
			  	}
			  }
			}
		  }
		}

    // Sort appointments by date and time
    var sortedEvents = todaysEvents.sort((a, b) => a.rtime - b.rtime);
	
	  return sortedEvents;
		
	  });
}

async function getUserData(){
  delete require.cache[require.resolve('./json/userData.json')];
	let userData = require('./json/userData.json');
	return userData;
}

function getCalendarUrl(){
	return getUserData().then(user => {
		return user.url;
	});
}

function getUserEmail(){
	return getUserData().then(user => {
		return user.email;
	});
}

function getUserPassword(){
	return getUserData().then(user => {
		return user.password;
	});
}

function nameFunc(i, ele){
  
  // Load the data associated with the name, and load the templates
  openData(i);
  fillTemplateCards();
  console.log(ele);

  // A list of the elements to deselect
  let names = document.getElementsByClassName("appointment");
  var namesArr = [].slice.call(names);

  // The element to select
  let selected = document.getElementById("appoint" + i);

  //console.log(namesArr);

  namesArr.forEach(function (ele) {
    ele.classList.remove('selected');
  });

  selected.classList.add('selected');

}

async function populateNames() {
  var url = await getCalendarUrl();

  //console.log(url);
  var appointments = await getEvents(
    url,
    document.getElementById("date").value,
    getUserEmail()
  );

  // console.log(appointments);
  var appointment_div = [];

  // For every appointment put the student into the sidebar
  for (var i = 0; i < appointments.length; i++) {
  
    // We are using this so if a date is defined we dont list it on the sidebar
    let temp = "";

    if (appointments[i].noDate) {
      temp = appointments[i].date + " ";
    }

    appointment_div +=
      "<div class='appointment' id = 'appoint" + i + "' onclick='nameFunc(" +
      i +
      ", this);'><p>" +
      appointments[i].FirstName +
      " " +
      appointments[i].LastName +
      "<br>" + 
      temp +
      appointments[i].time +
      "</p></div>";
  }
  //console.log(appointment_div);
  document.getElementById("name_container").innerHTML = appointment_div;
}

async function openData(index) {
  var url = await getCalendarUrl();
  var appointments = await getEvents(
    url,
    document.getElementById("date").value,
    getUserEmail()
  );
  const person = appointments[index];
  document.getElementById("name").innerHTML =
    person.FirstName + " " + person.LastName;
  document.getElementById("yourName").innerHTML =
    person.oFirstName + " " + person.oLastName;
  document.getElementById("dateMeet").innerHTML = person.date;
  document.getElementById("time").innerHTML = person.time;
  document.getElementById("location").innerHTML = person.location;

  html = "";
}

function getToday() {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  return month + "/" + day + "/" + year;
}

function setDateToToday() {
  document.getElementById("date").value = getToday();
}
