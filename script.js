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

// --- PDF generation (auto-fit to one A4 page) ---
document.getElementById("download-btn")?.addEventListener("click", () => {
  const content = document.getElementById("profile-content").cloneNode(true);

  // Keep only 3 entries per section
  content.querySelectorAll("section").forEach(section => {
    const entries = section.querySelectorAll("div:not(:has(h2)), ul li");
    entries.forEach((el, i) => i >= 3 && el.remove());
  });

  // Prepare temporary container for measurement
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.left = "-9999px";
  tempContainer.style.top = "0";
  tempContainer.style.width = "800px";
  tempContainer.style.padding = "20px";
  tempContainer.style.background = "white";
  tempContainer.appendChild(content);
  document.body.appendChild(tempContainer);

  // Calculate scale so content fits in one A4 page (≈1122px tall at 96dpi)
  const a4HeightPx = 1122; // A4 height in px
  const contentHeight = tempContainer.scrollHeight;
  const scale = Math.min(1, a4HeightPx / contentHeight);

  // Apply compact scaling styles
  content.style.transform = `scale(${scale})`;
  content.style.transformOrigin = "top left";
  content.style.width = `${100 / scale}%`;
  content.style.fontSize = "13px";
  content.style.lineHeight = "1.25";
  content.style.margin = "0 auto";

  // Define PDF options
  const opt = {
    margin: 0,
    filename: "Daniela-Picao-Portfolio.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: { mode: ['avoid-all'] }
  };

  // Generate the PDF
  html2pdf()
    .set(opt)
    .from(tempContainer)
    .save()
    .then(() => tempContainer.remove());
});



</script>
