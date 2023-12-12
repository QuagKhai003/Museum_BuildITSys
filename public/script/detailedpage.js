// function to hide the carousel arrows when there is only 1 image
function hideArrows() {
    var numDisplayedArtwork = document.querySelectorAll('.carousel-item').length;
    if (numDisplayedArtwork === 1) {
        document.querySelector('.carousel-control-prev').style.display = 'none';
        document.querySelector('.carousel-control-next').style.display = 'none';
    }
};
document.addEventListener('DOMContentLoaded', hideArrows);

// A function that displays a number of indicators equal to the number of images

function displayIndicator() {
    let numCarouselItem = document.querySelectorAll('.carousel-item').length;
    let indicator = document.querySelector('.carousel-indicators');

    indicator.innerHTML = '';   // clear html code inside the list carousel-indicator

    for (i = 0; i < numCarouselItem; i++) {
        let newIndicator = document.createElement('li');
        newIndicator.setAttribute('data-target', '#carouselExampleIndicators');
        newIndicator.setAttribute('data-slide-to', i.toString());
        if (i === 0) {
            newIndicator.classList.add('active');
        }

        indicator.appendChild(newIndicator);
    }
}

document.addEventListener('DOMContentLoaded', displayIndicator);
