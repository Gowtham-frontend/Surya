/* ==========================================
   T S SURIYA — LEGAL PORTFOLIO
   JavaScript File
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .skill-item, .edu-card, .achievement-card, .timeline-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });
  }

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ==========================================
  // HAMBURGER MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // INTERSECTION OBSERVER — SCROLL ANIMATIONS
  // ==========================================
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grouped items
        const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 120;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  // ==========================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ==========================================
  // PARALLAX ON HERO SCALES ICON
  // ==========================================
  const scalesIcon = document.querySelector('.scales-icon');
  if (scalesIcon) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      scalesIcon.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px)) rotate(${scrolled * 0.02}deg)`;
    });
  }

  // ==========================================
  // TYPING EFFECT — HERO LABEL (optional subtle pulse)
  // ==========================================
  const heroLabel = document.querySelector('.hero-label');
  if (heroLabel) {
    setTimeout(() => {
      heroLabel.style.opacity = '1';
    }, 300);
  }

  // ==========================================
  // GRADE COUNTER ANIMATION
  // ==========================================
  function animateCounter(el, target, suffix = '%', duration = 1200) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased * 10) / 10;
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const gradeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const gradeEls = entry.target.querySelectorAll('.grade-value');
        gradeEls.forEach(el => {
          const text = el.textContent.trim();
          const val = parseFloat(text);
          if (!isNaN(val)) {
            el.textContent = '0%';
            animateCounter(el, val, '%');
          }
        });
        gradeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const eduSection = document.querySelector('.education');
  if (eduSection) gradeObserver.observe(eduSection);

  // ==========================================
  // MAGNETIC BUTTONS
  // ==========================================
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ==========================================
  // FOOTER VISIBILITY
  // ==========================================
  const footer = document.querySelector('.footer');
  if (footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.style.opacity = '1';
          footer.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    footerObserver.observe(footer);
  }

  // ==========================================
  // SECTION NUMBER REVEAL
  // ==========================================
  const sectionNumbers = document.querySelectorAll('.section-number');
  const numObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        numObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sectionNumbers.forEach(num => {
    num.style.opacity = '0';
    num.style.transform = 'translateX(-15px)';
    num.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    numObserver.observe(num);
  });

  // ==========================================
  // CONSOLE EASTER EGG
  // ==========================================
  console.log('%cT S SURIYA', 'font-size: 32px; font-weight: bold; color: #c9a84c;');
  console.log('%cLL.M · Legal Professional · Tamil Nadu', 'font-size: 14px; color: #7a6a50;');
  console.log('%cPortfolio crafted with care.', 'font-size: 11px; color: #999;');

});
