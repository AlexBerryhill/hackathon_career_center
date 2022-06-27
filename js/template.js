const path = require('path')
const fs = require('fs');

function fillTemplateCards(){
    //joining path of directory 
    const directoryPath = path.join(__dirname, 'templates');
    var template_cards = ''
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            template_cards += "<div class = 'template_card' onclick='fillTemplate("+'"'+file+'"'+", "+'"Alex",'+ '"4:20pm",'+ '"Denis"'+")'>" +file+"</div>";
        });
        console.log(template_cards)
        document.getElementById('template_cards_container').innerHTML=template_cards
    });
}

function fillTemplate(template_name, name, time, your_name){
    var client = new XMLHttpRequest();
    client.open('GET', './templates/'+template_name);
    client.onreadystatechange = function() {
        const directoryPath = path.join(__dirname, 'templates');

        //Get Template from folder
        alert(client.responseText);
        var template = client.responseText
        
        template = template.replace('{name}', name).replace('{time}', time).replace('{your_name}', your_name)
        document.getElementById('template_cards_container').innerHTML=template
    }
    client.send();
}
