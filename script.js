/* Everyday Lusaka - tiny JS because not everything needs to be a framework. */

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav-link-custom"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // Smooth scroll with offset (helps when navbar is expanded on small screens)
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetSel = link.getAttribute("href");
      const target = document.querySelector(targetSel);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu after click
      const navCollapse = document.querySelector("#mainNav");
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }

      const y = target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Active link on scroll
  const setActive = () => {
    const scrollPos = window.scrollY + 120;
    let activeIndex = -1;

    sections.forEach((sec, idx) => {
      if (scrollPos >= sec.offsetTop) activeIndex = idx;
    });

    navLinks.forEach(l => l.classList.remove("active"));
    if (activeIndex >= 0) navLinks[activeIndex].classList.add("active");
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
});

const rail = document.getElementById("artistRail");
const leftBtn = document.querySelector(".artist-scroll-btn.left");
const rightBtn = document.querySelector(".artist-scroll-btn.right");

leftBtn.addEventListener("click", () => {
  rail.scrollBy({ left: -300, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  rail.scrollBy({ left: 300, behavior: "smooth" });
});

/* Optional: make mouse wheel scroll horizontally */
rail.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  rail.scrollLeft += evt.deltaY;
});
