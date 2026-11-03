
/* =====================================================
   RICE BOWL WEBSITE
   Shared JavaScript
   Independent concept by Brightify Digital
   ===================================================== */


/* -----------------------------------------------------
   1. MOBILE NAVIGATION
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("nav-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }
});


/* -----------------------------------------------------
   2. MENU SEARCH
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".menu-search");

  if (!searchInput) return;

  const menuItems = document.querySelectorAll(
    ".menu-item"
  );

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value
      .toLowerCase()
      .trim();

    menuItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();

      item.style.display = itemText.includes(searchTerm)
        ? ""
        : "none";
    });
  });
});


/* -----------------------------------------------------
   3. MENU CUISINE TABS
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(
    "[data-menu-tab]"
  );

  const menuPanels = document.querySelectorAll(
    "[data-menu-panel]"
  );

  if (!tabButtons.length || !menuPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedMenu = button.dataset.menuTab;

      tabButtons.forEach((tab) => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      });

      menuPanels.forEach((panel) => {
        panel.hidden =
          panel.dataset.menuPanel !== selectedMenu;
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
    });
  });
});


/* -----------------------------------------------------
   4. MENU CATEGORY FILTERS
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(
    "[data-category-filter]"
  );

  const menuItems = document.querySelectorAll(
    ".menu-item[data-category]"
  );

  if (!filterButtons.length || !menuItems.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory =
        button.dataset.categoryFilter;

      filterButtons.forEach((filter) => {
        filter.classList.remove("active");
      });

      button.classList.add("active");

      menuItems.forEach((item) => {
        const matchesCategory =
          selectedCategory === "all" ||
          item.dataset.category === selectedCategory;

        item.style.display = matchesCategory
          ? ""
          : "none";
      });
    });
  });
});


/* -----------------------------------------------------
   5. CURRENT YEAR IN FOOTER
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});


/* -----------------------------------------------------
   6. BACK TO TOP
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.querySelector(
    ".back-to-top"
  );

  if (!backToTop) return;

  backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


/* -----------------------------------------------------
   7. IMAGE LIGHTBOX
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(
    "[data-lightbox]"
  );

  if (!galleryImages.length) return;

  galleryImages.forEach((image) => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
      const overlay = document.createElement("div");

      overlay.className = "lightbox-overlay";

      overlay.innerHTML = `
        <button
          class="lightbox-close"
          type="button"
          aria-label="Close image"
        >
          &times;
        </button>

        <img
          src="${image.src}"
          alt="${image.alt}"
          class="lightbox-image"
        />
      `;

      document.body.appendChild(overlay);

      overlay.addEventListener("click", (event) => {
        if (
          event.target === overlay ||
          event.target.classList.contains("lightbox-close")
        ) {
          overlay.remove();
        }
      });

      document.addEventListener(
        "keydown",
        function closeOnEscape(event) {
          if (event.key === "Escape") {
            overlay.remove();

            document.removeEventListener(
              "keydown",
              closeOnEscape
            );
          }
        }
      );
    });
  });
});


/* -----------------------------------------------------
   8. SMOOTH INTERNAL NAVIGATION
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
