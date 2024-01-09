const title = document.querySelectorAll(".categories-titles .title")
const categories = document.querySelectorAll(".categories-content")


title[0].addEventListener('click', () => {
    console.log("click")
    if(title[0].classList.contains("active")) {
        title[1].classList.remove("active")
        title[2].classList.remove("active")
        categories[1].classList.remove("active")
        categories[2].classList.remove("active")
    }
    else {
        title[0].classList.add("active")
        categories[0].classList.add("active")
        title[1].classList.remove("active")
        title[2].classList.remove("active")
        categories[1].classList.remove("active")
        categories[2].classList.remove("active")
    }
})

title[1].addEventListener('click', () => {
    console.log("click")
    if(title[1].classList.contains("active")) {
        title[0].classList.remove("active")
        title[2].classList.remove("active")
        categories[0].classList.remove("active")
        categories[2].classList.remove("active")
    }
    else {
        title[1].classList.add("active")
        categories[1].classList.add("active")
        title[0].classList.remove("active")
        title[2].classList.remove("active")
        categories[0].classList.remove("active")
        categories[2].classList.remove("active")
    }
})

title[2].addEventListener('click', () => {
    console.log("click")
    if(title[2].classList.contains("active")) {
        title[0].classList.remove("active")
        title[1].classList.remove("active")
        categories[0].classList.remove("active")
        categories[1].classList.remove("active")
    }
    else {
        title[2].classList.add("active")
        categories[2].classList.add("active")
        title[0].classList.remove("active")
        title[1].classList.remove("active")
        categories[0].classList.remove("active")
        categories[1].classList.remove("active")
    }
})