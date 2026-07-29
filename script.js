// Menú móvil (hamburguesa)
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Cierra el menú móvil al hacer clic en un enlace
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
  });
});

// Encoge el header y el logo al hacer scroll
const siteHeader = document.getElementById('siteHeader');
const SCROLL_THRESHOLD = 60;

const handleHeaderScroll = () => {
  if (window.scrollY > SCROLL_THRESHOLD) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll(); // por si la página carga ya con scroll (ej. al recargar)

// Resalta el enlace activo del nav según la sección visible
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const highlightNav = () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.main-nav a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
};

window.addEventListener('scroll', highlightNav);
