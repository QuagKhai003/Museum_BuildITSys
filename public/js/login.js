const rButton = document.getElementById("register");
const lButton = document.getElementById("login");
const cont = document.getElementById("container");

rButton.addEventListener("click", () => {
  cont.classList.add("right-panel-active");
});

lButton.addEventListener("click", () => {
  cont.classList.remove("right-panel-active");
});

function artistRegister(e) {
  e.preventDefault();
  console.log("artistRegister function called");
  window.location.replace("http://localhost:3000/register/artist");
}

function visitorRegister(e) {
  e.preventDefault();
  console.log("visitorRegister function called");
  window.location.replace("http://localhost:3000/register/visitor");
}