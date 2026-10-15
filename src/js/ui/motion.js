export function initializeMotion() {
  const video = document.querySelector('.hero__video');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const visibility = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (reducedMotion.matches || document.hidden || !visible) video.pause();
      else video.play().catch(() => {});
    },
    { threshold: 0.05 },
  );
  visibility.observe(video);
  const sync = () => {
    if (reducedMotion.matches || document.hidden) video.pause();
    else video.play().catch(() => {});
  };
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}
