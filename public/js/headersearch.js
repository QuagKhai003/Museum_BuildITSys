let searchbtn = document.querySelector('.searchbtn');
let closebtn = document.querySelector('.closebtn');
let searchBox = document.querySelector('.searchBox');
let searchInput = document.querySelector('input.searchInput')

searchbtn.addEventListener('click', () => {
    searchbtn.classList.add('open');
    closebtn.classList.add('open');
    searchBox.classList.add('open');
    searchInput.classList.add('open');
})

closebtn.addEventListener('click', () => {
    searchbtn.classList.remove('open');
    closebtn.classList.remove('open');
    searchBox.classList.remove('open');
    searchInput.classList.remove('open');
})