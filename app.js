// Debounce function with leading option
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Toggle playlist visibility
document.getElementById('toggle-playlist').addEventListener('click', function () {
    const playlistContent = document.getElementById('playlist-content');
    playlistContent.classList.toggle('hidden');
    this.textContent = playlistContent.classList.contains('hidden') ? 'View Playlist' : 'Hide Playlist';
});

// Toggle navigation menu
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
    // Set ARIA attribute for accessibility
    this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Toggle light/dark theme with smooth transition
document.getElementById('theme-toggle').addEventListener('click', function () {
    const body = document.body;
    const navLinks = document.getElementById('nav-links');
    const isLightMode = body.classList.contains('light-mode');

    body.classList.toggle('light-mode', !isLightMode);
    body.classList.toggle('dark-mode', isLightMode);
    navLinks.classList.toggle('light-mode', !isLightMode);
    navLinks.classList.toggle('dark-mode', isLightMode);
    document.querySelectorAll('nav, header, .media-viewer, #playlist-content, .nav-links a')
        .forEach(el => {
            el.classList.toggle('light-mode', !isLightMode);
            el.classList.toggle('dark-mode', isLightMode);
        });

    const theme = isLightMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    // Log the current theme for debugging
    console.log('Current theme set to:', theme);
});

// Apply theme preference on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const isLightMode = savedTheme === 'light';

    body.classList.toggle('light-mode', isLightMode);
    body.classList.toggle('dark-mode', !isLightMode);
    document.querySelectorAll('nav, header, .media-viewer, #playlist-content, .nav-links a')
        .forEach(el => {
            el.classList.toggle('light-mode', isLightMode);
            el.classList.toggle('dark-mode', !isLightMode);
        });

    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('light-mode', isLightMode);
    navLinks.classList.toggle('dark-mode', !isLightMode);

    // Log the theme applied on load for debugging
    console.log('Loaded theme on page load:', savedTheme);
});

// Display media content
function displayMedia(content) {
    const mediaViewer = document.querySelector('.media-viewer');
    mediaViewer.innerHTML = '';
    content.forEach(url => {
        let mediaElement;
        if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(url)) {
            mediaElement = document.createElement('img');
        } else {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
        }
        mediaElement.src = url;
        mediaElement.alt = 'Media content';
        mediaViewer.appendChild(mediaElement);
    });
}

displayMedia(mediaContent);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adjust navigation menu on window resize
window.addEventListener('resize', debounce(function () {
    const navLinks = document.getElementById('nav-links');
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
    }
}, 250));
