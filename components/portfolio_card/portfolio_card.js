document.addEventListener("DOMContentLoaded", () => {
  const portfolioGrid = document.getElementById("portfolio-grid");

  if (!portfolioGrid) return;

  const projects =
    typeof projectsData !== "undefined"
      ? projectsData
      : window.projectsData || [];

  projects.forEach((project) => {
    const cardHTML = createPortfolioCard(project);
    portfolioGrid.insertAdjacentHTML("beforeend", cardHTML);
  });
});

function createPortfolioCard(project) {
  // Handle responsive thumbnail if it's an object, or fallback to string
  let imgAttributes = "";
  if (typeof project.thumbnail === "string") {
    imgAttributes = `src="${project.thumbnail}"`;
  } else if (project.thumbnail) {
    imgAttributes = `src="${project.thumbnail.src}"`;
    if (project.thumbnail.srcset)
      imgAttributes += ` srcset="${project.thumbnail.srcset}"`;
    if (project.thumbnail.sizes)
      imgAttributes += ` sizes="${project.thumbnail.sizes}"`;
  }

  return `
    <a href="project_detail_page.html?id=${project.id}" class="card">
      <img ${imgAttributes} alt="${project.title} Thumbnail" class="card-image" />
      <div class="card-overlay">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="card-link">
          Läs mer
          <span class="arrow">→</span>
        </span>
      </div>
    </a>
  `;
}
