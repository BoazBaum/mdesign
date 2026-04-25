const video       = document.getElementById('hero-video');
const progressBar = document.getElementById('progress-bar');
const scrollHint  = document.getElementById('scroll-hint');
const container   = document.getElementById('scroll-container');

let duration = 0;
let unlocked = false;
let smoothProgress = 0;

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
  const rawProgress = Math.min(scrolled / scrollable, 1);

  smoothProgress += (rawProgress - smoothProgress) * 0.22;

  if (duration && unlocked) {
    const target = duration * smoothProgress;
    if (Math.abs(video.currentTime - target) > 0.013) {
      video.currentTime = target;
    }
  }

  progressBar.style.width = (smoothProgress * 100) + '%';
  scrollHint.style.opacity = rawProgress > 0.02 ? '0' : '1';

  requestAnimationFrame(loop);
}

window.addEventListener('scroll', unlock, { once: true, passive: true });

video.load();
requestAnimationFrame(loop);
