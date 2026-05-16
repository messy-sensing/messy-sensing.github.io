// ---- COMPASS CURSOR ----
(function () {
  const compass = document.createElement('div');
  compass.id = 'cursor-compass';
  compass.innerHTML = '<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<circle cx="26" cy="26" r="23" stroke="currentColor" stroke-width="0.8" opacity="0.38"/>'
    + '<g id="cc-n2" style="transform-origin:26px 26px">'
    + '<line x1="26" y1="5" x2="26" y2="47" stroke="currentColor" stroke-width="0.6" stroke-dasharray="2,4" opacity="0.18"/>'
    + '</g>'
    + '<g id="cc-n1" style="transform-origin:26px 26px">'
    + '<path d="M26,5 L28.5,25 L26,29 L23.5,25 Z" fill="currentColor" opacity="0.82"/>'
    + '<path d="M26,47 L28.5,27 L26,23 L23.5,27 Z" fill="currentColor" opacity="0.22"/>'
    + '</g>'
    + '<circle cx="26" cy="26" r="1.8" fill="currentColor" opacity="0.55"/>'
    + '</svg>';
  document.body.appendChild(compass);

  const n1 = compass.querySelector('#cc-n1');
  const n2 = compass.querySelector('#cc-n2');
  let ang1 = 0, ang2 = 0, vel = 12;

  function spinCrazy() {
    if (Math.random() < 0.06) vel += (Math.random() - 0.45) * 9;
    vel = Math.max(-28, Math.min(28, vel));
    if (Math.abs(vel) < 4) vel = (vel >= 0 ? 1 : -1) * (4 + Math.random() * 4);
    ang1 += vel;
    ang2 += vel * 0.31 - 0.7;
    n1.style.transform = 'rotate(' + ang1 + 'deg)';
    n2.style.transform = 'rotate(' + ang2 + 'deg)';
    requestAnimationFrame(spinCrazy);
  }
  spinCrazy();

  document.addEventListener('mousemove', e => {
    compass.style.transform = 'translate(' + (e.clientX - 26) + 'px,' + (e.clientY - 26) + 'px)';
    compass.classList.remove('hidden');
  });
  document.addEventListener('mouseleave', () => compass.classList.add('hidden'));
})();

// ---- THEME ----
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');

function applyTheme(t) {
  html.dataset.theme = t;
  localStorage.setItem('ms-theme', t);
}

const saved = localStorage.getItem('ms-theme');
if (saved) applyTheme(saved);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');

themeBtn.addEventListener('click', () =>
  applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark')
);

// ---- NAV SCROLL FADE ----
const nav = document.getElementById('nav');

function navBg() {
  return html.dataset.theme === 'dark' ? [14, 16, 18] : [242, 238, 231];
}

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    const t = Math.min((y - 60) / 100, 1);
    const [r, g, b] = navBg();
    nav.style.background     = `rgba(${r},${g},${b},${t * 0.93})`;
    nav.style.backdropFilter = `blur(${t * 14}px)`;
    nav.style.boxShadow      = `0 1px 0 rgba(128,128,128,${t * 0.1})`;
  } else {
    nav.style.background = nav.style.backdropFilter = nav.style.boxShadow = '';
  }
}, { passive: true });

themeBtn.addEventListener('click', () => window.dispatchEvent(new Event('scroll')));
