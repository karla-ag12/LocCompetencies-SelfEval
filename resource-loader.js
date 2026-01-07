// resource-loader.js - Integrated version with language picker functionality
//
// LANGUAGE SWITCHING CONFIGURATION:
// To enable Spanish localization after translation is complete, find the 
// SPANISH_COMING_SOON constant in the changeLanguage() method (around line 30)
// and set it to false:
//     const SPANISH_COMING_SOON = false;
//
// This will disable the "coming soon" message and allow actual language switching.
//
(function() {
    // ResourceLoader class
    class ResourceLoader {
      constructor() {
        this.resources = {
          json: false,
          styles: false,
          scripts: false
        };
        this.callbacks = [];
        this.timeout = null;
        this.currentLanguage = this.getCurrentLanguage();
        this.strings = {}; // Will hold loaded language strings
        
        // Expose key methods globally
        window.changeLanguage = this.changeLanguage.bind(this);
      }
      
      // Get current language from URL
      getCurrentLanguage() {
        return window.location.pathname.toLowerCase().includes('_es-mx') ? 'es-MX' : 'en-US';
      }
      
      // Language change handler
      changeLanguage(language) {
        console.log(`Changing language to: ${language}`);
        
        // CONFIGURATION: Set to true to show "coming soon" message for Spanish
        // Set to false when Spanish localization is complete and ready to use
        const SPANISH_COMING_SOON = true;
        
        // Check if Spanish is selected and show localization activity message
        if (language === 'es-MX' && SPANISH_COMING_SOON) {
          alert('¡Próximamente! Spanish localization will be added as a hands-on activity in the Website Localization class. Students will practice localizing this application as part of their coursework.');
          // Reset the dropdown to current language
          const languageSelect = document.getElementById('language-select');
          if (languageSelect) {
            languageSelect.value = this.currentLanguage;
          }
          return;
        }
        
        // Language file mapping
        const languagePaths = {
          'en-US': 'LocCompetencies_en-US.html',
          'es-MX': 'LocCompetencies_es-MX.html'
        };
        
        if (languagePaths[language]) {
          // Create announcement for screen readers
          const announcement = document.createElement('div');
          announcement.setAttribute('role', 'status');
          announcement.setAttribute('aria-live', 'polite');
          announcement.className = 'sr-only';
          announcement.textContent = language === 'en-US' ? 
            'Changing language to English' : 'Cambiando el idioma a español';
          document.body.appendChild(announcement);
          
          // Redirect to the appropriate page
          window.location.href = languagePaths[language];
        } else {
          console.error(`Unsupported language: ${language}`);
          // Show error if we have an error container
          const errorContainer = document.getElementById('language-error');
          if (errorContainer) {
            errorContainer.textContent = 'This language is not supported.';
            errorContainer.style.display = 'block';
          }
        }
      }
      
      // Initialize language picker UI
      initLanguagePicker() {
        console.log('Initializing language picker');
        const languageSelect = document.getElementById('language-select');
        
        if (!languageSelect) {
          console.error('Language select element not found');
          return;
        }
        
        // Set initial value
        languageSelect.value = this.currentLanguage;
        
        // Add change event listener
        languageSelect.addEventListener('change', (event) => {
          this.changeLanguage(event.target.value);
        });
        
        console.log('Language picker initialized');
      }
      
      // Register a resource as loaded
      registerResource(resourceType) {
        this.resources[resourceType] = true;
        console.log(`Resource loaded: ${resourceType}`);
        this.checkAllResourcesLoaded();
      }
      
      // Check if all resources are loaded
      checkAllResourcesLoaded() {
        const allLoaded = Object.values(this.resources).every(status => status === true);
        
        if (allLoaded) {
          console.log('All resources loaded, executing callbacks');
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          
          this.callbacks.forEach(callback => callback());
        }
      }
      
      // Add a callback to execute when all resources are loaded
      onAllResourcesLoaded(callback) {
        this.callbacks.push(callback);
        
        if (Object.values(this.resources).every(status => status === true)) {
          callback();
        }
        
        this.timeout = setTimeout(() => {
          console.warn('Resource loader timeout - showing content anyway');
          this.callbacks.forEach(callback => callback());
        }, 5000);
      }
      
      // Load language-specific JSON
      loadLanguageStrings() {
        const jsonFile = this.currentLanguage.toLowerCase() + '.json';
        console.log(`Loading language strings from: ${jsonFile}`);
        
        return fetch(jsonFile)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to load ${jsonFile}: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            this.strings = data;
            console.log('Language strings loaded successfully');
            window.locStrings = data; // Also store globally
            this.registerResource('json');
          })
          .catch(error => {
            console.warn(`Error loading language strings: ${error.message}`);
            this.registerResource('json'); // Mark as loaded anyway, we'll use fallbacks
          });
      }
      
      // Load all scripts in sequence
      loadScripts(scripts) {
        return scripts.reduce((promise, script) => {
          return promise.then(() => {
            return new Promise((resolve, reject) => {
              const scriptElement = document.createElement('script');
              scriptElement.src = script;
              scriptElement.async = false;
              
              scriptElement.onload = () => {
                console.log(`Script loaded: ${script}`);
                resolve();
              };
              
              scriptElement.onerror = (error) => {
                console.warn(`Failed to load script: ${script}`, error);
                resolve(); // Resolve anyway to continue loading other scripts
              };
              
              document.head.appendChild(scriptElement);
            });
          });
        }, Promise.resolve());
      }
      
      // Initialize everything
      init() {
        console.log('Resource loader initializing');
        
        // Initialize language picker immediately
        this.initLanguagePicker();
        
        // Add loading indicator
        this.addLoadingIndicator();
        
        // Hide main content until loaded
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.style.visibility = 'hidden';
        }
        
        // Load CSS
        this.loadCSS('styles.css')
          .then(() => {
            this.registerResource('styles');
          })
          .catch(() => {
            this.registerResource('styles'); // Register anyway
          });
        
        // Load language strings
        this.loadLanguageStrings();
        
        // Load scripts
        this.loadScripts(['https://cdn.jsdelivr.net/npm/chart.js', 'evaluation.js'])
          .then(() => {
            this.registerResource('scripts');
          })
          .catch(() => {
            this.registerResource('scripts'); // Register anyway
          });
        
        // Initialize UI once all resources are loaded
        this.onAllResourcesLoaded(() => {
          this.showContent();
        });
      }
      
      // Add loading indicator
      addLoadingIndicator() {
        let loadingIndicator = document.getElementById('loading-indicator');
        if (!loadingIndicator) {
          loadingIndicator = document.createElement('div');
          loadingIndicator.id = 'loading-indicator';
          loadingIndicator.innerHTML = '<div class="spinner"></div><p>Loading content...</p>';
          loadingIndicator.style.position = 'fixed';
          loadingIndicator.style.top = '50%';
          loadingIndicator.style.left = '50%';
          loadingIndicator.style.transform = 'translate(-50%, -50%)';
          loadingIndicator.style.zIndex = '1000';
          loadingIndicator.style.background = 'rgba(255, 255, 255, 0.9)';
          loadingIndicator.style.padding = '20px';
          loadingIndicator.style.borderRadius = '5px';
          loadingIndicator.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
          document.body.appendChild(loadingIndicator);
        }
      }
      
      // Load CSS
      loadCSS(url) {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          
          link.onload = () => {
            console.log(`CSS loaded: ${url}`);
            resolve();
          };
          
          link.onerror = (error) => {
            console.warn(`Failed to load CSS: ${url}`, error);
            reject(error);
          };
          
          document.head.appendChild(link);
        });
      }
      
      // Show content when everything is loaded
      showContent() {
        console.log('Showing content');
        
        // Remove loading indicators
        const indicators = document.querySelectorAll('#loading-indicator');
        indicators.forEach(indicator => {
          if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
          }
        });
        
        // Show body content
        document.body.classList.add('loaded');
        
        // Show main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.style.visibility = 'visible';
          mainContent.classList.add('visible');
          
          // Initialize UI components
          try {
            console.log('Initializing UI components');
            
            if (typeof window.buildEvaluationSection === 'function') {
              window.buildEvaluationSection(this.strings);
            }
            
            if (typeof window.buildResultsSection === 'function') {
              window.buildResultsSection(this.strings);
            }
            
            if (typeof window.setupEventHandlers === 'function') {
              window.setupEventHandlers(this.strings);
            }
          } catch (error) {
            console.error('Error initializing UI components:', error);
          }
        }
      }
    }
    
    // Create and initialize the resource loader when DOM is ready
    function initOnDOMReady() {
      const loader = new ResourceLoader();
      window.resourceLoader = loader; // Make it globally available
      loader.init();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initOnDOMReady);
    } else {
      // DOM already loaded, initialize immediately
      initOnDOMReady();
    }
  })();