const filter_heading = document.querySelector('.filter-heading')
const caretdown = document.querySelector('.caretdown')
const categories = document.querySelector('.categories')

filter_heading.addEventListener('click', () => {
    console.log("Clicked")
    if (caretdown.style.transform === 'rotate(0deg)') {
        caretdown.style.transform = 'rotate(180deg)';
        categories.classList.add('slide-down')
    } else {
        caretdown.style.transform = 'rotate(0deg)';
        categories.classList.remove('slide-down')
    }
})