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

const bookingDateInput = document.querySelector('#booking-date');
const bookingTimeSelect = document.querySelector('#booking-time');

if (bookingDateInput && bookingTimeSelect) {
  const timeSlots = [];

  for (let hour = 6; hour <= 21; hour += 1) {
    timeSlots.push(`${String(hour).padStart(2, '0')}:00`);
    timeSlots.push(`${String(hour).padStart(2, '0')}:30`);
  }

  const formatDateForInput = (date) => date.toISOString().split('T')[0];

  const getNextAvailableDate = () => {
    const date = new Date();

    while (date.getDay() === 0) {
      date.setDate(date.getDate() + 1);
    }

    return formatDateForInput(date);
  };

  const renderTimeOptions = (selectedDate) => {
    bookingTimeSelect.innerHTML = '';

    if (!selectedDate) {
      bookingTimeSelect.innerHTML = '<option value="">Seleziona prima una data</option>';
      return;
    }

    const chosenDate = new Date(`${selectedDate}T00:00:00`);

    if (chosenDate.getDay() === 0) {
      bookingTimeSelect.innerHTML = '<option value="">La domenica non e prenotabile</option>';
      bookingDateInput.setCustomValidity('La domenica non e disponibile per la prova gratuita.');
      bookingTimeSelect.setCustomValidity('Scegli un giorno dal lunedi al sabato.');
      return;
    }

    bookingDateInput.setCustomValidity('');
    bookingTimeSelect.setCustomValidity('');

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Seleziona un orario';
    bookingTimeSelect.appendChild(placeholder);

    timeSlots.forEach((slot) => {
      const option = document.createElement('option');
      option.value = slot;
      option.textContent = slot;
      bookingTimeSelect.appendChild(option);
    });
  };

  bookingDateInput.min = getNextAvailableDate();
  bookingDateInput.addEventListener('change', () => renderTimeOptions(bookingDateInput.value));
  renderTimeOptions(bookingDateInput.value);
}
