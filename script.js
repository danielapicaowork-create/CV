<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daniela Picão | Resume</title>
  <meta name="description" content="Portfolio of Daniela Picão, Sr. Product Designer in London, UK. Passionate about design systems and operations." />
  <meta name="keywords" content="Daniela Picão, Product Design, Design Systems, UX, UI, London" />
  <meta name="author" content="Daniela Picão" />
  <meta property="og:title" content="Daniela Picão | Resume" />
  <meta property="og:description" content="Senior Designer with over a decade of experience creating digital experiences. Focused on design systems, efficiency, and empathy." />
  <meta property="og:image" content="images/profilePhoto.jpg" />
  <meta property="og:url" content="https://bento.me/danielapicao" />

  <link rel="icon" href="images/favicon-32x32.png" type="image/png" />
  <script src="https://cdn.tailwindcss.com"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
          },
          colors: {
            'text-primary': '#1a1a1a',
            'text-secondary': '#4a4a4a',
            'text-tertiary': '#7a7a7a',
            'bg-main': '#ffffff',
          }
        }
      }
    }
  </script>

  <style>
    /* === TYPOGRAPHY & GOLDEN RATIO READABILITY === */
    :root {
      --base-font-size: 16px;
      --golden-line: 1.618;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1rem;
      line-height: var(--golden-line);
      letter-spacing: 0.012em;
      color: #4a4a4a;
      background: var(--bg-main, #ffffff);
    }

    h1, h3 {
      font-weight: 600;
      letter-spacing: -0.015em;
      line-height: 1.3;
    }

    h2 {
      font-size: 1.15rem;
      font-weight: 400;
      letter-spacing: -0.005em;
      line-height: 1.4;
      color: #1a1a1a;
      margin-bottom: 0.9rem;
    }

    p {
      line-height: var(--golden-line);
      letter-spacing: 0.01em;
      margin-bottom: 1rem;
    }

    ul {
      line-height: 1.55;
      letter-spacing: 0.008em;
    }

    section {
      padding-bottom: 1.25rem;
      margin-bottom: 1.75rem;
    }

    .text-text-primary.font-medium + .text-sm.text-text-tertiary {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      line-height: 1.35;
    }

    /* Buttons */
    .rainbow-btn {
      position: relative;
      z-index: 1;
      background: transparent;
      color: #333;
      overflow: hidden;
    }
    .rainbow-btn::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 2px;
      border-radius: 10px;
      background: linear-gradient(90deg,#ff0055,#ffae00,#00ff6a,#00c3ff,#7a00ff,#ff00c8,#ff0055);
      background-size: 400% 400%;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: rainbow 5s linear infinite;
      z-index: -1;
    }
    @keyframes rainbow {
      0% { background-position: 0% 50%; }
      100% { background-position: 400% 50%; }
    }

    /* Download button */
    #download-btn {
      background: #f3f4f6;
      border: none;
      color: #1a1a1a;
      transition: background-color 0.12s ease;
    }
    #download-btn:hover { background: #e8e8ea; }

    /* GALLERY */
    .gallery-strip {
      margin-top: 1.25rem;
      position: relative;
      overflow: hidden;
      padding-bottom: 0.85rem;
    }

    .gallery-track {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      padding: 0 0.25rem 0.5rem;
    }

    .gallery-track::-webkit-scrollbar { height: 8px; }
    .gallery-track::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 6px;
    }

    .thumb {
      flex: 0 0 auto;
      width: min(280px, 45%);
      height: 128px;
      border-radius: 12px;
      overflow: hidden;
      background: #111;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }

    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transform-origin: center;
      transition: transform .25s ease;
    }

    .thumb:hover img,
    .thumb:focus img,
    .thumb:active img {
      transform: scale(1.02);
    }

    /* Modal */
    .gallery-modal {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1200;
      background: rgba(0,0,0,0.65);
      padding: 24px;
    }
    .gallery-modal.open { display: flex; }

    .gallery-modal__frame {
      max-width: 1100px;
      width: 100%;
      max-height: 90vh;
      height: 80%;
      border-radius: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gallery-modal__img {
      max-width: 100%;
      max-height: 88vh;
      object-fit: contain;
      display: block;
    }

    .gallery-modal__close {
      position: absolute;
      top: -10%;
      right: -8%;
      width: 40px;
      height: 40px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: rgba(255,255,255,0.95);
      border: none;
      cursor: pointer;
    }

    .gallery-modal__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.95);
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .gallery-modal__nav.prev { left: 12px; }
    .gallery-modal__nav.next { right: 12px; }

    @media (max-width: 640px) {
      .thumb { height: 120px; width: min(70vw, 200px); }
      .gallery-modal__frame { border-radius: 6px; padding: 8px; }
      .gallery-modal__nav { width: 36px; height: 36px; }
    }
  </style>
</head>

<body class="bg-bg-main text-text-secondary text-base leading-relaxed">
  <!-- The rest of your HTML content remains exactly the same -->
  <!-- (omitted here because it's identical to your input and unchanged) -->

  <script src="script.js"></script>
</body>
</html>
