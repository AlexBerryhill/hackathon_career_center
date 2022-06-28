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
        document.getElementById('template_cards_container').innerHTML=template_cards
        document.getElementById('template_cards_container').style.display='grid'
    });
}

function fillTemplate(template_name, name, time, your_name){
    var client = new XMLHttpRequest();
    client.open('GET', './templates/'+template_name);
    client.onreadystatechange = function() {
        const directoryPath = path.join(__dirname, 'templates');

        //Get Template from folder
        var template = client.responseText
        
        template = template.replace('{name}', name).replace('{time}', time).replace('{your_name}', your_name)
        document.getElementById('template_cards_container').style.display='block'
        document.getElementById('template_cards_container').innerHTML=template
    }
    client.send();
}

function openTemplateCreater(){
    html =  "<div>"+
            "    <input type = 'text' name = 'template_title' id = 'template_title' placeholder='Title'></input>"+
            "    <textarea name='template_text' id='template_text' cols='60' rows='20' placeholder='content'></textarea>"+
            "    <button onclick='createTemplate()'>Create</button>"+
            "</div>"
    document.getElementById('template_cards_container').innerHTML=html
}

function createTemplate(){
    title = document.getElementById('template_title').value;
    text = document.getElementById('template_text').value;
    html =  '<!DOCTYPE html>'+
            '\n    <html>'+
            '\n    <head>'+
            '\n        <base target="_top">'+
            '\n    </head>'+
            '\n    <body>'+
            '\n        <p>'+
                        text+
            '\n           <br>{your_name}<br>'+
            '\n           Career Success Mentor<br>'+
            '\n           BYU-I Career Center | MC 200 <br>'+ 
            '\n           208.496.9825  <br>'+
            '\n           <a href="byui.edu/career/students/job-market-readiness">byui.edu/career/students/job-market-readiness</a>'+
            '\n        </p>'+
            '\n    </body>'+
            '\n</html>';

    //change newline to <br> tags
    html = html.replaceAll('\n', '<br/>');

    fs.writeFile("./templates/"+title+".html", html, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          document.getElementById('template_title').innerHTML=''
          document.getElementById('template_text').innerHTML=''
          fillTemplateCards()
        }
    });
}

function sendEmail(){
    email = 'amsb99@gmail.com'
    body = document.getElementById('template_cards_container').value
    
    window.open('mailto:'+email+'?subject="subject"&body='+body)
}

function deleteTemplate(template_name){
    // delete a file
    try {
        fs.unlinkSync("./templates/"+template_name);
        fillDeleteTemplateCards()
        console.log("File is deleted.");
    } catch (error) {
        console.log(error);
    }
}

function fillDeleteTemplateCards(){
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
            template_cards += "<div class = 'template_card delete_template' onclick='deleteTemplate("+'"'+file+'"'+")'>" +file+"</div>";
        });
        document.getElementById('template_cards_container').innerHTML=template_cards
        document.getElementById('template_cards_container').style.display='grid'
    });
}