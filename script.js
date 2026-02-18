/* Everyday Lusaka - tiny JS because not everything needs to be a framework. */

document.addEventListener("DOMContentLoaded", () => {
  console.log("script loaded ✅");

  /* =========================
     NAV: Smooth scroll + active link
  ========================== */
  const navLinks = Array.from(document.querySelectorAll(".nav-link-custom"));

  // Only treat in-page anchors (#something) as scroll targets
  const inPageLinks = navLinks.filter(a => {
    const href = a.getAttribute("href") || "";
    return href.startsWith("#");
  });

  const sections = inPageLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // Smooth scroll with offset (helps when navbar is expanded on small screens)
  inPageLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetSel = link.getAttribute("href");
      const target = document.querySelector(targetSel);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu after click
      const navCollapse = document.querySelector("#mainNav");
      if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }

      const y = target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Active link on scroll (only for in-page links)
  const setActive = () => {
    if (!sections.length) return;

    const scrollPos = window.scrollY + 140;
    let activeIndex = -1;

    sections.forEach((sec, idx) => {
      if (scrollPos >= sec.offsetTop) activeIndex = idx;
    });

    inPageLinks.forEach(l => l.classList.remove("active"));
    if (activeIndex >= 0) inPageLinks[activeIndex].classList.add("active");
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* =========================
     ARTIST RAIL (safe)
     - Buttons: .artist-scroll-btn.left / .right
     - Rail: #artistRail
  ========================== */
  const rail = document.getElementById("artistRail");
  const leftBtn = document.querySelector(".artist-scroll-btn.left");
  const rightBtn = document.querySelector(".artist-scroll-btn.right");

  if (rail && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      rail.scrollBy({ left: -320, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      rail.scrollBy({ left: 320, behavior: "smooth" });
    });

    // Mouse wheel scrolls horizontally
    rail.addEventListener(
      "wheel",
      (evt) => {
        // If user is already scrolling sideways, don't fight them
        if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) return;

        evt.preventDefault();
        rail.scrollLeft += evt.deltaY;
      },
      { passive: false }
    );
  }

  /* =========================
     EXHIBITION HORIZONTAL SCROLL (safe)
     - Scroller: .exhibit-hscroll
     - Buttons: [data-scroll-btn="prev|next"][data-target="id" OR "#id"]
  ========================== */

  // Wheel -> horizontal
  document.querySelectorAll(".exhibit-hscroll").forEach((scroller) => {
    scroller.addEventListener(
      "wheel",
      (e) => {
        // If user is already scrolling sideways, don't fight them
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        e.preventDefault();
        scroller.scrollLeft += e.deltaY;
      },
      { passive: false }
    );
  });

  // Buttons -> scrollBy
  document.querySelectorAll("[data-scroll-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-target");
      if (!raw) return;

      // Allow both "#id" or "id"
      const target = raw.startsWith("#")
        ? document.querySelector(raw)
        : document.getElementById(raw);

      if (!target) return;

      const dir = btn.getAttribute("data-scroll-btn");
      const amount = Math.min(target.clientWidth * 0.85, 520);

      target.scrollBy({
        left: dir === "next" ? amount : -amount,
        behavior: "smooth",
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     EXHIBITION HORIZONTAL SCROLL
  ========================== */

  const scrollers = document.querySelectorAll(".exhibit-hscroll");

  scrollers.forEach((scroller) => {

    // Mouse wheel -> horizontal scroll
    scroller.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    }, { passive: false });

  });

  // Scroll buttons
  document.querySelectorAll("[data-scroll-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {

      const targetId = btn.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (!target) return;

      const dir = btn.getAttribute("data-scroll-btn");
      const amount = Math.min(target.clientWidth * 0.85, 520);

      target.scrollBy({
        left: dir === "next" ? amount : -amount,
        behavior: "smooth"
      });

    });
  });

});
