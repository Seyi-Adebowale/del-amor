// JavaScript to toggle the mobile navigation
const navLinks = document.querySelector(".header__nav");
function showMenu() {
  navLinks.style.left = "0";
}
function hideMenu() {
  navLinks.style.left = "-800px";
}

const nav = document.querySelectorAll(".header__nav ul li");

for (let i = 0; i < nav.length; i++) {
  const anchor = nav[i].querySelector("a");
  const pageName = anchor.textContent.trim().toLowerCase();
  const pathName = location.pathname.toLowerCase();

  // Keywords related to shop pages
  const shopPageKeywords = ["shop", "personalized", "male", "female", "children", "cooperate", "festive", "couple", "souvenirs", "naughty", "product"];

  // Check if the current link is the "Shop" link
  const isShopLink = pageName === "shop";

  // Check if any part of the path contains any shop-related keywords
  const isShopPage = shopPageKeywords.some(keyword => pathName.includes(`/${keyword}`));

  // Special condition for the "Home" page (index.html)
  const isHomePage = pageName === "home" && pathName.endsWith("index.html");

  if ((isShopLink && isShopPage) || (!isShopLink && (isHomePage || pathName.includes(pageName)))) {
    nav[i].classList.add("selected");
  } else {
    nav[i].classList.remove("selected");
  }
}










$(document).ready(function () {

  $(".occasions-container").slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
      autoplaySpeed: 1000, // Adjust the speed in milliseconds
      infinite: true,
      arrows: false,
    // variableWidth: true,
    // centerMode: false,
    // infinite: false,
    cssEase: 'ease-in-out',
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
    nextArrow: $(".custom-next"),
  });
});
