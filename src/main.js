import './index.css';

const logos = ['Vortex', 'Nimbus', 'Prysma', 'Cirrus', 'Kynder', 'Halcyn'];
const marqueeTrack = document.querySelector('#marquee-track');

if (marqueeTrack) {
  [...logos, ...logos].forEach((name) => {
    const item = document.createElement('div');
    item.className = 'logo-item';
    item.innerHTML = `<span class="liquid-glass logo-icon" aria-hidden="true">${name[0]}</span><span>${name}</span>`;
    marqueeTrack.appendChild(item);
  });
}

const video = document.querySelector('#hero-video');

if (video instanceof HTMLVideoElement) {
  let frameId = 0;
  let replayTimeout = 0;
  let stopped = false;

  const renderOpacity = () => {
    if (stopped) return;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const current = video.currentTime;
    let opacity = 1;

    if (current < 0.5) {
      opacity = Math.max(0, current / 0.5);
    } else if (duration > 0 && duration - current < 0.5) {
      opacity = Math.max(0, (duration - current) / 0.5);
    }

    video.style.opacity = String(opacity);
    frameId = requestAnimationFrame(renderOpacity);
  };

  const playFromStart = () => {
    video.currentTime = 0;
    video.style.opacity = '0';
    void video.play();
  };

  video.addEventListener('ended', () => {
    video.style.opacity = '0';
    replayTimeout = window.setTimeout(playFromStart, 100);
  });

  video.addEventListener('play', () => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(renderOpacity);
  });

  window.addEventListener('pagehide', () => {
    stopped = true;
    cancelAnimationFrame(frameId);
    clearTimeout(replayTimeout);
  });

  playFromStart();
}
