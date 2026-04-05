/* IRONCORE GYM MANAGEMENT SYSTEM — script.js
   Responsive, functional JS with GSAP Animations & Lenis Scroll 
   Strict adherence to the SCROLL & ANIMATION SYSTEM requirements.
*/

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. LENIS SMOOTH SCROLL INIT
  // ==========================================
  const lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // ==========================================
  // 2. GSAP SCROLLTRIGGER REGISTRATION
  // ==========================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      lenis.scrollTo(href, { offset: -80, duration: 1.4 });
    });
  });

  // ==========================================
  // 12. PAGE TRANSITION (Curtain Effect)
  // ==========================================
  const curtain = document.getElementById('page-curtain');
  if (curtain && typeof gsap !== 'undefined') {
    gsap.from(curtain, {
      scaleY: 1, transformOrigin: 'top center',
      duration: 0.5, ease: 'power4.inOut',
      onComplete: () => curtain.style.pointerEvents = 'none'
    });

    document.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#') && !a.target && href.indexOf('javascript:') === -1) {
          e.preventDefault();
          curtain.style.pointerEvents = 'all';
          gsap.to(curtain, {
            scaleY: 1, transformOrigin: 'bottom center',
            duration: 0.45, ease: 'power4.inOut',
            onComplete: () => window.location.href = href
          });
        }
      });
    });
  }

  // ==========================================
  // 3. PAGE ENTRANCE ANIMATIONS
  // ==========================================
  if (typeof gsap !== 'undefined') {
    const pageTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Home Page
    if (document.querySelector('.hero-h1')) {
      pageTl
        .from('#main-nav', { y: -60, opacity: 0, duration: 0.7 })
        .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-h1 span', {
            y: 80, opacity: 0, duration: 0.75, stagger: 0.12, ease: 'power4.out'
         }, '-=0.2')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.5 }, '-=0.35')
        .from('.hero-cta-row', { y: 20, opacity: 0, duration: 0.45 }, '-=0.25')
        .from('.hero-social-proof', { opacity: 0, duration: 0.5 }, '-=0.1');
    }
    // Auth Pages
    else if (document.querySelector('.auth-layout')) {
      pageTl
        .from('.auth-left', { x: -60, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.auth-right .card', { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '<');
    }
    // Dashboard Pages
    else if (document.querySelector('.dash-layout')) {
      pageTl
        .from('.sidebar', { x: -80, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.header-top', { y: -30, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.stat-card', {
            y: 40, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)'
         }, '-=0.2')
        .from('.card', {
            y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out'
         }, '-=0.2');
         
      // 10. Dashboard Bar Chart Animation
      setTimeout(() => {
        if(document.querySelector('.chart-bar')) {
          gsap.from('.chart-bar', {
            scaleY: 0, transformOrigin: 'bottom center',
            duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)'
          });
        }
      }, 800);
    }
  }

  // ==========================================
  // 4. SCROLL-TRIGGERED ANIMATIONS (index.html)
  // ==========================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && document.querySelector('.hero')) {
    
    // Stats Bar
    if(document.querySelector('.stats-bar')) {
      gsap.from('.stats-bar .stat-item', {
        scrollTrigger: { trigger: '.stats-bar', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        onStart: animateStatCounters // triggers the old number counter func
      });
    }

    // Features Section
    if(document.querySelector('.features-header')) {
      gsap.from('.features-header', {
        scrollTrigger: { trigger: '.features-header', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.7, ease: 'power3.out'
      });
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '.features-grid', start: 'top 78%' },
        y: 60, opacity: 0, duration: 0.6, stagger: { amount: 0.7, from: 'start' },
        ease: 'power3.out'
      });
    }

    // How It Works Section
    if(document.querySelector('.steps-row')) {
      gsap.from('.step-item', {
        scrollTrigger: { trigger: '.steps-row', start: 'top 80%' },
        x: -50, opacity: 0, duration: 0.65, stagger: 0.2, ease: 'power3.out'
      });
    }

    if(document.querySelector('.steps-connector')) {
      gsap.from('.steps-connector', {
        scrollTrigger: { trigger: '.steps-row', start: 'top 75%' },
        scaleX: 0, transformOrigin: 'left center',
        duration: 1.2, ease: 'power2.inOut'
      });
    }

    // Testimonials
    if(document.querySelector('.testimonials-grid')) {
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.65, stagger: 0.15, ease: 'back.out(1.2)'
      });
    }

    // Final CTA
    if(document.querySelector('.cta-banner')) {
      gsap.from('.cta-banner-content', {
        scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' },
        scale: 0.94, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    }

    // Footer
    if(document.querySelector('footer')) {
      gsap.from('.footer-col', {
        scrollTrigger: { trigger: 'footer', start: 'top 90%' },
        y: 30, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out'
      });
    }

    // ==========================================
    // 5. PARALLAX EFFECTS
    // ==========================================
    if (document.querySelector('.hero-bg-glow')) {
      gsap.to('.hero-bg-glow', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
        y: 120, scale: 1.15, opacity: 0.4
      });
    }
    if (document.querySelector('.hero-content')) {
      gsap.to('.hero-content', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        y: -60, ease: 'none'
      });
    }
    
    // ==========================================
    // 6. HORIZONTAL MARQUEE ON MOBILE
    // ==========================================
    const mq = window.matchMedia('(max-width: 640px)');
    let marqueeTween;
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid && mq.matches && typeof gsap !== 'undefined') {
      statsGrid.classList.remove('grid-4');
      statsGrid.classList.add('marquee-track');
      statsGrid.style.display = 'flex';
      statsGrid.style.width = 'max-content';
      statsGrid.style.gap = '2rem';
      
      const items = Array.from(statsGrid.children);
      items.forEach(child => {
        const clone = child.cloneNode(true);
        statsGrid.appendChild(clone);
      });
      
      const tl = gsap.to('.marquee-track', {
        x: '-50%', duration: 14, ease: 'none', repeat: -1
      });
      statsGrid.addEventListener('mouseenter', () => tl.pause());
      statsGrid.addEventListener('mouseleave', () => tl.resume());
    }
  }

  // ==========================================
  // 7. MAGNETIC BUTTON EFFECT
  // ==========================================
  const magneticEls = document.querySelectorAll('.btn-primary');
  magneticEls.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const radius = 80;
      
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      
      if(typeof gsap !== 'undefined') {
        gsap.to(btn, {
          x: dx * 0.35, y: dy * 0.35,
          duration: 0.4, ease: 'power2.out'
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      if(typeof gsap !== 'undefined') {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      }
    });
  });

  // ==========================================
  // 8. NAVBAR SCROLL BEHAVIOUR
  // ==========================================
  const nav = document.getElementById('main-nav');
  if (nav && typeof gsap !== 'undefined') {
    lenis.on('scroll', ({ scroll }) => {
      if (scroll > 80) {
        gsap.to(nav, {
          background: 'rgba(10,10,15,0.97)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
          duration: 0.35, ease: 'power2.out'
        });
      } else {
        gsap.to(nav, {
          background: 'rgba(10,10,15,0.85)',
          boxShadow: 'none',
          duration: 0.35
        });
      }
    });
  }

  // ==========================================
  // 9. CARD HOVER 3D TILT
  // ==========================================
  const tiltCards = document.querySelectorAll('.feature-card, .stat-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * 6;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * -6;
      
      if(typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: -rx, rotateY: ry,
          transformPerspective: 800,
          duration: 0.4, ease: 'power2.out',
          boxShadow: '0 12px 50px rgba(200,241,53,0.15)'
        });
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if(typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.6, ease: 'elastic.out(1, 0.5)',
          boxShadow: 'var(--shadow-card)' 
        });
      }
    });
  });

  // ==========================================
  // 11. SIDEBAR NAV ACTIVE INDICATOR
  // ==========================================
  const navIndicator = document.querySelector('.nav-indicator');
  const navItems = document.querySelectorAll('.nav-item');
  if (navIndicator && navItems.length > 0 && typeof gsap !== 'undefined') {
    const activeItem = document.querySelector('.nav-item.active') || navItems[0];
    gsap.set(navIndicator, { y: activeItem.offsetTop, height: activeItem.offsetHeight });
    
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        gsap.to(navIndicator, {
          y: item.offsetTop,
          height: item.offsetHeight,
          duration: 0.35, ease: 'power3.inOut'
        });
      });
    });
  }

  // ==========================================
  // DASHBOARD CHARTS & ANIMATING STATS
  // ==========================================
  function animateBarChart() {
    const barsContainer = document.querySelector('.chart-bars');
    if (!barsContainer) return;
    
    barsContainer.innerHTML = '';
    const heights = [30, 45, 60, 40, 75, 55, 90]; 
    
    heights.forEach(h => {
      const barWrapper = document.createElement('div');
      barWrapper.style.cssText = 'flex: 1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; height: 160px;';
      
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.cssText = `width: 100%; max-width: 25px; background: var(--accent-primary); border-radius: 4px 4px 0 0; height: ${h}%; box-shadow: 0 0 10px rgba(200,241,53,0.2);`;
      
      barWrapper.appendChild(bar);
      barsContainer.appendChild(barWrapper);
    });
  }
  
  if (document.querySelector('.dash-layout')) {
    animateBarChart();
  }
  
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('btn-primary'); t.classList.add('btn-ghost'); });
      tab.classList.remove('btn-ghost');
      tab.classList.add('btn-primary');
      
      if(typeof gsap !== 'undefined') {
        gsap.to('.chart-bar', {
          scaleY: 0, duration: 0.25, ease: 'power2.in',
          transformOrigin: 'bottom center',
          onComplete: () => {
            animateBarChart(); 
            gsap.from('.chart-bar', {
              scaleY: 0, transformOrigin: 'bottom center',
              duration: 0.5, stagger: 0.05, ease: 'back.out(1.3)'
            });
          }
        });
      }
    });
  });

  function animateStatCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    counters.forEach(counter => {
      const targetStr = counter.getAttribute('data-target');
      const isCurrency = targetStr.startsWith('₹');
      const numericTarget = parseInt(targetStr.replace(/\D/g, ''), 10);
      
      if (typeof gsap !== 'undefined') {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: numericTarget,
          duration: 1.5,
          ease: 'power3.out',
          onUpdate: () => {
            if (isCurrency) {
              const formatted = new Intl.NumberFormat('en-IN').format(Math.floor(obj.val));
              counter.innerText = `₹${formatted}`;
            } else {
              counter.innerText = Math.floor(obj.val);
            }
          }
        });
      }
    });
  }
  
  if(document.querySelector('.dash-layout')) animateStatCounters();


  // ==========================================
  // FORMS & VALIDATION (Original logic)
  // ==========================================
  
  // Registration Role Toggles
  const roleButtons = document.querySelectorAll('button[data-role]');
  if(roleButtons.length > 0) {
    roleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        roleButtons.forEach(b => {
          b.style.borderColor = 'var(--border-subtle)';
          b.style.color = 'var(--text-muted)';
        });
        btn.style.borderColor = 'var(--accent-primary)';
        btn.style.color = 'var(--accent-primary)';
        const hiddenInput = document.getElementById('selected-role');
        if(hiddenInput) hiddenInput.value = btn.getAttribute('data-role');
      });
    });
  }

  // Password Visibility Toggle
  const togglePassBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  if(togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePassBtn.innerHTML = isPassword ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>` : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  // Password Strength Meter
  const passStrengthInput = document.getElementById('password-strength-input');
  const strengthBars = document.querySelectorAll('.strength-bar div');
  if(passStrengthInput && strengthBars.length > 0) {
    passStrengthInput.addEventListener('input', (e) => {
      const val = e.target.value;
      let score = 0;
      if (val.length > 6) score++;
      if (val.match(/[A-Z]/)) score++;
      if (val.match(/[0-9]/)) score++;
      if (val.match(/[^A-Za-z0-9]/)) score++;
      
      strengthBars.forEach((bar, index) => {
        bar.style.background = 'var(--bg-elevated)';
        if (index < score) {
          if (score <= 1) bar.style.background = 'var(--accent-red)';
          else if (score <= 2) bar.style.background = '#f5a623';
          else if (score <= 3) bar.style.background = 'var(--accent-blue)';
          else bar.style.background = '#4caf87';
        }
      });
    });
  }

  // Simulated Login/Register Form Submit & Routing
  const authForm = document.getElementById('auth-form');
  if(authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let targetDashboard = 'member.html';
      const selectedRole = document.getElementById('selected-role');
      if (selectedRole) {
        if (selectedRole.value === 'admin') targetDashboard = 'admin.html';
        if (selectedRole.value === 'trainer') targetDashboard = 'trainer.html';
      }
      
      const btn = authForm.querySelector('.btn-primary');
      btn.innerText = 'Authenticating...';
      
      if(typeof gsap !== 'undefined' && curtain) {
        setTimeout(() => {
          curtain.style.pointerEvents = 'all';
          gsap.to(curtain, {
            scaleY: 1, transformOrigin: 'bottom center',
            duration: 0.45, ease: 'power4.inOut',
            onComplete: () => window.location.href = targetDashboard
          });
        }, 800);
      } else {
        setTimeout(() => { window.location.href = targetDashboard; }, 800);
      }
    });
  }

  // Mobile navigation hamburger toggle
  const mobileToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if(mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      if(sidebar.classList.contains('active')) {
        gsap.to(sidebar, { x: 0, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(sidebar, { x: -300, duration: 0.3, ease: 'power2.in' });
      }
    });
  }
});
