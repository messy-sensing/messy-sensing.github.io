// ---- BIRD CURSOR ----
(function () {
  const bird = document.createElement('div');
  bird.id = 'cursor-bird';
  bird.innerHTML = '<svg width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<path d="M9,15 Q17,9 30,13.5 Q34,15 38,15 Q34,16 30,15.5 Q17,20 9,15Z" fill="currentColor"/>'
    + '<path class="bird-wing" d="M12,14 Q21,5 31,9.5 Q23,13 12,14Z" fill="currentColor"/>'
    + '<path d="M9,15 L2,9.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
    + '<path d="M9,15 L2,20"  stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
    + '<path d="M38,15 L44,13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'
    + '<circle cx="33" cy="13" r="1.1" fill="white"/>'
    + '</svg>';
  document.body.appendChild(bird);

  let birdX = -100, facing = 1;
  document.addEventListener('mousemove', e => {
    const dx = e.clientX - birdX;
    birdX = e.clientX;
    if (Math.abs(dx) > 1.5) facing = dx > 0 ? 1 : -1;
    bird.style.transform = 'translate(' + (e.clientX - 22) + 'px,' + (e.clientY - 14) + 'px) scaleX(' + facing + ')';
    bird.classList.remove('hidden');
  });
  document.addEventListener('mouseleave', () => bird.classList.add('hidden'));
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
