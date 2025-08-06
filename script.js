const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('main section');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// ✅ Load saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀ Light Mode';
} else {
    themeToggle.textContent = '🌙 Dark Mode';
}

sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

document.addEventListener('click', e => {
    if (window.innerWidth <= 1024 && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

function updateActiveSection() {
    const pos = window.scrollY + 100;
    sections.forEach(sec => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`[data-section="${sec.id}"]`).classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveSection);

sidebarLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById(link.getAttribute('href').substring(1)).scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 1024) sidebar.classList.remove('open');
    });
});

// ✅ Toggle theme with smooth fade transition
themeToggle.addEventListener('click', () => {
    body.classList.add('theme-transition'); // Add transition class
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference
    
    // Remove transition after animation ends
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 500);
});

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.nextElementSibling.textContent);
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });
});

updateActiveSection();
