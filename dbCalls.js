var successHTML = "<p>Thank you, <soan class='font-bold'>" + elemName.value + "</span>.</p><p>We will contact you soon via <span class='font-bold'>" + elemEmail.value + "</span></p>";
var elemMainContainer = document.getElementById('divMainContainer');

var showSuccessHTML = showSuccessHTML;
var saveData = saveData;

function saveData () {
    // START: FIREBASE CONFIGURATION
    var db_fireObj;

    firebase.initializeApp({
      apiKey: "AIzaSyAEaVw_zTYkVnDUmoklQh9dQCLxstvcePU",
      authDomain: "landing-contact-form.firebaseapp.com",
      databaseURL: "https://landing-contact-form.firebaseio.com",
      projectId: "landing-contact-form",
      storageBucket: "landing-contact-form.appspot.com",
      messagingSenderId: "608318984006"
    });

    db_fireObj = firebase.firestore();  
    db_fireObj.settings({
      timestampsInSnapshots: true
    });
    // END: FIREBASE CONFIGURATION

    db_fireObj.collection('contacts').add({
      Name: elemName.value,
      Email: elemEmail.value
    }).then(function(docRef) {
// TO DO: MAKE BROWSER NOT REMEMBER THE LAST ENTERED TEXTS
// TO DO: BACK-END TO RESTRICT ONLY 10 REQUESTS PER DAY FROM A IP
        console.log("Document written with ID: ", docRef.id, ' @', Date.now());
// TO DO: REMOVE resetForm & hideLoading IF RELOADING PAGE
        resetForm();
        hideLoading();
        showSuccessHTML();
    }).catch( function (error) {
        console.error("Error adding document: ", error);
    });
} // FN SAVE-DATA
  
function showSuccessHTML () {
    elemMainContainer.innerHTML = successHTML;
} // FN SHOW-SUCCESS-HTML
