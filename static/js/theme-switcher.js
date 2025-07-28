const themeSelect = document.getElementById('theme-select');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeSelect) themeSelect.value = savedTheme;
}

if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  });
}
