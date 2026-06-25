const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

const closeMobileNav = () => {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const scrollToHash = (hash) => {
  if (!hash || hash === '#') return;
  if (hash === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
    closeMobileNav();
    return;
  }

  const target = document.querySelector(hash);
  if (!target) return;
  const headerOffset = 82;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  history.replaceState(null, '', hash);
  closeMobileNav();
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const hash = link.getAttribute('href');
    if (!hash) return;
    event.preventDefault();
    scrollToHash(hash);
  });
});

document.querySelectorAll('[data-scroll-top]').forEach((button) => {
  button.addEventListener('click', () => scrollToHash('#top'));
});

const sections = [...document.querySelectorAll('main section[id]')];
const setActiveLink = () => {
  const scrollPosition = window.scrollY + 140;
  sections.forEach((section) => {
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
    if (!link) return;
    const active = section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition;
    link.classList.toggle('active', active);
  });
};
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = encodeURIComponent(data.get('name') || '');
    const email = encodeURIComponent(data.get('email') || '');
    const message = encodeURIComponent(data.get('message') || '');
    const subject = encodeURIComponent('Opportunity for .NET Backend Developer');
    const body = `Hi Sumanth,%0D%0A%0D%0A${message}%0D%0A%0D%0ARegards,%0D%0A${name}%0D%0A${email}`;
    window.location.href = `mailto:osumanthgpd@gmail.com?subject=${subject}&body=${body}`;
  });
}
