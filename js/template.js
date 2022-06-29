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

      fileSub = file.split(".");
      fileSub.pop();
      fileTitle = fileSub.join("");

      template_cards += "<div class = 'template_card' onclick = 'callFillTemplate(" + '"' + file + '"' + ")'> " + fileTitle + "</div>";

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
      .replace(/{name}/g, name)
      .replace(/{time}/g, time)
      .replace(/{your_name}/g, your_name)
      .replace(/{date}/g, date)
      .replace(/{location}/g, location);

    page = "<div id='filled-template'>"+
    "<div>"+
    "   <input type='email' name='recipient_email' id='recipient_email' placeholder='Recipient'>"+
    "</div>"+
    "<div id='email_content'>"+
        template +
    "</div>" + 
    "<button class='send_btn' id='send' onclick='sendIt()'>Send</button>" +
    "</div>"
    // Fill template_cards_container
    document.getElementById("template_cards_container").style.display = "block";
    document.getElementById("template_cards_container").innerHTML = page;

  };
  client.send();
}

function openTemplateCreater() {
  document.getElementById("template_cards_container").style.display = "grid";
  html =
    "<div class = 'left_grid'>" +
    "    <input type = 'text' name = 'template_title' id = 'template_title' placeholder='Title'></input><br>" +
    "    <input type = 'text' name = 'template_header' id = 'template_header' placeholder='Subject'></input><br>" +
    "    <textarea name='template_text' id='template_text' cols='60' rows='20' placeholder='Body'></textarea><br>" +
    "    <button id = 'template_button' onclick='createTemplate()'>Create</button>" +
    "</div>" +
    "<div class='right_grid'>" + // Key should be converted to a table in a second
    "    <table>" +
    "    <tr><th>Value to replace</th><th>What it is replaced with</th></tr>" +
    "    <tr><td>{name}</td><td>Recipient name</td></tr>" +
    "    <tr><td>{time}</td><td>Time (hour:minute)</td></tr>" +
    "    <tr><td>{location}</td><td>Meeting location</td></tr>" +
    "    <tr><td>{date}</td><td>The date of your meeting</td></tr>" +
    "    <tr><td>{your_name}</td><td>Your (mentor) name</td></tr>" +
    "</table> <p class='bold'>The signature block is already included</p>" + 
    "</div>";

  document.getElementById("template_cards_container").innerHTML = html;
}

function createTemplate() {
  title = document.getElementById("template_title").value;
  text = document.getElementById("template_text").value;
  header = document.getElementById("template_header").value;
  html =
    "<!DOCTYPE html>" +
    "<html>" +
    "    <body>" +
    "<p onclick='checkIfUrl(event)' contenteditable='true' id='template-edit-header'>" +
    header +
    "</p>" +
    "        <p contenteditable='true' onclick='checkIfUrl(event)' id='template-edit-paragraph'>" +
    text +
    "           <br>{your_name},<br>" +
    "           Career Success Mentor<br>" +
    "           BYU-I Career Center | MC 200 <br>" +
    "           208.496.9825  <br>" +
    '           <a href="byui.edu/career/students/job-market-readiness" id="00">byui.edu/career/students/job-market-readiness</a>' +
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

      fileSub = file.split(".");
      fileSub.pop();
      fileTitle = fileSub.join("");

      template_cards +=
        "<div class = 'template_card delete_template' onclick='deleteTemplate(" +
        '"' +
        file +
        '"' +
        ")'>Delete " +
        fileTitle +
        "</div>";
    });
    document.getElementById("template_cards_container").innerHTML =
      template_cards;
    document.getElementById("template_cards_container").style.display = "grid";
  });
}

