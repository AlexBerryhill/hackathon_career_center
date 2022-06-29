
// // create an event listener for each url
// const elements = document.querySelectorAll('a[href]')
// elements.forEach(element => {
//   element.addEventListener('click', () =>{
//     loadHref(element.textContent, element.getAttribute('href'));
//   });
// });

document.addEventListener("click", checkIfUrl)

function checkIfUrl(){

}

//fill in the popup with the current values from the url
function loadHref(text, url, id){
document.querySelector("#urltext").value = text;
document.querySelector("#urllink").value = url;
document.querySelector("#id").value = id;
document.getElementById("urlpopup").style.display='fixed';
}

// A function that will change the content of the selected tag
function editHref(form){
    
    // Update the inner html and href of the link, rehide the modal
    document.getElementById(form.id).innerhtml = form.urltext;
    document.getElementById(form.id).href = form.urllink;
    document.getElementById("urlpopup").style.display='none';
    
    // Return true for.. validation purposes?
    return true;
}

