// var accordion = document.getElementsByClassName("hobby-item")

// for(var i = 0; i < accordion.length; i++) {
//     accordion[i].addEventListener("click", function() {
//         this.classList.toggle("active-accordion");
//         var knowMore = this.nextElementSibling;
//         if(knowMore.style.display == "block") {
//             knowMore.style.display = "none";
//         }
//         else {
//             knowMore.style.display = "block";
//         }
//     });
// }

// const track = document.querySelector(".carousel__track");
// const slides = Array.from(track.children);

// const nextButton = document.querySelector(".carousel__button--right");
// const prevButton = document.querySelector(".carousel__button--left");

// const dotsNav = document.querySelector(".carousel__nav");
// const dots = Array.from(dotsNav.children);

// const slideWidth = slides[0].getBoundingClientRect().width;

// // arrange the slides next to one another
// const setSlidePosition = (slide, index) => {
//     slide.style.left = slideWidth * index + 'px';
// };
// slides.forEach(setSlidePosition);

// const moveToSlide = (track, currentSlide, targetSlide) => {
//     track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
//     currentSlide.classList.remove('current-slide');
//     targetSlide.classList.add('current-slide');
// }

// const updateDots = (currentDot, targetDot) => {
//     currentDot.classList.remove('current-slide');
//     targetDot.classList.add('current-slide');
// };

// const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
//     if(targetIndex === 0) {
//         prevButton.classList.add('is-hidden');
//         nextButton.classList.remove('is-hidden');
//     } else if (targetIndex === slides.length - 1) {
//         prevButton.classList.remove('is-hidden');
//         nextButton.classList.add('is-hidden');
//     } else {
//         prevButton.classList.remove('is-hidden');
//         nextButton.classList.remove('is-hidden');
//     }
// };

// // when I click left, move slides to the left
// prevButton.addEventListener('click', e => {
//     const currentSlide = track.querySelector('.current-slide');
//     const prevSlide = currentSlide.previousElementSibling;
//     const currentDot = dotsNav.querySelector('.current-slide');
//     const prevDot = currentDot.previousElementSibling;
//     const prevIndex = slides.findIndex(slide => slide === prevSlide);

//     moveToSlide(track, currentSlide, prevSlide);
//     updateDots(currentDot, prevDot);
//     hideShowArrows(slides, prevButton, nextButton, prevIndex);
// });

// // when I click right, move slides to the right
// nextButton.addEventListener('click', e => {
//     const currentSlide = track.querySelector('.current-slide');
//     const nextSlide = currentSlide.nextElementSibling;
//     const currentDot = dotsNav.querySelector('.current-slide');
//     const nextDot = currentDot.nextElementSibling;
//     const nextIndex = slides.findIndex(slide => slide === nextSlide);

//     moveToSlide(track, currentSlide, nextSlide);
//     updateDots(currentDot, nextDot);
//     hideShowArrows(slides, prevButton, nextButton, nextIndex);
// });

// // when I click the nav indicators, move to that slide
// dotsNav.addEventListener('click', e => {
//     const targetDot = e.target.closest('button');
//     if(!targetDot) return;
//     const currentSlide = track.querySelector('.current-slide');
//     const currentDot = dotsNav.querySelector('.current-slide');

//     const targetIndex = dots.findIndex(dot => dot == targetDot);
//     const targetSlide = slides[targetIndex];

//     moveToSlide(track, currentSlide, targetSlide);
//     updateDots(currentDot, targetDot);
//     hideShowArrows(slides, prevButton, nextButton, targetIndex);
// });

// // Playing music

// const play = document.querySelector(".fa-spotify");
// const spotify = document.querySelector(".spotify-color-background");

// play.addEventListener("click", () => {
//     const audio = document.querySelector("audio");
//     if (!audio.paused) {
//         spotify.style.backgroundColor = "#1ED760";
//         audio.pause();
//     } else {
//         audio.play();
//         play.classList.add("active");
//         spotify.style.backgroundColor = "#000";
//     }
// });

$(document).ready(function() {

// Accordion
$(".hobby-item").on("click", function() {
    $(this).toggleClass("active-accordion");
    var knowMore = $(this).next();
    if (knowMore.is(":visible")) {
    knowMore.hide();
    } else {
        knowMore.show();
    }
});

// Carousel
const $track = $(".carousel__track");
const $slides = $track.children();
const slideWidth = $slides.first().width();

// Arrange the slides next to one another
$slides.each(function(index) {
    $(this).css("left", slideWidth * index + "px");
});

const $prevButton = $(".carousel__button--left");
const $nextButton = $(".carousel__button--right");
const $dotsNav = $(".carousel__nav");
const $dots = $dotsNav.children();

const moveToSlide = (currentSlide, targetSlide) => {
    const targetLeft = $(targetSlide).css("left");
    $track.css("transform", `translateX(-${targetLeft})`);
    $slides.removeClass("current-slide");
    $(targetSlide).addClass("current-slide");
};

const updateDots = (currentDot, targetDot) => {
    $(currentDot).removeClass("current-slide");
    $(targetDot).addClass("current-slide");
};

const hideShowArrows = (targetIndex) => {
    $prevButton.toggleClass("is-hidden", targetIndex === 0);
    $nextButton.toggleClass("is-hidden", targetIndex === $slides.length - 1);
};

$prevButton.on("click", function() {
    const currentSlide = $track.find(".current-slide");
    const prevSlide = currentSlide.prev();
    const prevDot = $dotsNav.find(".current-slide").prev();
    const prevIndex = $slides.index(prevSlide);

    moveToSlide(currentSlide, prevSlide);
    updateDots($dotsNav.find(".current-slide"), prevDot);
    hideShowArrows(prevIndex);
});

$nextButton.on("click", function() {
    const currentSlide = $track.find(".current-slide");
    const nextSlide = currentSlide.next();
    const nextDot = $dotsNav.find(".current-slide").next();
    const nextIndex = $slides.index(nextSlide);

    moveToSlide(currentSlide, nextSlide);
    updateDots($dotsNav.find(".current-slide"), nextDot);
    hideShowArrows(nextIndex);
});

$dotsNav.on("click", "button", function() {
    const targetIndex = $(this).index();
    const currentSlide = $track.find(".current-slide");
    const targetSlide = $slides.eq(targetIndex);
    const currentDot = $dotsNav.find(".current-slide");

    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, this);
    hideShowArrows(targetIndex);
});

// Playing music
$(".fa-spotify").on("click", function() {
    const audio = $("audio")[0];
    const $spotify = $(".spotify-color-background");
    if (!audio.paused) {
        $spotify.css("background-color", "#1ED760");
        audio.pause();
    } else {
        audio.play();
        $(this).addClass("active");
        $spotify.css("background-color", "#000");
    }
});

});