// import fetch from 'electron-fetch'
// or
// const fetch = require('electron-fetch').default

// plain text or html

// appointments = fetch('https://momsstore.herokuapp.com/customer')
// 	.then(res => res.text())
// 	.then(body => console.log(body))

fetch("https://momsstore.herokuapp.com/customer")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

function populateNames(){
	appointments = [{name: Alex}, {name: Denis}, {name: Michael}, {name: Aiden}]
	console.log(appointments)
	var appointment_div = []
	//For every appointment put the student into the sidebar
	for(var i = 0; i < appointments.length; i++){
		appointment_div += "<div class='appointment'>"+appointments[i].name+"</div>"
	}
	document.getElementById('name_container').innerHTML=appointment_div;
}

function init(){
	document.getElementById("submit").addEventListener('click', function() {
    	populateNames();
	});
}