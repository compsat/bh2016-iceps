Parse.initialize('M7rEpExhQwGyQFhORep60981O9FF83c66vj8SQ1L','LVdjgbIgxWhoqazEsjDTRMTWGKxPPBRzsjuDYKKe');

// from http://codepen.io/diegoleme/pen/surIK
var password = document.getElementById("password"), confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
  });
});

var signUp = document.getElementById('signUp');
signUp.addEventListener('click', function(){
  var user = new Parse.User();
  user.set("username", document.getElementById('fullname').value);
  user.set("password", document.getElementById('password').value);
  user.set("email", document.getElementById('email').value);
  user.signUp(null, {
    success: function(user) {
      location.href="dashboard.html";
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
});
