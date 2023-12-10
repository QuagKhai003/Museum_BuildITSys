let staticSearchBtn = document.querySelector('.staticSearchBtn');
let searchBox = document.querySelector('.search');
let searchbtn = document.querySelector('.searchbtn');
let closebtn = document.querySelector('.closebtn');
let searchInput = document.querySelector('input.searchInput')

staticSearchBtn.addEventListener('click', () => {
    searchBox.classList.add('open');
    searchbtn.classList.add('open');
    closebtn.classList.add('open');
    searchInput.classList.add('open');
})

closebtn.addEventListener('click', () => {
    searchBox.classList.remove('open');
    searchbtn.classList.remove('open');
    closebtn.classList.remove('open');
    searchInput.classList.remove('open');
})

let menutoggle = document.querySelector('.menutoggle');
let closemenubtn = document.querySelector('.closemenubtn');
let menucontainer = document.querySelector('.menu-container');

menutoggle.addEventListener('click', () => {
    menucontainer.classList.add('open')
})

closemenubtn.addEventListener('click', () => {
    menucontainer.classList.remove('open')
})

window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768 && searchBox.classList.contains('open')) {
        searchBox.classList.remove('open');
    }
});