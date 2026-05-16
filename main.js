// ---- BLOB CURSOR ----
(function () {
  const blob = document.createElement('div');
  blob.id = 'cursor-blob';
  blob.className = 'hidden';
  blob.innerHTML = '<svg width="20" height="17" viewBox="0 0 20 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
    + '<path d="M10,2 C13,1 17,3 18,6.5 C19,10 17,14 13,15 C9.5,16 5,14.5 3,11.5 C1,8.5 2,4 5,2.5 C6.5,1.5 8.5,2.5 10,2Z"/>'
    + '</svg>';
  document.body.appendChild(blob);

  document.addEventListener('mousemove', e => {
    blob.style.transform = 'translate(' + (e.clientX - 10) + 'px,' + (e.clientY - 8) + 'px)';
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
