// Security Website JavaScript - Professional Mobile Menu

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing website...');
    
    // Auto-update copyright year
    updateCopyrightYear();
    
    // Initialize Mobile Menu
    initializeMobileMenu();
    
    // Header Scroll Effect
    initializeHeaderScroll();
    
    // Mobile Services Pagination
    initializeMobileServicesPagination();
    
    // Initialize Gallery Lightbox
    initializeGalleryLightbox();
});

// Auto-update copyright year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    console.log('📱 Setting up mobile menu...');
    
    // Get mobile menu elements
    const mobileToggle = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;
    
    // Debug: Log what we found
    console.log('Mobile menu elements:', {
        toggle: !!mobileToggle,
        nav: !!mobileNav,
        close: !!mobileNavClose,
        links: mobileNavLinks.length
    });
    
    // If elements don't exist, exit early
    if (!mobileToggle || !mobileNav) {
        console.error('❌ Required mobile menu elements not found!');
        return;
    }
    
    // State tracking
    let isMenuOpen = false;
    
    // Open menu
    function openMenu() {
        console.log('� Opening mobile menu');
        isMenuOpen = true;
        
        // Add classes
        mobileNav.classList.add('active');
        mobileToggle.classList.add('active');
        body.classList.add('menu-open');
        
        // Prevent body scroll
        const scrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';
    }
    
    // Close menu
    function closeMenu() {
        console.log('🔒 Closing mobile menu');
        isMenuOpen = false;
        
        // Remove classes
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Restore body scroll
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
    
    // Toggle menu
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Event: Toggle button click
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Mobile toggle clicked');
        toggleMenu();
    });
    
    // Event: Close button click
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('❌ Close button clicked');
            closeMenu();
        });
    }
    
    // Event: Navigation link clicks
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('🔗 Nav link clicked:', this.textContent.trim());
            setTimeout(closeMenu, 150); // Small delay for better UX
        });
    });
    
    // Event: Click outside to close
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            console.log('🌫️ Clicked outside menu, closing');
            closeMenu();
        }
    });
    
    // Event: Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('⌨️ Escape key pressed, closing menu');
            closeMenu();
        }
    });
    
    // Event: Window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            console.log('📱➡️💻 Switching to desktop, closing menu');
            closeMenu();
        }
    });
    
    console.log('✅ Mobile menu initialized successfully');
}

// Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Simple Mobile Services Pagination that WORKS
function initializeMobileServicesPagination() {
    console.log('� Starting mobile services pagination...');
    
    // Get all required elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('paginationDots');
    const allPages = document.querySelectorAll('.services-page');
    
    // Check if elements exist
    if (!prevBtn || !nextBtn || !dotsContainer || allPages.length === 0) {
        console.error('❌ Required elements not found!');
        return;
    }
    
    console.log(`✅ Found ${allPages.length} service pages`);
    
    let currentPage = 0;
    const totalPages = allPages.length;
    
    // Function to show specific page
    function showPage(pageIndex) {
        console.log(`📄 Showing page ${pageIndex + 1} of ${totalPages}`);
        
        // Hide all pages first
        allPages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.display = 'flex';
                page.classList.add('active');
                console.log(`✅ Page ${index + 1} is now visible`);
            } else {
                page.style.display = 'none';
                page.classList.remove('active');
            }
        });
        
        // Update dots
        const allDots = dotsContainer.querySelectorAll('.dot');
        allDots.forEach((dot, index) => {
            if (index === pageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update button states
        prevBtn.style.opacity = pageIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = pageIndex === totalPages - 1 ? '0.5' : '1';
        
        prevBtn.disabled = pageIndex === 0;
        nextBtn.disabled = pageIndex === totalPages - 1;
        
        currentPage = pageIndex;
    }
    
    // Previous button click
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬅️ Previous button clicked');
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    });
    
    // Next button click
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('➡️ Next button clicked');
        if (currentPage < totalPages - 1) {
            showPage(currentPage + 1);
        }
    });
    
    // Dot clicks
    const allDots = dotsContainer.querySelectorAll('.dot');
    allDots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`🎯 Dot ${index + 1} clicked`);
            showPage(index);
        });
    });
    
    // Initialize - show first page
    showPage(0);
    
    console.log('✅ Mobile services pagination initialized successfully!');
}
    
    // Initialize
    updatePagination();
    console.log('✅ Mobile services pagination initialized');

    // Active Navigation Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Enhanced Gallery Lightbox Initialization
    function initializeGalleryLightbox() {
        console.log('🖼️ Setting up gallery lightbox...');
        
        // Target the expand buttons specifically
        const galleryButtons = document.querySelectorAll('.gallery-btn');
        
        console.log(`Found ${galleryButtons.length} gallery expand buttons`);
        
        galleryButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the image in the same gallery item
                const galleryItem = this.closest('.gallery-item');
                const img = galleryItem.querySelector('.gallery-img');
                
                if (img) {
                    console.log(`Opening lightbox for image: ${img.alt}`);
                    openLightbox(img.src, img.alt);
                } else {
                    console.error('No image found in gallery item');
                }
            });
        });
        
        // Also allow clicking on images directly
        const galleryImages = document.querySelectorAll('.gallery-img');
        galleryImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Direct image click: ${this.alt}`);
                openLightbox(this.src, this.alt);
            });
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .service-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Counter Animation for Statistics
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });

    // Gallery Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItemsFilter = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItemsFilter.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItemsFilter.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                        item.classList.add('visible');
                        item.style.display = 'block';
                    } else {
                        item.classList.remove('visible');
                        item.classList.add('hidden');
                        setTimeout(() => {
                            if (item.classList.contains('hidden')) {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
        
        // Initialize gallery
        galleryItemsFilter.forEach(item => {
            item.classList.add('visible');
        });
    }

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
;

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function openLightbox(src, alt) {
    console.log('🔍 Opening lightbox for:', alt);
    
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <div class="lightbox-header">
                <h3 class="lightbox-title">${alt}</h3>
                <button class="lightbox-close" aria-label="Close lightbox">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="lightbox-image-container">
                <img src="${src}" alt="${alt}" class="lightbox-image">
            </div>
        </div>
    `;

    // Enhanced lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
    `;

    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        z-index: 2;
        max-width: 95vw;
        max-height: 95vh;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    const header = lightbox.querySelector('.lightbox-header');
    header.style.cssText = `
        padding: 20px 24px;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const title = lightbox.querySelector('.lightbox-title');
    title.style.cssText = `
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: white;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s ease;
        font-size: 1.2rem;
    `;

    const imageContainer = lightbox.querySelector('.lightbox-image-container');
    imageContainer.style.cssText = `
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        background: #f8fafc;
    `;

    const img = lightbox.querySelector('.lightbox-image');
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        display: block;
    `;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add to DOM
    document.body.appendChild(lightbox);

    // Animate in
    requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
        content.style.transform = 'scale(1)';
    });

    // Close button hover effect
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    });

    // Close handlers
    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    function closeLightbox() {
        console.log('❌ Closing lightbox');
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.style.overflow = '';
            if (lightbox.parentNode) {
                lightbox.remove();
            }
        }, 300);
    }

    // ESC key to close
    function handleEsc(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleEsc);
        }
    }
    document.addEventListener('keydown', handleEsc);
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
