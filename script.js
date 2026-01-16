document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Palette: Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Custom Cursor logic
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX - 2}px`;
        cursorDot.style.top = `${mouseY - 2}px`;
    });

    const animateCursor = () => {
        const easing = 0.08; // Smoother, slower easing
        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;

        cursor.style.left = `${cursorX - 10}px`;
        cursor.style.top = `${cursorY - 10}px`;

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

        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (backgroundBlobs.length >= 2) {
            backgroundBlobs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            backgroundBlobs[1].style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
        }
    });

    // Add parallax effect to glass cards on mouse move
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30; // Reduced intensity for smoothness
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });
});
