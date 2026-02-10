document.addEventListener("DOMContentLoaded", () => {
  const portfolioGrid = document.getElementById("portfolio-grid");

  if (!portfolioGrid) return;

  const projects = [
    {
      title: "Project Ett",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "assets/img/poject_1.jpg",
      link: "#",
    },
    {
      title: "Project Två",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "assets/img/project_2.jpg",
      link: "#",
    },
    {
      title: "Project Tre",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      image: "assets/img/project_3.jpg",
      link: "#",
    },
    {
      title: "Project Fyra",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      image: "assets/img/project_4.jpg",
      link: "#",
    },
  ];

  projects.forEach((project) => {
    const cardHTML = createPortfolioCard(project);
    portfolioGrid.insertAdjacentHTML("beforeend", cardHTML);
  });
});

function createPortfolioCard(project) {
  return `
    <article class="portfolio_card">
      <div class="portfolio_card_image_container">
        <img src="${project.image}" alt="${project.title}" />
      </div>
      <div class="portfolio_card_content">
        <h3 class="portfolio_card_title">${project.title}</h3>
        <p class="project_card_description">
          ${project.description}
        </p>
        <a href="${project.link}" class="btn-project">
          Se project
          <span class="project_btn_icon">
            <svg
              class="icon"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7282 5.19692C14.2407 4.68436 15.0718 4.68436 15.5843 5.19692L23.4593 13.0719C23.9719 13.5845 23.9719 14.4155 23.4593 14.9281L15.5843 22.8031C15.0718 23.3156 14.2407 23.3156 13.7282 22.8031C13.2156 22.2905 13.2156 21.4595 13.7282 20.9469L20.6751 14L13.7282 7.05308C13.2156 6.54051 13.2156 5.70949 13.7282 5.19692Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.15625 14C4.15625 13.2751 4.74388 12.6875 5.46875 12.6875H21.4375C22.1624 12.6875 22.75 13.2751 22.75 14C22.75 14.7249 22.1624 15.3125 21.4375 15.3125H5.46875C4.74388 15.3125 4.15625 14.7249 4.15625 14Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </a>
      </div>
    </article>
  `;
}
