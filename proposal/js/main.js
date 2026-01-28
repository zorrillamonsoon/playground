/**
 * CURTIS BROWN PROPOSAL - INTERACTIVE FUNCTIONALITY
 *
 * Features:
 * 1. Sidebar navigation with active state tracking
 * 2. URL hash updates on scroll (shareable section links)
 * 3. Smooth scrolling on navigation clicks
 * 4. Scroll-triggered animations with Intersection Observer
 * 5. Mobile navigation toggle
 * 6. Lazy loading for images with soft transitions
 *
 * Design Philosophy:
 * - Subtle, editorial interactions
 * - Respects prefers-reduced-motion
 * - Progressive enhancement (works without JS)
 * - No external dependencies
 */

(function() {
    'use strict';

    // ==========================================================================
    // CONFIGURATION
    // ==========================================================================

    const CONFIG = {
        // Animation settings
        animation: {
            staggerDelay: 50,          // ms between staggered elements
            observerThreshold: 0.15,   // Percentage of element visible to trigger
            observerRootMargin: '0px 0px -50px 0px'  // Trigger slightly before element reaches viewport
        },
        // Scroll tracking settings
        scroll: {
            hashUpdateDelay: 100,      // Debounce delay for hash updates
            activeThreshold: 0.3       // Percentage of viewport height for active section
        }
    };

    // ==========================================================================
    // UTILITY FUNCTIONS
    // ==========================================================================

    /**
     * Check if user prefers reduced motion
     * @returns {boolean}
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Debounce function to limit execution rate
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function}
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================================================
    // SIDEBAR NAVIGATION
    // ==========================================================================

    /**
     * SidebarNavigation class handles:
     * - Active state management
     * - Smooth scrolling on click
     * - URL hash updates on scroll
     */
    class SidebarNavigation {
        constructor() {
            this.sidebar = document.querySelector('.sidebar');
            this.navLinks = document.querySelectorAll('.sidebar-nav a');
            this.sections = document.querySelectorAll('section[id]');
            this.mobileToggle = document.querySelector('.mobile-nav-toggle');

            // Track current active section to avoid unnecessary updates
            this.currentActiveId = null;

            // Bind methods
            this.handleNavClick = this.handleNavClick.bind(this);
            this.handleScroll = debounce(this.handleScroll.bind(this), CONFIG.scroll.hashUpdateDelay);
            this.handleMobileToggle = this.handleMobileToggle.bind(this);
            this.handleOutsideClick = this.handleOutsideClick.bind(this);

            this.init();
        }

        init() {
            // Set up click handlers for navigation links
            this.navLinks.forEach(link => {
                link.addEventListener('click', this.handleNavClick);
            });

            // Set up scroll tracking
            window.addEventListener('scroll', this.handleScroll, { passive: true });

            // Mobile navigation toggle
            if (this.mobileToggle) {
                this.mobileToggle.addEventListener('click', this.handleMobileToggle);
            }

            // Close mobile nav on outside click
            document.addEventListener('click', this.handleOutsideClick);

            // Set initial active state based on URL hash or first section
            this.setInitialState();
        }

        /**
         * Set initial active state from URL hash or scroll position
         */
        setInitialState() {
            const hash = window.location.hash.slice(1);
            if (hash && document.getElementById(hash)) {
                this.setActiveLink(hash);
                // Slight delay to ensure proper scroll position after page load
                setTimeout(() => {
                    const target = document.getElementById(hash);
                    if (target) {
                        this.scrollToElement(target);
                    }
                }, 100);
            } else {
                // Set first section as active
                this.handleScroll();
            }
        }

        /**
         * Handle navigation link clicks
         * @param {Event} event
         */
        handleNavClick(event) {
            event.preventDefault();

            const link = event.currentTarget;
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                this.scrollToElement(targetElement);
                this.setActiveLink(targetId);
                this.updateHash(targetId);

                // Close mobile nav after click
                if (this.sidebar.classList.contains('is-open')) {
                    this.closeMobileNav();
                }
            }
        }

        /**
         * Scroll to an element with smooth behavior (unless reduced motion)
         * @param {Element} element
         */
        scrollToElement(element) {
            const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
            element.scrollIntoView({ behavior, block: 'start' });
        }

        /**
         * Handle scroll events to update active section
         */
        handleScroll() {
            const scrollPosition = window.scrollY + (window.innerHeight * CONFIG.scroll.activeThreshold);

            let currentSection = null;

            // Find the current section based on scroll position
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section;
                }
            });

            // Handle edge case: if we're at the bottom of the page
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                currentSection = this.sections[this.sections.length - 1];
            }

            if (currentSection && currentSection.id !== this.currentActiveId) {
                this.setActiveLink(currentSection.id);
                this.updateHash(currentSection.id);
            }
        }

        /**
         * Set the active link in sidebar navigation
         * @param {string} sectionId
         */
        setActiveLink(sectionId) {
            this.currentActiveId = sectionId;

            this.navLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                if (linkSection === sectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        /**
         * Update URL hash without triggering scroll
         * @param {string} sectionId
         */
        updateHash(sectionId) {
            const newHash = `#${sectionId}`;
            if (window.location.hash !== newHash) {
                // Use replaceState to update hash without adding to history
                history.replaceState(null, null, newHash);
            }
        }

        /**
         * Handle mobile navigation toggle
         */
        handleMobileToggle() {
            const isOpen = this.sidebar.classList.contains('is-open');

            if (isOpen) {
                this.closeMobileNav();
            } else {
                this.openMobileNav();
            }
        }

        openMobileNav() {
            this.sidebar.classList.add('is-open');
            this.mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        closeMobileNav() {
            this.sidebar.classList.remove('is-open');
            this.mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        /**
         * Handle clicks outside mobile nav to close it
         * @param {Event} event
         */
        handleOutsideClick(event) {
            if (!this.sidebar.classList.contains('is-open')) return;

            const clickedInSidebar = this.sidebar.contains(event.target);
            const clickedToggle = this.mobileToggle.contains(event.target);

            if (!clickedInSidebar && !clickedToggle) {
                this.closeMobileNav();
            }
        }
    }

    // ==========================================================================
    // SCROLL ANIMATIONS
    // ==========================================================================

    /**
     * ScrollAnimations class handles:
     * - Fade-in animations on scroll
     * - Staggered reveal for grouped elements
     * - Lazy loading for images
     */
    class ScrollAnimations {
        constructor() {
            this.animatedElements = document.querySelectorAll('.animate-on-scroll');

            // Don't initialize if user prefers reduced motion
            if (prefersReducedMotion()) {
                this.showAllElements();
                return;
            }

            this.init();
        }

        init() {
            // Create Intersection Observer for scroll animations
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: CONFIG.animation.observerThreshold,
                    rootMargin: CONFIG.animation.observerRootMargin
                }
            );

            // Observe all animated elements
            this.animatedElements.forEach(element => {
                this.observer.observe(element);
            });
        }

        /**
         * Handle intersection events
         * @param {IntersectionObserverEntry[]} entries
         */
        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.dataset.delay) || 0;

                    // Apply staggered delay if specified
                    setTimeout(() => {
                        element.classList.add('is-visible');
                    }, delay);

                    // Stop observing once animated
                    this.observer.unobserve(element);
                }
            });
        }

        /**
         * Show all elements immediately (for reduced motion)
         */
        showAllElements() {
            this.animatedElements.forEach(element => {
                element.classList.add('is-visible');
            });
        }
    }

    // ==========================================================================
    // LAZY LOADING
    // ==========================================================================

    /**
     * LazyLoader class handles:
     * - Lazy loading of images
     * - Soft fade-in transitions
     * - Asset path resolution
     */
    class LazyLoader {
        constructor() {
            this.lazyImages = document.querySelectorAll('img[data-src], .profile-image-placeholder[data-asset]');

            if ('IntersectionObserver' in window) {
                this.init();
            } else {
                // Fallback: load all images immediately
                this.loadAllImages();
            }
        }

        init() {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: 0.1,
                    rootMargin: '100px 0px'
                }
            );

            this.lazyImages.forEach(image => {
                this.observer.observe(image);
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }

        /**
         * Load an image and handle the transition
         * @param {Element} element
         */
        loadImage(element) {
            // For placeholder divs that will be replaced with actual images
            if (element.classList.contains('profile-image-placeholder')) {
                const assetPath = element.dataset.asset;
                if (assetPath && typeof ASSETS_PATH !== 'undefined') {
                    const fullPath = `${ASSETS_PATH}/${assetPath}`;
                    const img = new Image();

                    img.onload = () => {
                        // Create and insert actual image
                        const imgElement = document.createElement('img');
                        imgElement.src = fullPath;
                        imgElement.alt = element.closest('.profile-block')
                            ? element.closest('.profile-block').querySelector('.profile-name').textContent
                            : '';
                        imgElement.className = 'profile-image';
                        imgElement.style.opacity = '0';
                        imgElement.style.transition = 'opacity 0.3s ease';

                        element.parentNode.replaceChild(imgElement, element);

                        // Trigger reflow and fade in
                        requestAnimationFrame(() => {
                            imgElement.style.opacity = '1';
                        });
                    };

                    img.onerror = () => {
                        // Keep placeholder if image fails to load
                        console.warn(`Failed to load image: ${fullPath}`);
                    };

                    img.src = fullPath;
                }
            } else {
                // Standard img element with data-src
                const src = element.dataset.src;
                if (src) {
                    element.style.opacity = '0';
                    element.style.transition = 'opacity 0.3s ease';

                    element.onload = () => {
                        element.style.opacity = '1';
                    };

                    element.src = src;
                    element.removeAttribute('data-src');
                }
            }
        }

        loadAllImages() {
            this.lazyImages.forEach(image => {
                this.loadImage(image);
            });
        }
    }

    // ==========================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================================================

    /**
     * Add keyboard navigation support
     */
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            // Escape key closes mobile nav
            if (event.key === 'Escape') {
                const sidebar = document.querySelector('.sidebar');
                const mobileToggle = document.querySelector('.mobile-nav-toggle');

                if (sidebar && sidebar.classList.contains('is-open')) {
                    sidebar.classList.remove('is-open');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    mobileToggle.focus();
                }
            }
        });
    }

    /**
     * Handle focus trap for mobile navigation
     */
    function initFocusTrap() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        const focusableElements = sidebar.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        sidebar.addEventListener('keydown', (event) => {
            if (event.key !== 'Tab') return;
            if (!sidebar.classList.contains('is-open')) return;

            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    /**
     * Initialize all components when DOM is ready
     */
    function init() {
        // Initialize navigation
        new SidebarNavigation();

        // Initialize scroll animations
        new ScrollAnimations();

        // Initialize lazy loading
        new LazyLoader();

        // Initialize accessibility features
        initKeyboardNavigation();
        initFocusTrap();

        // Log initialization for debugging (remove in production)
        console.log('Proposal page initialized');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
