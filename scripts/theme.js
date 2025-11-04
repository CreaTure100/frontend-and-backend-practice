(function () {
  const root = document.documentElement;
  const btn = document.querySelector('.theme-switch');
  const KEY = 'theme';

  // Инициализация: localStorage → система → светлая
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startDark = saved ? saved === 'dark' : prefersDark;

  apply(startDark);

  if (btn) {
    btn.addEventListener('click', () => apply(!(root.getAttribute('data-theme') === 'dark')));
  }

  function apply(isDark) {
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(KEY, 'dark');
      if (btn) btn.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem(KEY, 'light');
      if (btn) btn.setAttribute('aria-pressed', 'false');
    }
  }
})();