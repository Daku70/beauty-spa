// Beauty Spa Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .smooth-scroll');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Gallery Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt
        };
    });

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            showLightboxImage();
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        // Add keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentImageIndex = index;
                showLightboxImage();
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });

        // Make gallery items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View image: ${item.querySelector('img').alt}`);
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeLightbox();
    });
    
    lightboxOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeLightbox();
    });

    // Navigate images
    function showLightboxImage() {
        const image = images[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showLightboxImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showLightboxImage();
    }

    lightboxNext.addEventListener('click', function(e) {
        e.preventDefault();
        showNextImage();
    });
    
    lightboxPrev.addEventListener('click', function(e) {
        e.preventDefault();
        showPrevImage();
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
            }
        }
    });

    // Scroll animations for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards, feature cards, and testimonial cards
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .gallery-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Enhanced floating call button with pulse effect
    const floatingCallBtn = document.querySelector('.call-btn');
    if (floatingCallBtn) {
        // Add click tracking
        floatingCallBtn.addEventListener('click', function(e) {
            // Add a ripple effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track the call attempt
            console.log('Call button clicked - redirecting to phone app');
        });

        // Make it more attention-grabbing after user scrolls
        let hasScrolled = false;
        window.addEventListener('scroll', function() {
            if (!hasScrolled && window.scrollY > 500) {
                hasScrolled = true;
                floatingCallBtn.style.animation = 'float 3s ease-in-out infinite, pulse 2s infinite';
            }
        });
    }

    // Add hover effects to contact info links
    const contactLinks = document.querySelectorAll('.contact-item a[href^="tel:"]');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effect to all call buttons
    const callButtons = document.querySelectorAll('a[href^="tel:"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a brief flash effect
            const originalBackground = this.style.backgroundColor;
            this.style.backgroundColor = 'var(--color-primary-active)';
            setTimeout(() => {
                this.style.backgroundColor = originalBackground;
            }, 200);
            
            // Show confirmation message
            showCallConfirmation();
        });
    });

    // Show call confirmation
    function showCallConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.innerHTML = 'Opening phone app...';
        confirmation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            if (document.body.contains(confirmation)) {
                document.body.removeChild(confirmation);
            }
        }, 2000);
    }

    // Parallax effect for hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Add smooth reveal animations for sections
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(header);
    });

    // Add touch gestures for mobile gallery navigation
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage(); // Swipe left - next image
            } else {
                showPrevImage(); // Swipe right - previous image
            }
        }
    }

    // Improved image loading
    const lazyImages = document.querySelectorAll('img');
    lazyImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.log('Failed to load image:', this.src);
            this.style.opacity = '0.5';
        });
    });

    // Add active state to navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Performance optimization for scroll events
    let ticking = false;
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(function() {
                // Scroll-based animations would go here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);

    // Initialize the page
    console.log('Beauty Spa website loaded successfully! 🌸');
    
    // Show welcome message after a short delay
    setTimeout(() => {
        console.log('Welcome to Beauty Spa - Your relaxation journey begins here!');
    }, 1000);
});