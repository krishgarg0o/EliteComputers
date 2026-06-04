/* Elite Computers static site scripts.
   Hostinger ready: no build step, no external services, no framework runtime.
*/

const SITE_CONFIG = {
  company: "Elite Computers",
  phone: "9945243442",
  email: "sales@elitecomputer.co.in",
  whatsapp: "9945243442",
  established: "2009",

  /* ADDRESS CONFIGURATION
     Required line: "1st Floor, Elite Computers"
     The remaining lines are intentionally easy to edit before or after upload.
     Source reference requested by client: Platinum Peripherals contact address.
  */
  addressLines: [
    "1st Floor, Elite Computers",
    "Shree Tulsi Krupa Plaza",
    "Opp Dasappa Hospital, 1st Cross",
    "SJP Road, Bengaluru",
    "Karnataka 560002, India"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = '<span></span>';
  document.body.prepend(loader);
  requestAnimationFrame(() => document.body.classList.add("page-ready"));
  window.addEventListener("load", () => {
    loader.classList.add("is-hidden");
    setTimeout(() => loader.remove(), 650);
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open");
    });
  }

  document.querySelectorAll(".year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-phone]").forEach((node) => {
    node.textContent = SITE_CONFIG.phone;
    if (node.tagName === "A") node.href = `tel:+91${SITE_CONFIG.phone}`;
  });

  document.querySelectorAll("[data-email]").forEach((node) => {
    node.textContent = SITE_CONFIG.email;
    if (node.tagName === "A") node.href = `mailto:${SITE_CONFIG.email}`;
  });

  document.querySelectorAll("[data-whatsapp]").forEach((node) => {
    node.href = `https://wa.me/91${SITE_CONFIG.whatsapp}`;
  });

  document.querySelectorAll("[data-address]").forEach((node) => {
    node.innerHTML = SITE_CONFIG.addressLines.map((line) => `<span>${line}</span>`).join("");
  });

  const revealItems = document.querySelectorAll(".reveal, .stagger > *");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const target = Number(node.dataset.count || 0);
        const suffix = node.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(node);
      });
    }, { threshold: 0.35 });
    counters.forEach((counter) => countObserver.observe(counter));
  }

  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll("[data-slide]");
    let active = 0;
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
    };
    dots.forEach((dot, index) => dot.addEventListener("click", () => show(index)));
    if (slides.length > 1) setInterval(() => show(active + 1), 5200);
    show(0);
  });

  const testimonials = document.querySelectorAll(".testimonial-slide");
  const testimonialButtons = document.querySelectorAll("[data-testimonial]");
  if (testimonials.length) {
    let current = 0;
    const showTestimonial = (index) => {
      current = (index + testimonials.length) % testimonials.length;
      testimonials.forEach((item, i) => item.classList.toggle("is-active", i === current));
      testimonialButtons.forEach((button, i) => button.classList.toggle("is-active", i === current));
    };
    testimonialButtons.forEach((button, index) => button.addEventListener("click", () => showTestimonial(index)));
    setInterval(() => showTestimonial(current + 1), 6200);
    showTestimonial(0);
  }

  const parallaxItems = document.querySelectorAll("[data-parallax]");
  const moveParallax = () => {
    const y = window.scrollY || 0;
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.08);
      item.style.transform = `translate3d(0, ${Math.round(y * speed)}px, 0)`;
    });
  };
  if (parallaxItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    moveParallax();
    window.addEventListener("scroll", moveParallax, { passive: true });
  }

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector(".form-status");
      if (status) status.textContent = "Thank you. Your inquiry is ready to be connected to a form service.";
      form.reset();
    });
  }

  const formSubmitForm = document.querySelector("[data-formsubmit-form]");
  if (formSubmitForm) {
    const submitButton = formSubmitForm.querySelector('button[type="submit"]');
    const status = formSubmitForm.querySelector(".form-status");
    const emailInput = formSubmitForm.querySelector('input[name="email"]');

    formSubmitForm.addEventListener("submit", (event) => {
      const email = emailInput ? emailInput.value.trim() : "";
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!formSubmitForm.checkValidity() || !emailIsValid) {
        event.preventDefault();
        formSubmitForm.reportValidity();
        if (status) status.textContent = emailIsValid ? "Please complete the required fields." : "Please enter a valid email address.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent || "Submit Inquiry";
        submitButton.textContent = "Sending...";
      }
      if (status) status.textContent = "Sending your enquiry...";
    });
  }
});
