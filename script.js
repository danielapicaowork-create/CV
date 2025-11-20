/** ---------------------------------------
 *  GOOGLE PHOTOS–STYLE SKELETON LOADER
 *  + LAZY LOADING
 * --------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy-img");

  const lazyObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const img = entry.target;

        // Add skeleton class before loading
        img.classList.add("skeleton");

        // Load the actual image
        const src = img.getAttribute("data-src");
        if (src) img.src = src;

        img.onload = () => {
          img.classList.remove("skeleton");
          img.classList.add("img-loaded");
        };

        observer.unobserve(img);
      });
    },
    { rootMargin: "80px 0px 80px 0px" }
  );

  lazyImages.forEach(img => lazyObserver.observe(img));
});


/** ---------------------------------------
 *  MODAL GALLERY (unchanged)
 * --------------------------------------*/

const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("gallery-modal-img");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let activeGallery = null;
let currentIndex = 0;

// Gather all galleries
const galleries = {};
document.querySelectorAll("[data-gallery]").forEach(gallery => {
  const id = gallery.getAttribute("data-gallery");
  galleries[id] = [...gallery.querySelectorAll(".thumb")];
});

// Open modal
document.querySelectorAll(".thumb").forEach(thumb => {
  thumb.addEventListener("click", () => openModal(thumb));
  thumb.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") openModal(thumb);
  });
});

function openModal(thumb) {
  const galleryName = thumb.closest("[data-gallery]").getAttribute("data-gallery");
  activeGallery = galleries[galleryName];

  currentIndex = parseInt(thumb.getAttribute("data-index"), 10);

  updateModalImage();
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateModalImage() {
  const item = activeGallery[currentIndex];
  const src = item.getAttribute("data-src");
  modalImg.src = src;
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

modalPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + activeGallery.length) % activeGallery.length;
  updateModalImage();
});

modalNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % activeGallery.length;
  updateModalImage();
});

// Close modal when clicking background
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ESC key closes modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});


/** ---------------------------------------
 *  FORCE EXTERNAL LINKS TO OPEN IN NEW TAB
 * --------------------------------------*/
document.querySelectorAll("a[href^='http']").forEach(link => {
  if (!link.href.includes(window.location.hostname)) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
});
