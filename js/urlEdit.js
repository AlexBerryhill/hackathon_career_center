// // create an event listener for each url
// const elements = document.querySelectorAll('a[href]')
// elements.forEach(element => {
//   element.addEventListener('click', () =>{
//     loadHref(element.textContent, element.getAttribute('href'));
//   });
// });

const { get } = require("request-promise");

//document.addEventListener("click", checkIfUrl(event.target))

function getOffset(ele) {
  const rect = ele.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function checkIfUrl(value) {
  // Check is the value that was clicked
  var check = value.target;
  var offsets = getOffset(check);

  // If the element you clicked is a link
  if (check.getAttribute("href") !== null) {
    // Open the modal for that link
    loadHref(
      check.textContent,
      check.getAttribute("href"),
      check.getAttribute("id"),
      offsets.left,
      offsets.top
    );
  }

  // If the modal is already open
  else if (document.getElementById("urlpopup").style.display == "block"){
    document.getElementById("urlpopup").style.display = "none";
  }

}

//fill in the popup with the current values from the url
function loadHref(text, url, id, x, y) {
  document.querySelector("#urltext").value = text;
  document.querySelector("#urllink").value = url;
  document.querySelector("#id").value = id;
  document.getElementById("urlpopup").style.left = (x + 10).toString() + "px";
  document.getElementById("urlpopup").style.top = (y + 30).toString() + "px";
  document.getElementById("urlpopup").style.display = "block";
}

// A function that will change the content of the selected tag
function editHref(form) {
  // Update the inner html and href of the link, rehide the modal
  document.getElementById(form.id.value).textContent = form.urltext.value;
  document.getElementById(form.id.value).href = form.urllink.value;
  document.getElementById("urlpopup").style.display = "none";

  // Return true for.. validation purposes?
  return true;
}
