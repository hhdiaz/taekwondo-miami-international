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

// ===== FAQ acordeón =====
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // cierra los demás (acordeón de un solo item abierto a la vez)
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== Lightbox de galería =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return; // si todavía es un placeholder sin foto real, no abre nada
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

const closeLightbox = () => lightbox.classList.remove('open');
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ===== Botón "Load More" de la galería =====
const loadMoreBtn = document.getElementById('loadMoreBtn');
const BATCH_SIZE = 4; // cuántas fotos se muestran por cada clic

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.gallery-item--hidden');

    hiddenItems.forEach((item, index) => {
      if (index < BATCH_SIZE) {
        item.classList.remove('gallery-item--hidden');
      }
    });

    // si ya no quedan fotos ocultas, oculta el botón
    if (document.querySelectorAll('.gallery-item--hidden').length === 0) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

// ===== Formulario de contacto =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // NOTA: este formulario todavía no está conectado a un servicio de envío
    // (ej. Formspree, EmailJS, o un backend propio). Hay que conectarlo
    // para que los mensajes lleguen de verdad al correo de la escuela.
    formStatus.textContent = 'Thank you! Your message has been received.';
    contactForm.reset();
  });
}
