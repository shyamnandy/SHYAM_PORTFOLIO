/* =============================================
   PORTFOLIO JAVASCRIPT
   ============================================= */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu when tapping outside
document.addEventListener('touchstart', e => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
}, { passive: true });

// ---- SCROLL REVEAL ANIMATION ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- SKILL CARDS STAGGER ----
const skillCards = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

skillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  skillObserver.observe(card);
});

// ---- ACHIEVEMENT CARDS STAGGER ----
const achCards = document.querySelectorAll('.achievement-card');
const achObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      achObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

achCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  achObserver.observe(card);
});

// ---- CONTACT CARDS STAGGER ----
const contactCards = document.querySelectorAll('.contact-card');
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      contactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

contactCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  contactObserver.observe(card);
});

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--purple-light)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- SMOOTH CURSOR TRAIL (desktop only) ----
const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouchDevice()) {
  const trail = [];
  const TRAIL_COUNT = 8;

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${6 - i * 0.5}px;
      height: ${6 - i * 0.5}px;
      background: rgba(139,92,246,${0.4 - i * 0.04});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: screen;
      will-change: transform;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: -100, y: -100 });
  }

  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((dot, i) => {
      dot.x += (x - dot.x) * (0.5 - i * 0.04);
      dot.y += (y - dot.y) * (0.5 - i * 0.04);
      dot.el.style.left = dot.x - dot.el.offsetWidth / 2 + 'px';
      dot.el.style.top = dot.y - dot.el.offsetHeight / 2 + 'px';
      x = dot.x;
      y = dot.y;
    });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

// ---- STAT COUNTER ANIMATION ----
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    if (target % 1 !== 0) {
      el.textContent = current.toFixed(2) + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const raw = num.textContent.trim();
        if (raw === '9.08') animateCounter(num, 9.08);
        else if (raw === '2+') { animateCounter(num, 2); num.dataset.suffix = '+'; setTimeout(() => { num.textContent = '2+'; }, 2100); }
        else if (raw === 'Top 10') { /* keep as-is */ }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

// ---- TYPING ANIMATION FOR HERO TITLE ----
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const titles = [
    'AI Developer & Full-Stack Engineer',
    'NLP Pipeline Builder',
    'Cloud Solutions Enthusiast',
    'Open Source Contributor'
  ];
  let titleIndex = 0, charIndex = 0, isDeleting = false;

  function typeTitle() {
    const current = titles[titleIndex];
    if (isDeleting) {
      heroTitle.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeTitle, 500);
        return;
      }
      setTimeout(typeTitle, 40);
    } else {
      heroTitle.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(() => { isDeleting = true; typeTitle(); }, 2500);
        return;
      }
      setTimeout(typeTitle, 60);
    }
  }
  setTimeout(typeTitle, 1500);
}

// ---- PAGE LOAD COMPLETE ----
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
