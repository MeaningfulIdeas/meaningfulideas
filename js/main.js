// Meaningful Ideas — Enhanced Interactions
document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Navigation =====
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const nav = document.querySelector('.nav');

  if (toggle && links) {
    // Toggle mobile menu
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
      if (links.classList.contains('open')) {
        toggle.innerHTML = '✕';
      } else {
        toggle.innerHTML = '☰';
      }
    });

    // Close mobile nav when a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('open');
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Navbar scroll effect =====
  if (nav) {
    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
  }

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    // Use IntersectionObserver for performance
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all if IntersectionObserver not available
      revealElements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  // ===== Parallax Effect for Quote Section =====
  const parallaxSections = document.querySelectorAll('[data-parallax]');

  if (parallaxSections.length > 0 && window.innerWidth > 900) {
    let ticking = false;

    function updateParallax() {
      parallaxSections.forEach(function(section) {
        const rect = section.getBoundingClientRect();
        const speed = parseFloat(section.getAttribute('data-parallax')) || 0.3;

        // Only apply when section is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
          section.style.backgroundPosition = 'center ' + (50 + offset / 10) + '%';
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  // ===== Floating decorative elements =====
  const hero = document.querySelector('.hero');
  if (hero) {
    // Add decorative floating leaves/sparkles to hero
    const decorations = ['🌿', '🍃', '✨', '🌸'];
    const positions = [
      { top: '15%', left: '5%', size: '1.8rem', delay: '0s' },
      { top: '70%', left: '45%', size: '1.2rem', delay: '1s' },
      { top: '25%', left: '85%', size: '1.5rem', delay: '0.5s' },
      { top: '80%', left: '8%', size: '1rem', delay: '2s' },
      { top: '10%', left: '50%', size: '1.3rem', delay: '1.5s' }
    ];

    // Only add on desktop to reduce clutter on mobile
    if (window.innerWidth > 900) {
      decorations.forEach(function(deco, index) {
        const el = document.createElement('span');
        el.textContent = deco;
        el.style.cssText = `
          position: absolute;
          top: ${positions[index].top};
          left: ${positions[index].left};
          font-size: ${positions[index].size};
          opacity: 0.4;
          z-index: 1;
          animation: float ${4 + index}s ease-in-out infinite;
          animation-delay: ${positions[index].delay};
          pointer-events: none;
          user-select: none;
        `;
        hero.appendChild(el);
      });
    }
  }

  // ===== Smooth anchor scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ===== Form enhancement =====
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
      }
    });
  }
});