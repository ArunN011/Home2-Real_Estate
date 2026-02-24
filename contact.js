document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("contactForm")
.addEventListener("submit", function(e){
  e.preventDefault();
  alert("Message sent successfully!");
  this.reset();
});

});