document.addEventListener('DOMContentLoaded', () => {
  const data = window.WEDDING_DATA || {};

  // Audio setup
  const audio = document.getElementById('bgmAudio');
  const musicToggle = document.getElementById('musicToggle');
  const musicLabel = document.getElementById('musicLabel');

  let isPlaying = false;

  function toggleMusic() {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      musicToggle.classList.add('paused');
      musicLabel.textContent = 'Play';
    } else {
      audio.play().then(() => {
        isPlaying = true;
        musicToggle.classList.remove('paused');
        musicLabel.textContent = 'Sound';
      }).catch(err => {
        console.log('Audio autoplay blocked, user interaction required:', err);
      });
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // Envelope Open Interaction
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  const skipEnvelopeBtn = document.getElementById('skipEnvelopeBtn');

  function openEnvelope() {
    if (envelopeOverlay) {
      envelopeOverlay.classList.add('opened');
      // Start background music automatically on user tap
      if (audio && !isPlaying) {
        audio.play().then(() => {
          isPlaying = true;
          if (musicToggle) musicToggle.classList.remove('paused');
          if (musicLabel) musicLabel.textContent = 'Sound';
        }).catch(() => {});
      }
    }
  }

  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener('click', openEnvelope);
  }
  if (skipEnvelopeBtn) {
    skipEnvelopeBtn.addEventListener('click', openEnvelope);
  }
  if (window.location.search.includes('opened=true') && envelopeOverlay) {
    envelopeOverlay.classList.add('opened');
  }

  // Floating Gold Particles
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 600 ? 50 : 28, 60);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.6,
        d: Math.random() * particleCount,
        opacity: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.4 + 0.15
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.shadowBlur = p.r * 3;
        ctx.shadowColor = '#d4af37';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        ctx.fill();

        p.y -= p.speed;
        p.x += Math.sin(p.d) * 0.3;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // Live Countdown Timer
  const targetDate = new Date(data.ceremony?.isoDate || '2027-01-11T18:30:00+05:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minsEl = document.getElementById('countdownMins');
    const secsEl = document.getElementById('countdownSecs');

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Copy Address Toast
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const toast = document.getElementById('toastNotification');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = "Marquesina by TOPAZ, Hall No. 18, 19 Garrison Marriage Halls Complex, Lieutenant Saadat Farooq Shaheed Road, Saddar Town, Cantonment Lahore, Punjab, Pakistan";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(() => {
          showToast("Address copied to clipboard!");
        }).catch(() => {
          showToast("Address copied!");
        });
      } else {
        showToast("Address: Marquesina by TOPAZ, Lahore");
      }
    });
  }

  // Add to Calendar (.ics Generator)
  const calendarBtn = document.getElementById('calendarBtn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//InviteStory//Wedding Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:minahil-talha-barat-20270111@invitestory.in",
        "DTSTAMP:20261116T000000Z",
        "DTSTART:20270111T133000Z", // 6:30 PM PKT (UTC+5) = 1:30 PM UTC
        "DTEND:20270111T173000Z",
        "SUMMARY:Barat Ceremony — Dr. Minahil & Muhammad Talha",
        "DESCRIPTION:Barat Ceremony celebrating Dr. Minahil Mahmmood and Muhammad Talha Sajid.\\nVenue: Marquesina by TOPAZ, Garrison Marriage Halls Complex, Lahore.",
        "LOCATION:Marquesina by TOPAZ, Garrison Marriage Halls Complex, Lahore, Pakistan",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Minahil-Talha-Barat.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Calendar invite downloaded!");
    });
  }
});
