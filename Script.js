document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  const footerPlaceholder = document.getElementById("footer-placeholder");

  if (navbarPlaceholder) {
    fetch("components/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarPlaceholder.innerHTML = data;
        initializeNavbar();
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }

  if (footerPlaceholder) {
    fetch("components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));
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

  // Scroll Spy Logic for active links
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".header__nav-item");

  if (sections.length > 0 && navItems.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          // Update Desktop Nav
          navItems.forEach((item) => {
            const link = item.querySelector(".header__link");
            if (link) {
              if (link.getAttribute("href") === `#${id}`) {
                item.classList.add("active");
              } else {
                item.classList.remove("active");
              }
            }
          });

          // Update Mobile Nav
          if (mobileLinks) {
            mobileLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }
}
