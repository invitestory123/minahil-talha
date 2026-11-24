/* =========================================================
   WAX SEAL 3D INTERACTIVE CONTROLLER
   Dr. Minahil & Muhammad Talha — Barat Ceremony
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Audio setup
  const audio = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicLabel = document.getElementById('musicLabel');

  let isPlaying = false;

  function toggleMusic() {
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      isPlaying = false;
      if (musicToggle) musicToggle.classList.add('paused');
      if (musicLabel) musicLabel.textContent = 'Music';
    } else {
      audio.play().then(() => {
        isPlaying = true;
        if (musicToggle) musicToggle.classList.remove('paused');
        if (musicLabel) musicLabel.textContent = 'Sound';
      }).catch(err => {
        console.log('Audio playback interaction needed:', err);
      });
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // =========================================================
  // ROYAL WAX SEAL ENVELOPE INTRO (wax-seal-royale architecture)
  // =========================================================
  const overlay = document.getElementById('weiOverlay');
  const videoWrap = document.getElementById('weiVideoWrap');
  const video = document.getElementById('weiVideo');
  const tapWrap = document.getElementById('weiTapWrap');
  const skipIntroBtn = document.getElementById('skipIntroBtn');
  const skipVideoBtn = document.getElementById('skipVideoBtn');

  let hasOpened = false;
  let isOpening = false;

  function startAudio() {
    if (!audio) return;
    audio.volume = 1;
    audio.play().then(() => {
      isPlaying = true;
      if (musicToggle) musicToggle.classList.remove('paused');
      if (musicLabel) musicLabel.textContent = 'Sound';
    }).catch(err => {
      console.log('Audio autoplay info:', err);
    });
  }

  function startVideo(e) {
    if (isOpening || hasOpened) return;
    isOpening = true;

    // Immediately fade out the cue/tap label
    if (tapWrap) {
      tapWrap.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      tapWrap.style.opacity = '0';
      tapWrap.style.transform = 'translateX(-50%) scale(0.92)';
    }

    // Show video wrap immediately
    if (videoWrap) {
      videoWrap.classList.add('wei-video-in');
    }

    // Start background audio immediately within the user gesture
    startAudio();

    // Play video
    if (video) {
      const vp = video.play();
      if (vp && vp.catch) vp.catch(() => {});

      let overlayHidden = false;
      const hideOverlay = () => {
        if (overlayHidden) return;
        overlayHidden = true;
        if (overlay) {
          overlay.style.transition = 'opacity 0.35s ease';
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
          setTimeout(() => {
            overlay.style.display = 'none';
          }, 380);
        }
      };

      video.addEventListener('playing', hideOverlay, { once: true });
      // Fallback in case 'playing' is delayed
      setTimeout(hideOverlay, 180);
    } else if (overlay) {
      overlay.style.display = 'none';
    }
  }

  function finishIntro() {
    if (hasOpened) return;
    hasOpened = true;

    // Smoothly fade out video wrap into the revealed hero page
    if (videoWrap) {
      videoWrap.classList.remove('wei-video-in');
      videoWrap.classList.add('wei-video-out');
      setTimeout(() => {
        videoWrap.style.display = 'none';
      }, 950);
    }
    if (overlay) {
      overlay.style.display = 'none';
    }

    // Unlock body scroll and reveal invitation
    document.body.classList.remove('intro-locked');
    document.body.classList.add('intro-opened');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show floating audio button with smooth fade
    if (musicToggle) {
      musicToggle.style.visibility = 'visible';
      musicToggle.style.opacity = '1';
      musicToggle.style.pointerEvents = 'auto';
    }

    // Trigger resize for scratch card canvas
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 150);
  }

  function skipIntro(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    startAudio();
    if (video) {
      video.pause();
    }
    finishIntro();
  }

  if (overlay) {
    overlay.addEventListener('click', startVideo);
    overlay.addEventListener('touchstart', startVideo, { passive: true });
  }

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', skipIntro);
    skipIntroBtn.addEventListener('touchstart', skipIntro, { passive: true });
  }

  if (skipVideoBtn) {
    skipVideoBtn.addEventListener('click', skipIntro);
    skipVideoBtn.addEventListener('touchstart', skipIntro, { passive: true });
  }

  if (video) {
    // Fade video 0.8s before end (exact logic from wax-seal-royale.invitestory.in)
    video.addEventListener('timeupdate', () => {
      if (video.duration && video.currentTime >= video.duration - 0.8 && !video.dataset.fading) {
        video.dataset.fading = '1';
        finishIntro();
      }
    });
    video.addEventListener('ended', finishIntro);
    video.load();
  }

  // Support direct opened link
  if (window.location.search.includes('opened=true')) {
    if (overlay) overlay.style.display = 'none';
    if (videoWrap) videoWrap.style.display = 'none';
    document.body.classList.remove('intro-locked');
    document.body.classList.add('intro-opened');
    if (musicToggle) {
      musicToggle.style.visibility = 'visible';
      musicToggle.style.opacity = '1';
      musicToggle.style.pointerEvents = 'auto';
    }
  }

  // Atmospheric Gold Embers, Fireflies & Twinkling Stars Canvas on Hero
  const canvas = document.getElementById('heroParticlesCanvas');
  const heroSection = document.getElementById('hero');

  if (canvas && heroSection) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = heroSection.offsetWidth || window.innerWidth);
    let height = (canvas.height = heroSection.offsetHeight || window.innerHeight);

    let mouseX = -9999;
    let mouseY = -9999;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = heroSection.offsetWidth || window.innerWidth;
      height = canvas.height = heroSection.offsetHeight || window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width > 600 ? 55 : 36, 60);

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseR: typeRand > 0.85 ? Math.random() * 2.8 + 1.2 : Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.55 + 0.25,
        alpha: 0.5,
        speedY: Math.random() * 0.55 + 0.18,
        speedX: (Math.random() - 0.5) * 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.015,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        isStar: typeRand > 0.75,
        starSize: Math.random() * 3.5 + 2.0
      });
    }

    function drawSparkleStar(cx, cy, spikes, outerRadius, innerRadius, alpha) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 235, 150, ${alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffd700';
      ctx.fill();
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.pulse += p.pulseSpeed;

        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.wobble) * 0.35;

        // Interactive cursor repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) / 80;
          p.x += (dx / dist) * force * 2.5;
          p.y += (dy / dist) * force * 2.5;
        }

        // Pulse alpha
        p.alpha = Math.max(0.1, Math.min(1.0, p.baseAlpha + Math.sin(p.pulse) * 0.35));

        // Recycle particle
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        if (p.isStar && Math.sin(p.pulse) > 0.4) {
          drawSparkleStar(p.x, p.y, 4, p.starSize * (0.8 + Math.sin(p.pulse) * 0.4), p.starSize * 0.25, p.alpha);
        } else {
          ctx.beginPath();
          const r = p.baseR * (0.85 + Math.sin(p.pulse) * 0.2);
          ctx.fillStyle = `rgba(255, 220, 110, ${p.alpha})`;
          ctx.shadowBlur = r * 3.5;
          ctx.shadowColor = '#d4af37';
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2, false);
          ctx.fill();
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Subtle 3D Tilt / Parallax Motion
    const heroBg = heroSection.querySelector('.hero-art-background');
    const heroContent = heroSection.querySelector('.hero-sky-content');

    if (heroBg && heroContent) {
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = normX * 8;
        targetY = normY * 6;
      });

      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientation', (e) => {
          if (e.gamma !== null && e.beta !== null) {
            targetX = Math.max(-8, Math.min(8, (e.gamma / 45) * 6));
            targetY = Math.max(-6, Math.min(6, ((e.beta - 45) / 45) * 5));
          }
        }, { passive: true });
      }

      function updateParallax() {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        heroBg.style.transform = `scale(1.04) translate(${currentX * -0.6}px, ${currentY * -0.6}px)`;
        heroContent.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;
        requestAnimationFrame(updateParallax);
      }
      updateParallax();
    }
  }

  // Copy Address Toast
  const copyBtn = document.getElementById('copyAddressBtn');
  const toast = document.getElementById('toastMsg');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const address = "Marquesina by TOPAZ, Hall No. 18, 19, Garrison Marriage Halls Complex, Lieutenant Saadat Farooq Shaheed Road, Saddar Town, Cantonment Lahore, Pakistan";
      navigator.clipboard.writeText(address).then(() => {
        toast.textContent = "Address copied to clipboard! ✦";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
      }).catch(() => {
        toast.textContent = "Venue: Marquesina by TOPAZ, Lahore";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
      });
    });
  }

  // Enforce Closing Names to "Minahil & Talha" (Never Dr. & Muhammad)
  const enforceClosingNames = () => {
    const el = document.getElementById('closingNames');
    if (el) {
      el.innerHTML = 'Minahil <span>&amp;</span> Talha';
    }
  };
  enforceClosingNames();
  setTimeout(enforceClosingNames, 100);
  setTimeout(enforceClosingNames, 500);
  setTimeout(enforceClosingNames, 1500);

  const closingEl = document.getElementById('closingNames');
  if (closingEl) {
    const observer = new MutationObserver(() => {
      if (closingEl.textContent.includes('Dr.') || closingEl.textContent.includes('Muhammad')) {
        closingEl.innerHTML = 'Minahil <span>&amp;</span> Talha';
      }
    });
    observer.observe(closingEl, { childList: true, characterData: true, subtree: true });
  }

  // Calendar .ics download generator for Barat
  const calBtns = document.querySelectorAll('#saveDateBtn, #addAllCal, [data-cal-icon]');
  calBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//InviteStory//Minahil & Talha Barat//EN",
        "BEGIN:VEVENT",
        "UID:barat-minahil-talha-2027@invitestory.in",
        "DTSTAMP:20261119T000000Z",
        "DTSTART:20270111T133000Z",
        "DTEND:20270111T180000Z",
        "SUMMARY:Barat Ceremony — Dr. Minahil & Muhammad Talha",
        "DESCRIPTION:Barat Ceremony celebration of Dr. Minahil Mahmmood and Muhammad Talha Sajid at Marquesina by TOPAZ, Lahore.",
        "LOCATION:Marquesina by TOPAZ, Garrison Marriage Halls Complex, Lieutenant Saadat Farooq Shaheed Road, Cantonment Lahore, Pakistan",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "Barat-Minahil-Talha.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
});
