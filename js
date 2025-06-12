document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuLinks = document.querySelectorAll('.side-menu a');

  const closeMenu = () => {
    sideMenu?.classList.remove('active');
    menuOverlay?.classList.remove('active');
  };

  const openMenu = () => {
    sideMenu?.classList.add('active');
    menuOverlay?.classList.add('active');
  };

  menuToggle?.addEventListener('click', () => {
    if (sideMenu?.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay?.addEventListener('click', closeMenu);
  menuLinks?.forEach(link => link.addEventListener('click', closeMenu));

  // Tone.js - Som ao clicar nos cards
  let soundReady = false;
  const synth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 }
  }).toDestination();
  synth.volume.value = -12;

  document.body.addEventListener('click', async () => {
    if (!soundReady) {
      try {
        await Tone.start();
        soundReady = true;
      } catch (e) {
        console.error("Erro ao iniciar o áudio:", e);
      }
    }
  }, { once: true });

  const interactiveCards = document.querySelectorAll('.interactive-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousedown', () => {
      card.classList.add('card-pressed');
      if (soundReady) synth.triggerAttackRelease("C5", "16n");
    });
    card.addEventListener('mouseup', () => card.classList.remove('card-pressed'));
    card.addEventListener('mouseleave', () => card.classList.remove('card-pressed'));
  });

  // Animação ao rolar
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
});

