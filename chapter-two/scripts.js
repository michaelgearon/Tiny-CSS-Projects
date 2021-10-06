document.querySelectorAll(".switch").forEach(function(theSwitch) {
  theSwitch.addEventListener("click", handleClickEvent, false);
});

function handleClickEvent(evt) {
  let el = evt.target;

  if (el.getAttribute("aria-checked") == "true") {
  	el.setAttribute("aria-checked", "false");
    	document.body.removeAttribute("data-theme");
	localStorage.removeItem("darkSwitch");
  } else {
  	el.setAttribute("aria-checked", "true");
    	document.body.setAttribute("data-theme", "dark");
	localStorage.setItem("darkSwitch", "dark");
  }
}
