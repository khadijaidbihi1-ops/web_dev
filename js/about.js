'use strict';

/* Reveals About-page content as it enters the viewport. */
const aboutRevealItems = document.querySelectorAll('.about-reveal');

if ('IntersectionObserver' in window && aboutRevealItems.length) {
  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  aboutRevealItems.forEach(item => aboutObserver.observe(item));
} else {
  aboutRevealItems.forEach(item => item.classList.add('is-visible'));
}
