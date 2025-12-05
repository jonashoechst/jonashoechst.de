(function() {
    'use strict';

    const THEME_STORAGE_KEY = 'theme-preference';
    const DARK_THEME_CLASS = 'dark-theme';
    const LIGHT_THEME_CLASS = 'light-theme';

    // Get initial theme preference
    function getInitialTheme() {
        // Check localStorage first (user's manual preference)
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
        
        // Check if dark theme class is already applied (from inline script)
        if (document.documentElement.classList.contains(DARK_THEME_CLASS)) {
            return 'dark';
        }
        if (document.documentElement.classList.contains(LIGHT_THEME_CLASS)) {
            return 'light';
        }
        
        // Fall back to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    // Apply theme to document
    function applyTheme(theme) {
        const html = document.documentElement;
        const darkStyles = document.getElementById('dark-theme-styles');
        
        html.classList.remove(DARK_THEME_CLASS, LIGHT_THEME_CLASS);
        html.classList.add(theme === 'dark' ? DARK_THEME_CLASS : LIGHT_THEME_CLASS);
        
        // Toggle dark theme stylesheet
        if (darkStyles) {
            darkStyles.media = theme === 'dark' ? 'all' : 'none';
        }
        
        // Update meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    }

    // Update toggle button appearance
    function updateToggleButton(theme) {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        
        const lightIcon = toggle.querySelector('.theme-icon-light');
        const darkIcon = toggle.querySelector('.theme-icon-dark');
        
        // Show sun icon when dark theme is active (to switch to light)
        // Show moon icon when light theme is active (to switch to dark)
        // CSS handles the display, but we ensure it's set correctly
        if (theme === 'dark') {
            if (lightIcon) lightIcon.style.display = 'inline-block';
            if (darkIcon) darkIcon.style.display = 'none';
        } else {
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'inline-block';
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.classList.contains(DARK_THEME_CLASS) ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        applyTheme(newTheme);
        updateToggleButton(newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        const theme = getInitialTheme();
        applyTheme(theme);
        updateToggleButton(theme);
        
        // Set up toggle button click handler
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }
        
        // Listen for system theme changes (only if no manual preference is set)
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    applyTheme(newTheme);
                    updateToggleButton(newTheme);
                }
            });
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();

