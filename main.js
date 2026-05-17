// ---- BLOB CURSOR ----
(function () {
  const blob = document.createElement('div');
  blob.id = 'cursor-blob';
  blob.className = 'hidden';
  blob.innerHTML = '<svg width="16" height="21" viewBox="0 0 16 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
    + '<path transform="rotate(180,8,10.5)" d="M2,2 L2,14 L5.5,10.5 L8.5,19 L11,18 L8,10 L14,10 Z"/>'
    + '</svg>';
  document.body.appendChild(blob);

  document.addEventListener('mousemove', e => {
    blob.style.transform = 'translate(' + (e.clientX - 14) + 'px,' + (e.clientY - 19) + 'px)';
    blob.classList.remove('hidden');
  });
  document.addEventListener('mouseleave', () => blob.classList.add('hidden'));
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
