const body = document.body;
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const year = document.querySelector('[data-year]');
const cursor = document.querySelector('.cursor-dot');

if (year) year.textContent = new Date().getFullYear();

const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = !body.classList.contains('menu-open');
  body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && cursor) {
  cursor.classList.add('active');
  window.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll('a, button, [data-project]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}
