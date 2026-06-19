// ---- BLOB CURSOR ----
if (window.matchMedia('(pointer: fine)').matches) (function () {
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

// ---- VIMEO FACADES (click-to-play) ----
document.addEventListener('click', e => {
  const f = e.target.closest('.vimeo-f');
  if (!f || !f.dataset.src) return;
  const iframe = document.createElement('iframe');
  iframe.src = f.dataset.src;
  iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
  iframe.allowFullscreen = true;
  iframe.title = f.dataset.title || 'Video';
  f.classList.remove('vimeo-f');
  f.replaceChildren(iframe);
});

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

// ---- MOBILE NAV ----
(function () {
  const navLinks = document.querySelector('.nav-links');
  const navRight = document.querySelector('.nav-right');
  if (!navLinks || !navRight) return;

  const ICON_MENU  = '<svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><line x1="0" y1="1" x2="20" y2="1"/><line x1="0" y1="7" x2="20" y2="7"/><line x1="0" y1="13" x2="20" y2="13"/></svg>';
  const ICON_CLOSE = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>';

  const btn = document.createElement('button');
  btn.id = 'menu-btn';
  btn.setAttribute('aria-label', 'open navigation');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = ICON_MENU;
  navRight.appendChild(btn);

  const drawer = document.createElement('div');
  drawer.id = 'nav-drawer';
  const ul = navLinks.cloneNode(true);
  drawer.appendChild(ul);
  document.body.appendChild(drawer);

  function open() {
    drawer.classList.add('open');
    document.body.classList.add('nav-open');
    btn.innerHTML = ICON_CLOSE;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'close navigation');
  }
  function close() {
    drawer.classList.remove('open');
    document.body.classList.remove('nav-open');
    btn.innerHTML = ICON_MENU;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'open navigation');
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    drawer.classList.contains('open') ? close() : open();
  });
  document.addEventListener('click', e => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  window.addEventListener('resize', () => { if (window.innerWidth > 700) close(); });
})();
