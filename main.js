// JavaScript to toggle the mobile navigation
const navLinks = document.querySelector(".header__nav");
function showMenu() {
  navLinks.style.left = "0";
}
function hideMenu() {
  navLinks.style.left = "-800px";
}

$(document).ready(function () {
  var slidesToShow = 7; // Default value

  $(".occasions-container").slick({
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
    // variableWidth: true,
    // centerMode: false,
    infinite: false, 
    easing: 'easeInOutCubic',
    initialSlide: 0, 
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
        },
      },
      
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },

    ],
    prevArrow: $(".custom-prev"),
    nextArrow: $(".custom-next")
  });
});

const nav = document.querySelectorAll(".header__nav ul li");
for (let i = 0; i < nav.length; i++) {
  if (
    nav[i].innerHTML.includes("Home") &&
    location.pathname.includes("index")
  ) {
    nav[i].classList.add("selected");
  } else if (
    nav[i].innerHTML.includes("Shop") &&
    location.pathname.includes("shop")
  ) {
    nav[i].classList.add("selected");
  } else if (
    nav[i].innerHTML.includes("About") &&
    location.pathname.includes("about")
  ) {
    nav[i].classList.add("selected");
  } else if (
    nav[i].innerHTML.includes("Contact") &&
    location.pathname.includes("contact")
  ) {
    nav[i].classList.add("selected");
  } else {
    nav[i].classList.remove("selected");
  }
}
