// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

// Toggle playlist visibility
document.getElementById('toggle-playlist').addEventListener('click', function () {
    const playlistContent = document.getElementById('playlist-content');
    if (playlistContent.classList.contains('hidden')) {
        playlistContent.classList.remove('hidden');
        this.textContent = 'Hide Playlist';
    } else {
        playlistContent.classList.add('hidden');
        this.textContent = 'View Playlist';
    }
});

// Toggle navigation menu
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
    // Set ARIA attribute for accessibility
    const expanded = navLinks.classList.contains('active') ? 'true' : 'false';
    this.setAttribute('aria-expanded', expanded);
});

// Toggle light/dark theme
document.getElementById('theme-toggle').addEventListener('click', function () {
    const body = document.body;
    const navLinks = document.getElementById('nav-links');
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        navLinks.classList.remove('light-mode');
        navLinks.classList.add('dark-mode');
        document.querySelectorAll('nav, header, .media-viewer, #playlist-content, .nav-links a')
            .forEach(el => el.classList.add('dark-mode'));
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        navLinks.classList.remove('dark-mode');
        navLinks.classList.add('light-mode');
        document.querySelectorAll('nav, header, .media-viewer, #playlist-content, .nav-links a')
            .forEach(el => el.classList.remove('light-mode'));
    }

    const theme = isLightMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    // Log the current theme for debugging
    console.log('Current theme set to:', theme);
    console.log('Body class list after toggle:', body.classList);
});

// Apply theme preference on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        document.querySelectorAll('nav, header, .media-viewer, #playlist-content, .nav-links a')
            .forEach(el => el.classList.add('light-mode'));
    } else {
        body.classList.add('dark-mode');
        document.querySelectorAll('nav, header, .media-viewer, #playlist-content, .nav-links a')
            .forEach(el => el.classList.add('dark-mode'));
    }

    const navLinks = document.getElementById('nav-links');
    navLinks.classList.add(savedTheme + '-mode');

    // Log the theme applied on load for debugging
    console.log('Loaded theme on page load:', savedTheme);
    console.log('Body class list after load:', body.classList);
});

// Media content
const mediaContent = [
    'path/to/image1.jpg',
    'path/to/image2.png',
    'path/to/animation.gif'
];

// Display media content
function displayMedia(content) {
    const mediaViewer = document.querySelector('.media-viewer');
    mediaViewer.innerHTML = '';
    content.forEach(url => {
        let mediaElement;
        if (url.endsWith('.gif') || url.endsWith('.jpg') || url.endsWith('.png')) {
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
