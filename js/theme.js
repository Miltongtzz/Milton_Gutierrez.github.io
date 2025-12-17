// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

// Initialize theme from localStorage
function initializeTheme() {
    // Theme (dark/light)
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeIconMobile.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Color scheme
    const savedColorScheme = localStorage.getItem('color-scheme') || 'blue';
    applyColorScheme(savedColorScheme);
    
    // Update active color options
    updateColorOptions();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeIconMobile.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeIconMobile.classList.replace('fa-sun', 'fa-moon');
    }
    
    updateColorOptions();
}

// Color Scheme System
function applyColorScheme(scheme) {
    // Remove all color scheme classes
    document.body.classList.remove(
        'color-scheme-blue',
        'color-scheme-green', 
        'color-scheme-red',
        'color-scheme-purple',
        'color-scheme-orange'
    );
    
    // Add the selected scheme
    document.body.classList.add(`color-scheme-${scheme}`);
    
    // Update active state in UI
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-scheme') === scheme) {
            option.classList.add('active');
        }
    });
    
    // Save to localStorage
    localStorage.setItem('color-scheme', scheme);
}

// Update color options based on current theme
function updateColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    colorOptions.forEach(option => {
        if (option.classList.contains('active')) {
            option.style.borderColor = isDarkMode ? '#f3f4f6' : '#1f2937';
        }
    });
}

// Color Scheme Changer
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        const scheme = this.getAttribute('data-scheme');
        applyColorScheme(scheme);
    });
});

// Initialize everything
initializeTheme();

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);
