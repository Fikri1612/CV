/* ============================================================
   PORTFOLIO SCRIPT — Ahmad Fikri Fadhilah
   Modern, Interactive, Premium Experience
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. THEME MANAGER
  // ============================================================
  const themeToggle = document.getElementById('theme-toggle-checkbox');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'light') themeToggle.checked = true;

  themeToggle.addEventListener('change', function () {
    const theme = this.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });

  // ============================================================
  // 2. HEADER SCROLL EFFECT + ACTIVE NAV LINK
  // ============================================================
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    // Header background
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Scroll progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = `${progress}%`;

    // Back to Top
    const btn = document.getElementById('back-to-top-btn');
    if (btn) {
      btn.classList.toggle('show', scrollTop > 400);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    });
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
  const typingEl = document.querySelector('.typing-effect');
  if (typingEl) {
    const roles = [
      'Vibe Coder',
      'Web Developer',
      'System Administrator',
      'AI Automation Builder'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const type = () => {
      const current = roles[roleIdx];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      if (!isDeleting && charIdx === current.length) {
        setTimeout(() => (isDeleting = true), 2200);
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }

      setTimeout(type, isDeleting ? 80 : 140);
    };
    type();
  }
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

    
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, .tech-item, .certificate-card, .skill-card, .project-card, .control-btn');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '0.5';
    });
  }

  if (typeof tsParticles !== 'undefined' && document.getElementById('particles-container')) {
    tsParticles.load({
      id: 'particles-container',
      options: {
        fpsLimit: 60,
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 55, density: { enable: true, area: 900 } },
          color: { value: ['#00f2fe', '#8b5cf6', '#00ff87'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.35,
            random: true,
            animation: { enable: true, speed: 0.8, minimumValue: 0.05, sync: false }
          },
          size: { value: { min: 1, max: 2.5 }, random: true },
          links: {
            enable: true,
            distance: 160,
            color: '#00f2fe',
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.0,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
            push: { quantity: 2 },
          }
        },
        detectRetina: true,
      }
    });
  }

  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.querySelector('.tech-item-img').style.transform = `translate(${x}px, ${y}px) translateY(-6px) scale(1.08)`;
    });
    el.addEventListener('mouseleave', () => {
      el.querySelector('.tech-item-img').style.transform = '';
    });
  });

  const terminalBody = document.getElementById('terminal-body');
  if (terminalBody) {
    const commands = {
      help: `<span style="color:#00f2fe;">Available commands:</span>
  <span style="color:#8b5cf6;">whoami</span>     → About me
  <span style="color:#8b5cf6;">skills</span>     → Technical skills
  <span style="color:#8b5cf6;">experience</span> → Work history
  <span style="color:#8b5cf6;">projects</span>   → Featured projects
  <span style="color:#8b5cf6;">contact</span>    → Contact info
  <span style="color:#8b5cf6;">clear</span>      → Clear terminal`,

      whoami: `<span style="color:#00ff87;">Ahmad Fikri Fadhilah</span>
ICT Service Operations | Web Developer | AI Automation
📍 Indonesia | 2+ years professional experience
Passionate about bridging infrastructure, security, and modern web applications.`,

      skills: `<span style="color:#00f2fe;">── Infrastructure ──</span>
  Windows Server, Linux (Ubuntu/CentOS), Active Directory
  Mikrotik, Cisco, pfSense/FortiGate, VPN
  VMware, Proxmox, AWS, Azure

<span style="color:#8b5cf6;">── Web Development ──</span>
  HTML5, CSS3, JavaScript, Laravel 12, Filament, Livewire
  n8n automation, REST APIs, MySQL, SQL Server`,

      experience: `<span style="color:#00ff87;">[ Current ]</span> IT Applications @ PT. Teras Sekawan Bersama (Feb 2026—)
<span style="color:#9ca3af;">[  Past  ]</span>  ICT Service Operations @ PT. East West Seed (Oct 2024—Feb 2026)
<span style="color:#9ca3af;">[  Past  ]</span>  Freelance Web Dev & AI Automation (Mar 2024—)
<span style="color:#9ca3af;">[  Past  ]</span>  IT Staff @ Tarumajaya Hospital (Jan—Sep 2024)
<span style="color:#9ca3af;">[  Past  ]</span>  IT Staff @ PT. Global Sarana Sukses (Jun—Dec 2023)`,

      projects: `<span style="color:#00f2fe;">01.</span> PT Teras Sekawan Bersama — Corporate profile site (Laravel 12 & Filament)
<span style="color:#8b5cf6;">02.</span> TerasOps Portal — Operations & ticketing dashboard
<span style="color:#8b5cf6;">03.</span> n8n Workflow Automation — HR payslip & absence reporting
<span style="color:#8b5cf6;">04.</span> Linux Server Hardening — Ubuntu system hardening & security
<span style="color:#8b5cf6;">05.</span> Company Portal Website — Corporate portal with HTML/CSS/JS

Type 'contact' to get in touch about your next project.`,

      contact: `<span style="color:#10b981;">✉</span>  Email:    <a href="mailto:fikryfadhillah15023@gmail.com" style="color:#00d4ff;">fikryfadhillah15023@gmail.com</a>
<span style="color:#10b981;">📱</span> Phone:    <a href="tel:+6285777284703" style="color:#00d4ff;">+62 8577 7284 703</a>
<span style="color:#10b981;">💼</span> LinkedIn: <a href="https://www.linkedin.com/in/ahmad-fikri-fadhillah-234a79186/" target="_blank" style="color:#00d4ff;">View Profile</a>
<span style="color:#10b981;">🐙</span> GitHub:   <a href="https://github.com/Fikri1612" target="_blank" style="color:#00d4ff;">@Fikri1612</a>`,

      'sudo rm -rf /': '<span style="color:#f43f5e;">⛔ Permission denied. Nice try though! :)</span>',
      'ls': '<span style="color:#a78bfa;">about/  skills/  experience/  projects/  contact/  certificates/</span>',
      'pwd': '/home/fikri/portfolio',
      'date': new Date().toString(),
      'echo hello': '<span style="color:#10b981;">Hello! 👋 Welcome to my portfolio terminal!</span>',
    };

    const printLine = (html, className = '') => {
      const line = document.createElement('div');
      line.className = `terminal-line ${className}`;
      line.innerHTML = html;
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    const createInput = () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'terminal-line terminal-input-line';
      wrapper.innerHTML = `<span class="input-prefix">➜ </span><input type="text" id="terminal-input" autocomplete="off" spellcheck="false">`;
      terminalBody.appendChild(wrapper);

      const input = wrapper.querySelector('#terminal-input');
      let history = [];
      let histIdx = -1;

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim().toLowerCase();
          wrapper.remove();

          printLine(`<span style="color:#28c840;">➜</span> <span style="color:#ccc;">${cmd}</span>`, 'command');

          if (cmd === 'clear') {
            terminalBody.innerHTML = '';
          } else if (cmd) {
            history.unshift(cmd);
            histIdx = -1;
            const out = commands[cmd] || `<span style="color:#f43f5e;">Command not found:</span> <span style="color:#ccc;">${cmd}</span>. Type <span style="color:#a78bfa;">help</span> for available commands.`;
            printLine(out);
          }
          createInput();
        }

        // Command history navigation
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (histIdx < history.length - 1) {
            histIdx++;
            input.value = history[histIdx];
          }
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
          else { histIdx = -1; input.value = ''; }
        }
      });

      // Click anywhere on terminal to focus input
      terminalBody.addEventListener('click', () => input.focus());
    };

    // Boot sequence
    const boot = async () => {
      printLine('<span style="color:#a78bfa;">Initializing portfolio terminal v2.0...</span>');
      await delay(300);
      printLine(`<span style="color:#8899b4;">Last login: ${new Date().toUTCString()}</span>`);
      await delay(300);
      printLine(`<span style="color:#10b981;">✓</span> Welcome to <span style="color:#00d4ff; font-weight:bold;">fikri@portfolio</span>`);
      await delay(200);
      printLine(`Type <span style="color:#a78bfa;">help</span> to see available commands.`);
      createInput();
    };

    boot();
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
  const audio = document.getElementById('background-audio');
  const muteBtn = document.getElementById('mute-btn');

  if (audio && muteBtn) {
    const muteIcon = muteBtn.querySelector('i');
    let initialized = false;

    muteBtn.addEventListener('click', () => {
      if (!initialized) {
        audio.volume = 0.25;
        audio.play().catch(err => console.warn('Audio blocked:', err));
        initialized = true;
        audio.muted = false;
      } else {
        audio.muted = !audio.muted;
      }

      muteIcon.className = audio.muted
        ? 'fas fa-volume-xmark'
        : 'fas fa-volume-high';
    });
  }

  
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value || '';
      const subject = document.getElementById('form-subject')?.value || '';
      const message = document.getElementById('form-message')?.value || '';

      const phone = '6285777284703';
      const text = encodeURIComponent(
        `Halo Fikri! 👋\n\nSaya *${name}*.\n*Subject:* ${subject}\n\n${message}`
      );

      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      showToast('Message sent via WhatsApp! ✓');
      contactForm.reset();
    });
  }

  const showToast = (msg, duration = 3000) => {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), duration);
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const animateCounter = (el, target, suffix = '') => {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.querySelector('span').innerHTML = `<span>${Math.floor(current)}${suffix}</span>`;
    }, 30);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = document.querySelectorAll('.hero-stat-num');
        const targets = [2, 10, 3, 10];
        const suffixes = ['+', '+', '+', '+'];
        stats.forEach((stat, i) => animateCounter(stat, targets[i], suffixes[i]));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed; inset:0; z-index:99998;
        background:rgba(0,0,0,0.88);
        display:flex; align-items:center; justify-content:center;
        padding:2rem; cursor:zoom-out;
        backdrop-filter:blur(8px);
        animation:fadeIn 0.2s ease;
      `;

      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      bigImg.style.cssText = `
        max-width:90vw; max-height:90vh;
        border-radius:12px;
        box-shadow:0 30px 80px rgba(0,0,0,0.8);
        animation:scaleIn 0.2s cubic-bezier(0.34,1.56,0.64,1);
      `;

      // Add CSS animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{transform:scale(0.85)} to{transform:scale(1)} }
      `;
      document.head.appendChild(style);

      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
        document.head.removeChild(style);
      });
    });
  });

}); 