
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
  if ( !filterEmail.test(elemEmail.value) ) {
    elemErrorMsg.innerHTML += " Email Address";
    showHideMsg();
    setTimeout(showHideMsg, 3000)
    elemEmail.focus();
    return false;
  } else {
    elemErrorMsg.innerHTML = "";
    saveData();
  }
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