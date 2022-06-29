const path = require("path");
const fs = require("fs");

function fillTemplateCards() {
  //joining path of directory
  const directoryPath = path.join(__dirname, "templates");
  var template_cards = "";
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {

      /*
      template_cards +=
        "<div class = 'template_card' onclick='fillTemplate(" +
        '"' +
        file +
        '"' +
        ", " +
        '"Alex",' +
        '"4:20pm",' +
        '"Denis",' +
        '"5/9/2022",' +
        '"Manwaring Center"' +
        ")'>" +
        file +
        "</div>";
      */

      template_cards += "<div class = 'template_card' onclick = 'callFillTemplate(" + '"' + file + '"' + ")'> " + file + "</div>";

        //document.getElementById('yourName').innerHTML
    });
    document.getElementById("template_cards_container").innerHTML =
      template_cards;
    document.getElementById("template_cards_container").style.display = "grid";
  });
  document.getElementById("template_cards_container").innerHTML =
    template_cards;
}

function callFillTemplate(file){
  fillTemplate(file, document.getElementById('name').innerHTML, 
  document.getElementById('time').innerHTML, 
  document.getElementById('yourName').innerHTML, 
  document.getElementById('dateMeet').innerHTML, 
  document.getElementById('location').innerHTML);
}

function fillTemplate(template_name, name, time, your_name, date, location) {
  var client = new XMLHttpRequest();
  client.open("GET", "./templates/" + template_name);
  client.onreadystatechange = function () {
    const directoryPath = path.join(__dirname, "templates");

    // Get Template from folder
    var template = client.responseText;

    // Fill in user and event data
    template = template
      .replace("{name}", name)
      .replace("{time}", time)
      .replace("{your_name}", your_name)
      .replace("{date}", date)
      .replace("{location}", location);

    // Fill template_cards_container
    document.getElementById("template_cards_container").style.display = "block";
    document.getElementById("template_cards_container").innerHTML = template;

  };
  client.send();
}

function openTemplateCreater() {
  html =
    "<div class = 'full_grid'>" +
    "    <input type = 'text' name = 'template_title' id = 'template_title' placeholder='Title'></input>" +
    "    <textarea name='template_text' id='template_text' cols='60' rows='20' placeholder='content'></textarea>" +
    "    <button onclick='createTemplate()'>Create</button>" +
    "</div>" +
    "<div class='full_grid'>" +
    "    Key:<br>" +
    "    <nbsp>{name} = Recipient Name<br>" +
    "    <nbsp>{time} = Time(hour/minute)<br>" +
    "    <nbsp>{location} = Zoom/In Person<br>" +
    "    <nbsp>{your_name} = Your (Mentor) Name<br>" +
    "    The complimentary close is already included";
  ("</div>");
  document.getElementById("template_cards_container").innerHTML = html;
}

function createTemplate() {
  title = document.getElementById("template_title").value;
  text = document.getElementById("template_text").value;
  html =
    "<!DOCTYPE html>" +
    "<html>" +
    "    <head>" +
    '        <base target="_top">' +
    "    </head>" +
    "    <body>" +
    "        <p>" +
    text +
    "           <br>{your_name}<br>" +
    "           Career Success Mentor<br>" +
    "           BYU-I Career Center | MC 200 <br>" +
    "           208.496.9825  <br>" +
    '           <a href="byui.edu/career/students/job-market-readiness">byui.edu/career/students/job-market-readiness</a>' +
    "        </p>" +
    "    </body>" +
    "</html>";

  //change newline to <br> tags
  html = html.replaceAll("\n", "<br/>");

  fs.writeFile("./templates/" + title + ".html", html, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      document.getElementById("template_title").innerHTML = "";
      document.getElementById("template_text").innerHTML = "";
      fillTemplateCards();
    }
  });
}

// Depricated
function sendEmail() {
  email = "amsb99@gmail.com";
  body = document.getElementById("template_cards_container").value;

  window.open("mailto:" + email + '?subject="subject"&body=' + body);
}

function deleteTemplate(template_name) {
  // delete a file
  try {
    fs.unlinkSync("./templates/" + template_name);
    fillDeleteTemplateCards();
    console.log("File is deleted.");
  } catch (error) {
    console.log(error);
  }
}

function fillDeleteTemplateCards() {
  //joining path of directory
  const directoryPath = path.join(__dirname, "templates");
  var template_cards = "";
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      template_cards +=
        "<div class = 'template_card delete_template' onclick='deleteTemplate(" +
        '"' +
        file +
        '"' +
        ")'>" +
        file +
        "</div>";
    });
    document.getElementById("template_cards_container").innerHTML =
      template_cards;
    document.getElementById("template_cards_container").style.display = "grid";
  });
}

