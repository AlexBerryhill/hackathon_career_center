// Dependencies
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
    this.oFirstName = oFirstName;
    this.oLastName = oLastName;
    this.oEmail = oEmail;
    this.noDate = noDate;
  }
}

// The original fromURL function did not return the result it got, so I made one that would, hence fromURLNoSuck, because it does not suck
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

// Function to return all of the events in the users ICS file, optionally filtering by email if we need to reimplement that
async function getEvents(url, date){
  
	let todaysEvents = [];

	// Access ICS data
	return ical.fromURLNoSuck(url, {}, function (err, data) {
    
		// For each item in the ICS file
		for (let k in data) {
		  if (data.hasOwnProperty(k)) {
	  
        if (data[k].type == 'VEVENT' && data[k].organizer != null) {

          console.log(data[k]);

          // EV will contain it if it is an event
          const ev = data[k];
      
          // If the date of the meeting
          let meetingDate = (ev.start.getMonth() + 1) + "/" + ev.start.getDate() + "/" + (ev.start.getYear() + 1900);
          
          // If the date is today, or left blank
          if (date == meetingDate || date == "") {

            // Get the email that the meeting uses
            let oEmail = ev.organizer.val.substr(7);
      
            // Split each word from the summary
            let summary = ev.summary.split(" ");
            
            // Get users name and organizers name
            let oFname = summary[summary.indexOf("and") + 1];
            let oLname = summary[summary.indexOf("and") + 2];
            let fname = summary[summary.indexOf("with") + 1];
            let lname = summary[summary.indexOf("with") + 2];
            
            // Add it to the list of todays events
            todaysEvents.push(new Event(ev.start, months[ev.start.getMonth()] + " " + ev.start.getDate() + ", " + (ev.start.getYear() + 1900), ev.start.toLocaleTimeString("en-US", {timeStyle: "short"}), ev.location, fname, lname, oFname, oLname, oEmail, (date == "")));
          }
        }
		  }
		}

    // Sort appointments by date and time
    var sortedEvents = todaysEvents.sort((a, b) => a.rtime - b.rtime);
	
    // Return the events to be used in other parts of the program
	  return sortedEvents;
		
	  });
}

// Gather the data from the file "userData.json" 
async function getUserData(){
  let data_path = JSON.parse(sessionStorage.getItem("data_path")) + '/json/userData.json';
  delete require.cache[data_path];
	let userData = require(data_path);
	return userData;
}

// Get the url of the ics file they have inputted
function getCalendarUrl(){
	return getUserData().then(user => {
		return user.url;
	});
}

// Return the users email from the json file (only needed to authenticate gmail)
function getUserEmail(){
	return getUserData().then(user => {
		return user.email;
	});
}

// Return the users applications specific password from the json file (only needed to authenticate gmail)
function getUserPassword(){
	return getUserData().then(user => {
		return user.password;
	});
}

// Load the data associated with that index from the appointments
function nameFunc(i, ele){
  
  // Load the data associated with the name, and load the templates
  openData(i);
  fillTemplateCards();

  // A list of the elements to deselect
  let names = document.getElementsByClassName("appointment");
  var namesArr = [].slice.call(names);

  // The element to select
  let selected = document.getElementById("appoint" + i);

  // Remove the selected tag from each element that is not selected
  namesArr.forEach(function (ele) {
    ele.classList.remove('selected');
  });

  // Add the selected tag to the correct element
  selected.classList.add('selected');

}

// Create the appointment cards
async function populateNames() {

  // First get the url of the calendar from the userData file
  var url = await getCalendarUrl();

  // Then get the events of that calendar using its url and the current date
  var appointments = await getEvents(
    url,
    document.getElementById("date").value
  );

  // Create an empty array to hold the appointments
  var appointment_div = [];

  // For every appointment put the student into the sidebar
  for (var i = 0; i < appointments.length; i++) {
  
    // We are using this so if a date is defined we dont list it on the sidebar
    let temp = "";

    // If the date is defined then we don't need to display it in the sidebar
    if (appointments[i].noDate) {
      temp = appointments[i].date + " ";
    }

    // Add a new HTML div element to the array appointment_div, this div will have that appointments name and time, as well as the date if date is not defined
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
  
  // Set the innter html of the name_container to be our array appointment_div to put all of the appointments into the sidebar
  document.getElementById("name_container").innerHTML = appointment_div;
}

// When open data is called it will load the information about an appointment into hidden html elements to be used later
async function openData(index) {

  // Get the calendar url from the userData.json
  var url = await getCalendarUrl();

  // Then get the events for that url
  var appointments = await getEvents(
    url,
    document.getElementById("date").value
  );

  // Assign attributes from a specific event into hidden html content on the page
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

// A function to get the current date
function getToday() {

  // Get the current date
  const date = new Date();

  // Get the month, day, and year
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];

  // Return it in the format we like
  return month + "/" + day + "/" + year;
}

// Set the date input to be the current date
function setDateToToday() {
  document.getElementById("date").value = getToday();
}
