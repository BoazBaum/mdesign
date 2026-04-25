const video       = document.getElementById('hero-video');
const progressBar = document.getElementById('progress-bar');
const scrollHint  = document.getElementById('scroll-hint');
const container   = document.getElementById('scroll-container');

let duration = 0;
let unlocked = false;

video.addEventListener('loadedmetadata', () => { duration = video.duration; });

function unlock() {
  if (unlocked) return;
  unlocked = true;
  video.play().then(() => { video.pause(); video.currentTime = 0; })
              .catch(() => { unlocked = false; });
}

function loop() {
  const scrollable = container.offsetHeight - window.innerHeight;
  const scrolled   = Math.max(0, -container.getBoundingClientRect().top);
  const progress   = Math.min(scrolled / scrollable, 1);

  if (duration && unlocked) {
    const target = duration * progress;
    if (Math.abs(video.currentTime - target) > 0.013) {
      video.currentTime = target;
    }
  }

  progressBar.style.width = (progress * 100) + '%';
  scrollHint.style.opacity = progress > 0.02 ? '0' : '1';

  requestAnimationFrame(loop);
}

window.addEventListener('scroll', unlock, { once: true, passive: true });

video.load();
requestAnimationFrame(loop);
