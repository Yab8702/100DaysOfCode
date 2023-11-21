let wasGreaterThan833 = window.innerWidth > 833;

function handleFooterLinks() {
  let footerLinksWrapper = document.querySelector(".footer-links-wrapper");
  let footerLinks = document.querySelectorAll(".footer-links-wrapper ul");

  if (window.innerWidth <= 833) {
    footerLinksWrapper.classList.add("someClass");
    footerLinks.forEach(function (ul) {
      ul.style.display = "none";
    });
  } else {
    footerLinksWrapper.classList.remove("someClass");
    footerLinks.forEach(function (ul) {
      ul.style.display = "block";
    });
  }
}

handleFooterLinks();

window.addEventListener("resize", function (event) {
  var isGreaterThan833Now = window.innerWidth > 833;

  if (wasGreaterThan833) {
    var expandedHeadings = document.querySelectorAll(".someClass h3.expanded");
    expandedHeadings.forEach(function (heading) {
      var ul = heading.nextElementSibling;
      ul.style.display = "none";
      heading.classList.remove("expanded");
    });

    handleFooterLinks();
  } else if (isGreaterThan833Now) {
    var expandedHeadings = document.querySelectorAll(".someClass h3.expanded");
    expandedHeadings.forEach(function (heading) {
      heading.classList.remove("expanded");
    });

    handleFooterLinks();
  }

  wasGreaterThan833 = isGreaterThan833Now;
});

// Footer collapse functionality
document.addEventListener("click", function (event) {
  var clickedElement = event.target;

  if (window.innerWidth <= 833) {
    if (clickedElement.matches(".someClass h3")) {
      let heading = clickedElement;
      let ul = heading.nextElementSibling;

      if (ul.style.display === "none") {
        ul.style.display = "block";
        heading.classList.add("expanded");
      } else {
        ul.style.display = "none";
        heading.classList.remove("expanded");
      }
    }
  }
});

// Pause button functionality
let isPaused = true;
document
  .querySelector(".circle-container")
  .addEventListener("click", function () {
    isPaused = !isPaused;

    var pauseIcon = document.getElementById("pause");

    if (isPaused) {
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    } else {
      pauseIcon.classList.remove("fa-play");
      pauseIcon.classList.add("fa-pause");
    }
  });

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  centeredSlides: true,
  spaceBetween: 30,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

var menu = document.querySelector(".ri-menu-3-line");
var clo = document.querySelector(".ri-close-fill");
var nav = document.querySelector(".respo-nav");

menu.addEventListener("click", function () {
  nav.style.top = "0%";
});

clo.addEventListener("click", function () {
  nav.style.top = "-120%";
});

document.addEventListener("DOMContentLoaded", function () {
  function setupDropdown(link, submenuSelector) {
    var submenu = document.querySelector(submenuSelector);
    var sub_btm = document.querySelector(".sub-btm");
    var nav = document.querySelector("nav");

    link.addEventListener("mouseenter", function () {
      submenu.style.display = "block";
      submenu.style.position = "fixed";
      nav.style.backgroundColor = "rgb(22, 22, 23)";
    });

    link.addEventListener("mouseleave", function () {
      setTimeout(function () {
        if (!submenu.matches(":hover")) {
          submenu.style.display = "none";
          nav.style.backgroundColor = "rgba(22, 22, 23, 0.8)";
        }
      }, 200);
    });

    submenu.addEventListener("mouseenter", function () {
      submenu.style.display = "block";
      submenu.style.position = "fixed";
      nav.style.backgroundColor = "rgb(22, 22, 23)";
    });

    submenu.addEventListener("mouseleave", function () {
      setTimeout(function () {
        if (!link.matches(":hover")) {
          submenu.style.display = "none";
          nav.style.backgroundColor = "rgba(22, 22, 23, 0.8)";
        }
      }, 200);
    });

    sub_btm.addEventListener("mouseenter", function () {
      setTimeout(function () {
        submenu.style.display = "none";
      }, 200);
    });
  }

  var dropdownLinks = document.querySelectorAll(".dropdown-link");
  dropdownLinks.forEach(function (link) {
    var targetId = link.getAttribute("data-target");
    setupDropdown(link, "#" + targetId);
  });
  var search = document.querySelector(".search");
  var submenu_search = document.querySelector(".submenu_search");
  var submenuTimeout;

  search.addEventListener("click", function () {
    submenu_search.style.display = "block";
    submenu_search.style.position = "fixed";
  });

  search.addEventListener("mouseleave", function () {
    // Set a delay before hiding the submenu
    submenuTimeout = setTimeout(function () {
      submenu_search.style.display = "none";
    }, 200); // Adjust the delay as needed
  });

  submenu_search.addEventListener("mouseenter", function () {
    // Cancel the submenu hide if the user enters the submenu
    clearTimeout(submenuTimeout);
  });

  submenu_search.addEventListener("mouseleave", function () {
    submenu_search.style.display = "none";
  });
});
