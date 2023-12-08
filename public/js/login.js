const rButton = document.getElementById("register");
const lButton = document.getElementById("login");
const cont = document.getElementById("container");

rButton.addEventListener("click", () => {
  cont.classList.add("right-panel-active");
});

lButton.addEventListener("click", () => {
  cont.classList.remove("right-panel-active");
});