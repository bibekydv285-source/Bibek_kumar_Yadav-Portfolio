const toggle = document.getElementById('navToggle');
const tabs = document.getElementById('navTabs');
toggle.addEventListener('click', () => tabs.classList.toggle('open'));
tabs.querySelectorAll('a').forEach(a => a.addEventListener('click', () => tabs.classList.remove('open')));

