// Get reference to the theme selection dropdown element
// This assumes there's a <select> element with id="theme-select" in the HTML
const themeSelect = document.getElementById('theme-select');

// Retrieve any previously saved theme preference from browser's local storage
// localStorage persists data even after the browser is closed and reopened
const savedTheme = localStorage.getItem('theme');

// Check if a theme was previously saved by the user
if (savedTheme) {
  // Apply the saved theme to the document's root element
  // The 'data-theme' attribute is used by CSS to apply different theme styles
  // CSS can target this with selectors like [data-theme="dark"] or [data-theme="light"]
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update the dropdown to show the currently active theme
  // Check if themeSelect exists to prevent errors if the element isn't found
  if (themeSelect) themeSelect.value = savedTheme;
}

// Set up event listener for theme changes (only if the dropdown exists)
if (themeSelect) {
  // Listen for 'change' events on the dropdown (when user selects a different option)
  themeSelect.addEventListener('change', () => {
    // Get the newly selected theme value from the dropdown
    const selectedTheme = themeSelect.value;
    
    // Apply the new theme immediately to the document
    // This triggers CSS changes based on the new data-theme attribute value
    document.documentElement.setAttribute('data-theme', selectedTheme);
    
    // Save the user's theme choice to localStorage for future visits
    // This ensures the theme preference persists across browser sessions
    localStorage.setItem('theme', selectedTheme);
  });
}