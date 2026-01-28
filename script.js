document.addEventListener('DOMContentLoaded', () => {
    // Performance: Cache window dimensions and state
    let isDesktop = window.innerWidth >= 1024;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    window.addEventListener('resize', () => {
        isDesktop = window.innerWidth >= 1024;
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    }, { passive: true });

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

    if (!cursor || !cursorDot) return;

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

    // Performance: Throttling mousemove for background blobs
    // Cache the DOM query outside the event listener to prevent frequent DOM reflows/searches
    const backgroundBlobs = document.querySelectorAll('.fixed .animate-pulse');
    let lastMove = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMove < 30) return;
        lastMove = now;

        const x = (e.clientX / windowWidth - 0.5) * 2;
        const y = (e.clientY / windowHeight - 0.5) * 2;

        if (backgroundBlobs.length >= 2) {
            backgroundBlobs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            backgroundBlobs[1].style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
        }
    });

    // Add parallax effect to glass cards on mouse move
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        let cardCenter = null;

        // Cache dimensions on enter to avoid layout thrashing (getBoundingClientRect) during animation
        card.addEventListener('mouseenter', () => {
            const rect = card.getBoundingClientRect();
            cardCenter = {
                x: rect.left + rect.width / 2 + window.scrollX,
                y: rect.top + rect.height / 2 + window.scrollY
            };
        });

        card.addEventListener('mousemove', (e) => {
            if (!isDesktop) return;

            // Fallback for edge cases (e.g. load under cursor)
            if (!cardCenter) {
                const rect = card.getBoundingClientRect();
                cardCenter = {
                    x: rect.left + rect.width / 2 + window.scrollX,
                    y: rect.top + rect.height / 2 + window.scrollY
                };
            }

            // Use pageX/Y (document relative) with cached document-relative center
            // This avoids recalculating layout/styles on every frame
            const rotateX = (e.pageY - cardCenter.y) / 30;
            const rotateY = (cardCenter.x - e.pageX) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
            cardCenter = null; // Force recalc on next enter
        });
    });
});
