import fetch from 'electron-fetch'
// or
// const fetch = require('electron-fetch').default

// plain text or html

fetch('https://momsstore.herokuapp.com/customer')
	.then(res => res.text())
	.then(body => console.log(body))
