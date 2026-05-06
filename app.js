const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    siteHeader?.classList.toggle('menu-open', isOpen);
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const autoplayDelay = Number(carousel.dataset.autoplay || 0);
  let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
  let autoplayId;

  if (index < 0) index = 0;

  const showSlide = (newIndex) => {
    slides[index]?.classList.remove('is-active');
    index = (newIndex + slides.length) % slides.length;
    slides[index]?.classList.add('is-active');
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = undefined;
    }
  };

  const startAutoplay = () => {
    if (!autoplayDelay || slides.length < 2) return;
    stopAutoplay();
    autoplayId = window.setInterval(() => showSlide(index + 1), autoplayDelay);
  };

  prev?.addEventListener('click', () => {
    showSlide(index - 1);
    startAutoplay();
  });

  next?.addEventListener('click', () => {
    showSlide(index + 1);
    startAutoplay();
  });

  startAutoplay();
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');

  if (button) {
    button.textContent = 'Richiesta inviata';
    button.setAttribute('disabled', 'disabled');
  }
});
