var validateForm = validateForm;
// var resetForm = resetForm;
var showLoading = showLoading;
var hideLoading = hideLoading;
var showHideMsg = showHideMsg;
var loadScript = loadScript;
var loadFirebase = loadFirebase;

var elemName = document.getElementById('inpName');
var elemEmail = document.getElementById('inpEmail');
var elemErrorMsg = document.getElementById('spanErrorMsg');

var filterEmail = /^([a-zA-Z])([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function enterToSubmit (event) {
  event.preventDefault();
  if ( event.keyCode === 13 ) {
    validateForm();
  }
} // FN ENTER-TO-SUBMIT

elemName.addEventListener("keyup", enterToSubmit);
elemEmail.addEventListener("keyup", enterToSubmit);

function validateForm () {
  elemEmail.value = elemEmail.value.trim();
  elemName.value = elemName.value.trim();

  if ( !filterEmail.test(elemEmail.value) && elemName.value.length === 0 ) {
    elemErrorMsg.innerHTML = "Please provide a valid Name & Email Address";
    elemName.focus();
  } else if ( elemName.value.length === 0 ) {
    elemErrorMsg.innerHTML = "Please provide a valid Name";
    elemName.focus();
  } else if ( !filterEmail.test(elemEmail.value) ) {
    elemErrorMsg.innerHTML = "Please provide a valid Email Address";
    elemEmail.focus();
  } else {
    showLoading();
    elemErrorMsg.innerHTML = "";
    loadScript("./dbCalls.js", loadFirebase);
    return;
  }

  showHideMsg();
  setTimeout(showHideMsg, 3000);
} // FN VALIDATE-FORM

function showLoading () {
  document.getElementById('divLoading').className = 'display';
}

function hideLoading () {
  document.getElementById('divLoading').className = 'none';
}

function showHideMsg () {
  if ( elemErrorMsg.classList.contains('show') ) {
    elemErrorMsg.classList.remove('show');
    elemErrorMsg.classList.add('hide');
  } else {
    elemErrorMsg.classList.remove('hide');
    elemErrorMsg.classList.add('show');
  }
} // FN SHOW-HIDE-MSG

function loadFirebase () {
  loadScript("https://www.gstatic.com/firebasejs/5.5.9/firebase.js", saveData);
} // FN LOAD-FIREBASE

// function resetForm () {
//   elemName.value = "";
//   elemEmail.value = "";
// } // FN RESET-FORM

function loadScript (url, callback) {
  var script = document.createElement("script")
  script.type = "text/javascript";

  if ( script.readyState ) {  // IE
    script.onreadystatechange = function () {
      if ( script.readyState === "loaded" ||
          script.readyState === "complete" ) {
            script.onreadystatechange = null;
            callback();
      }
    };
  } else {  // Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
} // FN LOAD-SCRIPT