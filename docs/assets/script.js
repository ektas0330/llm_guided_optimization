(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const citation = document.getElementById("bibtex");
  const copyButton = document.getElementById("copy-citation");
  const copyStatus = document.getElementById("copy-status");

  if (citation && copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const citationText = citation.textContent.trim();
      try {
        await navigator.clipboard.writeText(citationText);
        copyStatus.textContent = "Citation copied.";
      } catch (error) {
        const range = document.createRange();
        range.selectNodeContents(citation);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copyStatus.textContent = "Citation selected. Copy it with your browser's copy command.";
      }
    });
  }

  const dialog = document.getElementById("image-dialog");
  const dialogImage = dialog?.querySelector("img");

  document.querySelectorAll("[data-zoom-image]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!dialog || !dialogImage) return;
      dialogImage.src = button.dataset.zoomImage;
      dialogImage.alt = button.dataset.zoomAlt || "Expanded research figure";
      dialog.showModal();
    });
  });

  if (dialog) {
    dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
})();
