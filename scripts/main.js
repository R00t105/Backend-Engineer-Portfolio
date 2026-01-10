/* =========================================
   MAIN JAVASCRIPT
   - Mobile Menu Toggle
   - Smooth Scroll (Optional enhancement)
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".nav");

  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      mobileToggle.classList.toggle("active"); // For animation if needed
    });

    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        mobileToggle.classList.remove("active");
      });
    });
  }

  // --- Smart Floating Dock Logic ---
  const header = document.querySelector(".header");
  const footer = document.querySelector("footer");

  if (header && footer) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If footer is visible (we reached the bottom)
          if (entry.isIntersecting) {
            // 1. Fade Out
            header.classList.add("dock-hidden");

            // 2. Move to Top after fade
            setTimeout(() => {
              header.classList.add("dock-top");
              header.classList.remove("dock-hidden");
            }, 300); // Wait for CSS transition
          } else {
            // If footer is NOT visible (we are scrolling up/away)
            header.classList.add("dock-hidden");

            // 2. Move to Bottom after fade
            setTimeout(() => {
              header.classList.remove("dock-top");
              header.classList.remove("dock-hidden");
            }, 300);
          }
        });
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: "0px",
      }
    );

    footerObserver.observe(footer);
  }

  // --- AJAX Form Handling (No Redirect) ---
  const contactForm = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");

  if (contactForm && successMessage) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Stop redirect

      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;

      // Loading State
      submitBtn.innerHTML = "<span>Transmitting...</span>";
      submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Success Animation
            contactForm.style.display = "none";
            successMessage.style.display = "block";
          } else {
            // Fallback for error
            alert("Transmission failed. Please try again or email directly.");
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
        })
        .catch((error) => {
          alert("Transmission failed. Please check your connection.");
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }
});
