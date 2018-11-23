
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


function checkEmail() {

  var email = document.getElementById('inpEmail');
  // var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var filter = /^([a-zA-Z])?([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email.value)) {
    alert('Please provide a valid email address');
    email.focus;
    return false;
  }
}