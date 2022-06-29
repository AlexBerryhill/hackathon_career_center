
// create an event listener for each url
const elements = document.querySelectorAll('a[href]')
elements.forEach(element => {
  element.addEventListener('click', () =>{
    loadHref(element.textContent, element.getAttribute('href'));
  });
});

//fill in the popup with the current values from the url
function loadHref(text, url, id){
document.querySelector("#url-text").value = text;
document.querySelector("#url-link").value = url;
document.querySelector("#hidden").value = id;
document.getElementById("url-popup").style.display='fixed';
}

// A function that will change the content of the selected tag
function editHref(form){
    document.getElementById()
    document.getElementById()
    document.getElementById()
    document.getElementById()
    document.querySelector("url-popup").style.display='none';
}
