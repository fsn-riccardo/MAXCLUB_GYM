const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let index = 0;

  const showSlide = (newIndex) => {
    slides[index].classList.remove('is-active');
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add('is-active');
  };

  prev?.addEventListener('click', () => showSlide(index - 1));
  next?.addEventListener('click', () => showSlide(index + 1));
});

document.querySelectorAll('[data-filter-group]').forEach((group) => {
  const chips = Array.from(group.querySelectorAll('[data-filter]'));
  const list = document.querySelector('[data-filter-list]');
  const items = Array.from(list?.querySelectorAll('[data-category]') || []);

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((item) => item.classList.remove('is-active'));
      chip.classList.add('is-active');

      items.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.hidden = !match;
      });
    });
  });
});

const planGrid = document.querySelector('[data-plan-grid]');
const checkoutRoot = document.querySelector('[data-checkout]');

if (planGrid && checkoutRoot) {
  const cards = Array.from(planGrid.querySelectorAll('[data-plan]'));
  const summaryPlan = checkoutRoot.querySelector('[data-summary-plan]');
  const summaryPrice = checkoutRoot.querySelector('[data-summary-price]');
  const inlinePlan = checkoutRoot.querySelector('[data-inline-plan]');
  const steps = Array.from(checkoutRoot.querySelectorAll('[data-step]'));
  const indicators = Array.from(checkoutRoot.querySelectorAll('[data-step-indicator]'));
  const result = checkoutRoot.querySelector('[data-checkout-result]');
  const checkoutForm = checkoutRoot.querySelector('[data-checkout-form]');
  let currentStep = 1;

  const setPlan = (card) => {
    cards.forEach((item) => item.classList.remove('is-selected'));
    card.classList.add('is-selected');
    const { plan, price } = card.dataset;
    if (summaryPlan) summaryPlan.textContent = plan;
    if (summaryPrice) summaryPrice.textContent = price;
    if (inlinePlan) inlinePlan.textContent = plan;
  };

  const setStep = (stepNumber) => {
    currentStep = stepNumber;
    steps.forEach((step) => {
      step.classList.toggle('is-current', Number(step.dataset.step) === stepNumber);
    });
    indicators.forEach((indicator) => {
      indicator.classList.toggle('is-current', Number(indicator.dataset.stepIndicator) === stepNumber);
    });
  };

  cards.forEach((card) => {
    card.querySelector('.select-plan')?.addEventListener('click', () => {
      setPlan(card);
      setStep(1);
      checkoutRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  checkoutRoot.querySelectorAll('[data-next-step]').forEach((button) => {
    button.addEventListener('click', () => {
      if (currentStep === 2 && checkoutForm && !checkoutForm.reportValidity()) {
        return;
      }

      const nextStep = Math.min(currentStep + 1, 3);
      setStep(nextStep);
    });
  });

  checkoutRoot.querySelectorAll('[data-prev-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const previousStep = Math.max(currentStep - 1, 1);
      setStep(previousStep);
    });
  });

  checkoutRoot.querySelector('[data-complete-checkout]')?.addEventListener('click', () => {
    if (result) {
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  const defaultCard = planGrid.querySelector('.featured') || cards[0];
  if (defaultCard) setPlan(defaultCard);
}

document.querySelector('[data-load-map]')?.addEventListener('click', (event) => {
  const panel = event.currentTarget.closest('[data-map-panel]');
  const frame = panel?.querySelector('[data-map-frame]');

  if (frame && !frame.querySelector('iframe')) {
    frame.innerHTML = '<iframe title="Mappa Palestra MaxClub" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Via%20Example%2024%20Italia&z=15&output=embed"></iframe>';
  }
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');

  if (button) {
    button.textContent = 'Richiesta inviata';
    button.setAttribute('disabled', 'disabled');
  }
});
