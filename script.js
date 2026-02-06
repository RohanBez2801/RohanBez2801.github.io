document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', !isHidden);

            if (isHidden) {
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Active Navigation Highlighting
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const navLinks = document.querySelectorAll('nav ul li a, #mobile-menu a');
                navLinks.forEach(link => link.classList.remove('text-cyan-400'));

                if (id) {
                    const activeLinks = document.querySelectorAll(`nav ul li a[href="#${id}"], #mobile-menu a[href="#${id}"]`);
                    activeLinks.forEach(link => link.classList.add('text-cyan-400'));
                }
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    document.querySelectorAll('section').forEach(section => {
        navObserver.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom Cursor logic
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (cursor && cursorDot && !prefersReducedMotion) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Use translate3d for performance (compositor-only)
            cursorDot.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
        });

        let cursorScale = 1;

        const animateCursor = () => {
            const easing = 0.08; // Smoother, slower easing
            cursorX += (mouseX - cursorX) * easing;
            cursorY += (mouseY - cursorY) * easing;

            // Interpolate scale for smooth hover effect
            const targetScale = cursor.classList.contains('cursor-hover') ? 3 : 1;
            cursorScale += (targetScale - cursorScale) * 0.1;

            // Use translate3d and scale for compositor-only animation
            cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0) scale(${cursorScale})`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const hoverElements = 'a, button, .glass-card, .px-4.py-2.glass, span.px-4.py-2, [role="button"]';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverElements)) {
                cursor.classList.add('cursor-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverElements)) {
                cursor.classList.remove('cursor-hover');
            }
        });
    }

    // Performance: Throttling mousemove for background blobs
    // Cache the DOM query outside the event listener to prevent frequent DOM reflows/searches
    const backgroundBlobs = document.querySelectorAll('.fixed .animate-pulse');
    let lastMove = 0;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMove < 30) return;
            lastMove = now;

            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            if (backgroundBlobs.length >= 2) {
                backgroundBlobs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
                backgroundBlobs[1].style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
            }
        });
    }

    // Add parallax effect to glass cards on mouse move
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        let bounds = { x: 0, y: 0, width: 0, height: 0 };

        card.addEventListener('mouseenter', () => {
            const rect = card.getBoundingClientRect();
            bounds.width = rect.width;
            bounds.height = rect.height;
            bounds.x = rect.left + window.scrollX;
            bounds.y = rect.top + window.scrollY;
        });

        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            // Optimization: Lazy init bounds to handle edge cases (resize/load)
            // Caching prevents layout thrashing (reflow) on every frame
            if (bounds.width === 0) {
                const rect = card.getBoundingClientRect();
                bounds.width = rect.width;
                bounds.height = rect.height;
                bounds.x = rect.left + window.scrollX;
                bounds.y = rect.top + window.scrollY;
            }

            const x = e.pageX - bounds.x;
            const y = e.pageY - bounds.y;

            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const rotateX = (y - centerY) / 30; // Reduced intensity for smoothness
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
                backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
                backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            }
        };

        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    toggleBackToTop();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
