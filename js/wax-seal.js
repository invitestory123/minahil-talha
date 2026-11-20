/* =========================================================
   WAX SEAL INTRO & COMPANION CONTROLLER
   Dr. Minahil & Muhammad Talha — Barat Ceremony
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.INVITATION_CONFIG || {};

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

  // Envelope Opening Interaction
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const openSealBtn = document.getElementById('openSealBtn');
  const skipIntroBtn = document.getElementById('skipIntroBtn');

  function openEnvelope() {
    if (!envelopeOverlay) return;
    envelopeOverlay.classList.add('opened');
    
    // Unlock body scroll
    document.body.classList.remove('intro-locked');
    
    // Trigger background audio automatically on gesture
    if (audio && audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        if (musicToggle) musicToggle.classList.remove('paused');
        if (musicLabel) musicLabel.textContent = 'Sound';
      }).catch(() => {});
    }

    // Scroll to hero or top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (openSealBtn) {
    openSealBtn.addEventListener('click', openEnvelope);
  }
  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }
  if (envelopeOverlay) {
    envelopeOverlay.addEventListener('click', (e) => {
      if (e.target === skipIntroBtn || skipIntroBtn.contains(e.target)) return;
      openEnvelope();
    });
  }

  // Support direct opened link
  if (window.location.search.includes('opened=true') && envelopeOverlay) {
    envelopeOverlay.classList.add('opened');
    document.body.classList.remove('intro-locked');
  }

  // Floating Gold Particles Canvas on Hero
  const canvas = document.getElementById('heroParticlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width > 600 ? 42 : 24, 50);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.2
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.shadowBlur = p.r * 3;
        ctx.shadowColor = '#d4af37';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        ctx.fill();
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
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

  // Calendar .ics download generator for Barat
  const calBtns = document.querySelectorAll('#saveDateBtn, #addAllCal, [data-cal-icon]');
  calBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If native handler exists in ruby app.js, let it run; otherwise provide fall-back
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
