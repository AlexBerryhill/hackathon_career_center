
// // create an event listener for each url
// const elements = document.querySelectorAll('a[href]')
// elements.forEach(element => {
//   element.addEventListener('click', () =>{
//     loadHref(element.textContent, element.getAttribute('href'));
//   });
// });

//document.addEventListener("click", checkIfUrl(event.target))

function checkIfUrl(value){

    // Check is the value that was clicked
    var check = value.target;
    console.log(check);

    // If the element you clicked is a link
    if(check.getAttribute('href') !== null){
        console.log(check.getAttribute('href'));

        // Open the modal for that link
        loadHref(check.textContent, 
        check.getAttribute('href'), 
        check.getAttribute('id'));
    }
}

//fill in the popup with the current values from the url
function loadHref(text, url, id){
document.querySelector("#urltext").value = text;
document.querySelector("#urllink").value = url;
document.querySelector("#id").value = id;
console.log(document.getElementById("urlpopup"));
document.getElementById("urlpopup").style.display='block';
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

