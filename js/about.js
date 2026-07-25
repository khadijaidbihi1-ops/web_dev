(() => {
  const header = document.querySelector('#site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const reveals = document.querySelectorAll('.reveal');
  const quote = document.querySelector('.closing-quote');
  const glow = document.querySelector('.quote-glow');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflow = '';
  }));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('visible'));
  }

  if (quote && glow && window.matchMedia('(pointer:fine)').matches) {
    quote.addEventListener('mousemove', event => {
      const rect = quote.getBoundingClientRect();
      glow.style.left = `${event.clientX - rect.left}px`;
      glow.style.top = `${event.clientY - rect.top}px`;
    });
    quote.addEventListener('mouseleave', () => {
      glow.style.left = '50%';
      glow.style.top = '50%';
    });
  }
})();
