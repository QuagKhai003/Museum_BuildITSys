// Select element for normal screen size
let staticSearchBtn = document.querySelector('.staticSearchBtn');
let searchBox = document.querySelector('.search');
let searchbtn = document.querySelector('.searchbtn');
let closebtn = document.querySelector('.closebtn');
let searchInput = document.querySelector('input.searchInput')


// Add event when clicking on the search button, the search box element is shown up
staticSearchBtn.addEventListener('click', () => {
    searchBox.classList.add('open');
    searchbtn.classList.add('open');
    closebtn.classList.add('open');
    searchInput.classList.add('open');
})


// Add event when clicking on the close button, the search box element is hided
closebtn.addEventListener('click', () => {
    searchBox.classList.remove('open');
    searchbtn.classList.remove('open');
    closebtn.classList.remove('open');
    searchInput.classList.remove('open');
})

// Select element for 768px screen size
let menutoggle = document.querySelector('.menutoggle');
let closemenubtn = document.querySelector('.closemenubtn');
let menucontainer = document.querySelector('.menu-container');

// Add event when clicking on the hamburger button, the search box element is shown up
menutoggle.addEventListener('click', () => {
    menucontainer.classList.add('open')
})

// Add event when clicking on the close menu button , the search box element is hided
closemenubtn.addEventListener('click', () => {
    menucontainer.classList.remove('open')
})

//Auto remove the search box which is for the screen size above 768
window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768 && searchBox.classList.contains('open')) {
        searchBox.classList.remove('open');
    }
});