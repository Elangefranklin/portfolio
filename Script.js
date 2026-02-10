document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  if (navbarPlaceholder) {
    fetch("components/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarPlaceholder.innerHTML = data;
        initializeNavbar();
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }
});

function initializeNavbar() {
  const toggleButton = document.querySelector(".header__toggle");
  const closeButton = document.querySelector(".header__close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  if (toggleButton && mobileMenu && closeButton) {
    toggleButton.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    });

    const closeMenu = () => {
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = "";
    };

    closeButton.addEventListener("click", closeMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
}
