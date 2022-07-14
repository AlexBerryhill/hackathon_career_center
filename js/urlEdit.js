// Dependencies
const { get } = require("request-promise");

// A function to get the offset of an element
function getOffset(ele) {

  // Get th bounding box
  const rect = ele.getBoundingClientRect();
  
  // Return the distance from the left side of the page, and from the top
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

// Check if you clicked a link within an editable text-area
function checkIfUrl(value) {

  // Check is the value that was clicked
  var check = value.target;
  var offsets = getOffset(check);

  // If the element you clicked is a link, and the modal isn't open
  if (check.getAttribute("href") !== null) {

    // Open the link-editing modal for that link
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

    // Hide it
    document.getElementById("urlpopup").style.display = "none";
  }

}

//fill in the popup with the current values from the url
function loadHref(text, url, id, x, y) {

  // Load parameters into the modals html
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
