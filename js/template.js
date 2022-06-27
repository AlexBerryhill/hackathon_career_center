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
      template_cards += "<div class = 'template_card'>" + file + "</div>";
    });
    document.getElementById("template_cards_container").innerHTML =
      template_cards;
  });
}

function fillTemplate(template) {
  const directoryPath = path.join(__dirname, "templates");
}
// class
