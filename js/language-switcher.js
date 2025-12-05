document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLangDisplay = document.getElementById('current-lang-display');

    // Default language
    let currentLang = localStorage.getItem('selectedLanguage') || 'en';

    // Function to update content
    function updateContent(lang) {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if it's an input placeholder
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update the display text
        const langNames = {
            'en': 'English',
            'hi': 'Hindi',
            'ta': 'Tamil',
            'te': 'Telugu',
            'ml': 'Malayalam'
        };
        if (currentLangDisplay) {
            currentLangDisplay.textContent = langNames[lang];
        }

        // Save preference
        localStorage.setItem('selectedLanguage', lang);
        currentLang = lang;

        // Update document lang attribute
        document.documentElement.lang = lang;
    }

    // Initial update
    updateContent(currentLang);

    // Toggle Dropdown
    if (languageSelector && languageDropdown) {
        languageSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.add('hidden');
        });
    }

    // Handle Language Selection
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            updateContent(selectedLang);
        });
    });
});
