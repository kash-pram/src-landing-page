
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
  setTimeout(showHideMsg, 3000);
} // FN VALIDATE-FORM

function showLoading () {
  showHideMsg();
  elemErrorMsg.innerHTML = "Saving...";
}

function hideLoading () {
  elemErrorMsg.innerHTML = "";
  showHideMsg();
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

function saveData () {
  showLoading();
  loadScript("https://www.gstatic.com/firebasejs/5.5.9/firebase.js", sendValues);

} // FN SAVE-DATA

function sendValues () {
  firebase.initializeApp({
    apiKey: "AIzaSyAEaVw_zTYkVnDUmoklQh9dQCLxstvcePU",
    authDomain: "landing-contact-form.firebaseapp.com",
    databaseURL: "https://landing-contact-form.firebaseio.com",
    projectId: "landing-contact-form",
    storageBucket: "landing-contact-form.appspot.com",
    messagingSenderId: "608318984006"
  });
  var db_fireObj = firebase.firestore();

  db_fireObj.settings({
    timestampsInSnapshots: true
  });

  db_fireObj.collection('contacts').add({
    Name: elemName.value,
    Email: elemEmail.value
    }).then(function(docRef) {
    // TO DO: MAKE BROWSER NOT REMEMBER THE LAST ENTERED TEXTS
    // TO DO: BACK-END TO RESTRICT ONLY 10 REQUESTS PER DAY FROM A IP

        console.log("Document written with ID: ", docRef.id, ' @', Date.now());
        resetForm();
        hideLoading();
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function resetForm () {
  elemName.value = "";
  elemEmail.value = "";
} // FN RESET-FORM

function loadScript (url, callback) {

  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState){  //IE
      script.onreadystatechange = function () {
          if (script.readyState === "loaded" ||
                  script.readyState === "complete"){
              script.onreadystatechange = null;
              callback();
          }
      };
  } else {  //Others
      script.onload = function () {
          callback();
      };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}