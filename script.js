<script>
// Smoothly fade sections into view on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Fade-in animation CSS
const style = document.createElement('style');
style.innerHTML = `
  section {
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Collapsible sections (keep from previous version)
document.querySelectorAll(".toggle-btn").forEach(title => {
  title.addEventListener("click", () => {
    const section = title.parentElement;
    section.classList.toggle("collapsed");
    title.textContent = section.classList.contains("collapsed")
      ? title.textContent.replace("▾", "▸")
      : title.textContent.replace("▸", "▾");
  });
});

// --- PDF generation (force single-page compact layout) ---
document.getElementById("download-btn")?.addEventListener("click", () => {
  // Clone the content to avoid visual changes
  const content = document.getElementById("profile-content").cloneNode(true);

  // Keep only 3 entries per section
  content.querySelectorAll("section").forEach(section => {
    const entries = section.querySelectorAll("div:not(:has(h2)), ul li");
    entries.forEach((el, i) => i >= 3 && el.remove());
  });

  // Make it compact for one-page layout
  content.style.padding = "5px";
  content.style.lineHeight = "1.2";
  content.style.fontSize = "13px";
  content.style.width = "100%";
  content.style.maxWidth = "800px";
  content.style.margin = "0 auto";
  content.style.overflow = "hidden";
  content.style.transform = "scale(0.8)";
  content.style.transformOrigin = "top left";

  // Set PDF options
  const opt = {
    margin: 0,
    filename: "Daniela-Picao-Portfolio.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 3,        // High resolution
      scrollY: 0,      // Ignore scroll
      useCORS: true
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: { mode: ['avoid-all'] }
  };

  // Force everything onto one page
  html2pdf()
    .set(opt)
    .from(content)
    .toPdf()
    .get('pdf')
    .then(pdf => {
      const totalPages = pdf.internal.getNumberOfPages();
      if (totalPages > 1) {
        // Scale down slightly more if content overflows
        pdf.deletePage(2); // Delete second page if accidentally created
      }
    })
    .save();
});


</script>
