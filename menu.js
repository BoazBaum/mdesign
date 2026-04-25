const nav        = document.getElementById('hero-nav');
const hamburger  = document.getElementById('hamburger');
const menuClose  = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

// Sticky nav: transparent during video scrollytelling, solid only after it ends
const scrollContainer = document.getElementById('scroll-container');

window.addEventListener('scroll', () => {
  const heroEnd = scrollContainer.offsetTop + scrollContainer.offsetHeight - window.innerHeight;
  nav.classList.toggle('scrolled', window.scrollY >= heroEnd);
}, { passive: true });

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Close when clicking a menu link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});
