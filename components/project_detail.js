document.addEventListener("DOMContentLoaded", () => {
  // Get the project ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (!projectId) {
    // If no ID is provided, you could show an error or redirect to the portfolio page
    console.error("No project ID specified in URL.");
    document.querySelector("main").innerHTML =
      "<p style='text-align: center; padding: 4rem;'>Project not found. <a href='index.html'>Go back to portfolio</a></p>";
    return;
  }

  // Find the project in projectsData
  const projects =
    typeof projectsData !== "undefined"
      ? projectsData
      : window.projectsData || [];
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    console.error(`Project with ID "${projectId}" not found.`);
    document.querySelector("main").innerHTML =
      "<p style='text-align: center; padding: 4rem;'>Project not found. <a href='index.html'>Go back to portfolio</a></p>";
    return;
  }

  // Update document title
  document.title = `${project.title} - Project Detail`;

  // Helper function to safely set text content
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "";
  };

  // Helper function to safely set image src, alt, srcset, and sizes
  const setImage = (id, imgData, altText) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (imgData) {
      if (typeof imgData === "string") {
        // Fallback for string-based images
        el.src = imgData;
        el.removeAttribute("srcset");
        el.removeAttribute("sizes");
      } else {
        // Handle responsive image objects
        el.src = imgData.src || "";
        if (imgData.srcset) {
          el.setAttribute("srcset", imgData.srcset);
        } else {
          el.removeAttribute("srcset");
        }

        if (imgData.sizes) {
          el.setAttribute("sizes", imgData.sizes);
        } else {
          el.removeAttribute("sizes");
        }
      }
      el.alt = altText || "";
      el.style.display = "block"; // Ensure it's visible if it was hidden
    } else {
      el.style.display = "none"; // Hide if no image is provided
      el.removeAttribute("srcset");
      el.removeAttribute("sizes");
    }
  };

  // Populate hero/intro section
  setImage(
    "detail-hero-img",
    project.heroImage,
    `Hero image for ${project.title}`,
  );
  setText("detail-title", project.title);
  setText("detail-subtitle", project.subtitle);

  // Populate details section
  setText("detail-year", project.details?.year);
  setText("detail-workType", project.details?.workType);
  setText("detail-tools", project.details?.tools);

  // Populate background section
  setText("detail-bg-title", project.background?.title || "Bakgrund");
  setText("detail-bg-text", project.background?.text);
  setImage(
    "detail-bg-img",
    project.background?.image,
    `Background image for ${project.title}`,
  );

  // Populate process section
  setImage(
    "detail-process-img",
    project.process?.image,
    `Process image for ${project.title}`,
  );
  setText("detail-process-title", project.process?.title || "Process");
  setText("detail-process-text", project.process?.text);

  // Populate results section
  setText("detail-result-title", project.results?.title || "Resultat");
  setText("detail-result-text", project.results?.text);

  // Populate result images
  const resultImagesContainer = document.getElementById("detail-result-images");
  if (resultImagesContainer && project.results?.images?.length > 0) {
    let imagesHTML = "";
    project.results.images.forEach((imgData, index) => {
      // The first image can optionally have the 'border_outline' class
      const extraClass = index === 0 ? " border_outline" : "";
      const altText = `Result presentation preview ${index + 1}`;

      let srcAttr = "";
      let srcsetAttr = "";
      let sizesAttr = "";

      if (typeof imgData === "string") {
        srcAttr = `src="${imgData}"`;
      } else if (imgData) {
        srcAttr = `src="${imgData.src || ""}"`;
        if (imgData.srcset) srcsetAttr = `srcset="${imgData.srcset}"`;
        if (imgData.sizes) sizesAttr = `sizes="${imgData.sizes}"`;
      }

      imagesHTML += `
        <div class="project_result_media${extraClass}">
            <img class="project_result_img" ${srcAttr} ${srcsetAttr} ${sizesAttr} alt="${altText}" />
        </div>
      `;
    });
    resultImagesContainer.innerHTML = imagesHTML;
  } else if (resultImagesContainer) {
    resultImagesContainer.innerHTML = ""; // Clear if no images
  }
});
