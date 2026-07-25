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

/* Soft gold light and occasional glitter around the normal pointer. */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow = document.createElement('div');
  glow.className = 'about-cursor-glow';
  document.body.appendChild(glow);

  let pointerX = 0;
  let pointerY = 0;
  let glowX = 0;
  let glowY = 0;
  let lastSparkle = 0;

  const animateGlow = () => {
    glowX += (pointerX - glowX) * 0.18;
    glowY += (pointerY - glowY) * 0.18;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  };

  const createGlitter = (x, y) => {
    const glitter = document.createElement('span');
    glitter.className = 'about-glitter';
    glitter.style.left = `${x + (Math.random() - 0.5) * 16}px`;
    glitter.style.top = `${y + (Math.random() - 0.5) * 16}px`;
    document.body.appendChild(glitter);
    glitter.addEventListener('animationend', () => glitter.remove(), { once: true });
  };

  document.addEventListener('pointermove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    glow.classList.add('is-active');

    const now = performance.now();
    if (now - lastSparkle > 95) {
      createGlitter(pointerX, pointerY);
      lastSparkle = now;
    }
  });

  document.addEventListener('pointerleave', () => glow.classList.remove('is-active'));
  animateGlow();
}
