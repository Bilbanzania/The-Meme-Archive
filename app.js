import { displayMedia } from './index.js';
const express = require('express');
const app = require('./index.js');

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

// Apply event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Toggle playlist visibility
    const togglePlaylistBtn = document.getElementById('toggle-playlist');
    if (togglePlaylistBtn) {
        togglePlaylistBtn.addEventListener('click', function () {
            const playlistContent = document.getElementById('playlist-content');
            playlistContent.classList.toggle('hidden');
            this.textContent = playlistContent.classList.contains('hidden') ? 'View Playlist' : 'Hide Playlist';
        });
    }

    // Toggle navigation menu
    const menuToggleBtn = document.getElementById('menu-toggle');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', function () {
            const navLinks = document.getElementById('nav-links');
            navLinks.classList.toggle('active');
            // Set ARIA attribute for accessibility
            this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Toggle light/dark theme with smooth transition
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const body = document.body;
            const isLightMode = body.classList.contains('light-mode');

            body.classList.toggle('light-mode', !isLightMode);
            body.classList.toggle('dark-mode', isLightMode);
            updateThemeClasses(!isLightMode);

            const theme = isLightMode ? 'dark' : 'light';
            localStorage.setItem('theme', theme);

            // Log the current theme for debugging
            console.log('Current theme set to:', theme);
        });
    }

    // Apply theme preference on page load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLightMode = savedTheme === 'light';

    document.body.classList.toggle('light-mode', isLightMode);
    document.body.classList.toggle('dark-mode', !isLightMode);
    updateThemeClasses(isLightMode);

    // Log the theme applied on load for debugging
    console.log('Loaded theme on page load:', savedTheme);
});

// Function to update theme classes
function updateThemeClasses(isLightMode) {
    document.querySelectorAll('nav, header, .nav-links, .media-viewer, #playlist-content, .nav-links a, .logo a, #image-upload-form, #image-upload-form input[type="file"], #image-upload-form button[type="submit"]')
        .forEach(el => {
            el.classList.toggle('light-mode', isLightMode);
            el.classList.toggle('dark-mode', !isLightMode);
        });
}

// Example usage of displayMedia function with correct paths
const mediaContent = ['1.jpg', '2.png', '3.gif']; // Replace with your actual media filenames
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

displayMedia();