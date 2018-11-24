
// <script src="https://www.gstatic.com/firebasejs/5.5.9/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAEaVw_zTYkVnDUmoklQh9dQCLxstvcePU",
//     authDomain: "landing-contact-form.firebaseapp.com",
//     databaseURL: "https://landing-contact-form.firebaseio.com",
//     projectId: "landing-contact-form",
//     storageBucket: "landing-contact-form.appspot.com",
//     messagingSenderId: "608318984006"
//   };
//   firebase.initializeApp(config);
// </script>
var saveData = saveData;
var validateForm = validateForm;
var resetForm = resetForm;

var elemName = document.getElementById('inpName');
var elemEmail = document.getElementById('inpEmail');
var elemErrorMsg = document.getElementById('spanErrorMsg');

var filterEmail = /^([a-zA-Z])([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function enterToSubmit (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
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
    elemErrorMsg.innerHTML = "";
    saveData();
    return;
  }

  showHideMsg();
  setTimeout(showHideMsg, 3000)
} // FN VALIDATE-FORM

function showHideMsg () {
  if ( elemErrorMsg.classList.contains('show') ) {
    elemErrorMsg.classList.remove('show');
    elemErrorMsg.classList.add('hide');
  } else {
    elemErrorMsg.classList.remove('hide');
    elemErrorMsg.classList.add('show');
  }
} // FN SHOW-HIDE-MSG

function saveData () {
  resetForm();
} // FN SAVE-DATA

function resetForm () {
  elemName.value = "";
  elemEmail.value = "";
} // FN RESET-FORM