/**
 * Portfolio JS - Lounis Nait Belkacem
 * Handles mobile menu, scroll reveal animations, and smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       NAVIGATION & MOBILE MENU
       ========================================== */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');

            // Prevent scrolling on body when menu is open
            if (mobileMenu.classList.contains('is-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================
       SCROLL REVEAL ANIMATIONS
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes fully into view
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================
       SMOOTH SCROLL TO TOP
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       ACTIVE NAV LINK HIGHLIGHTING
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150; // Offset for fixed header

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       PROJECT MODAL LOGIC
       ========================================== */
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    if (modal && projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();

                // Get data attributes
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                const imgSrc = card.getAttribute('data-img');

                // Populate Modal
                if (title) modalTitle.textContent = title;
                if (desc) modalDesc.textContent = desc;
                if (imgSrc) modalImg.src = imgSrc;

                // Show Modal
                modal.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close functions
        const closeModal = () => {
            modal.classList.remove('is-active');
            document.body.style.overflow = '';

            // Clear contents after animation
            setTimeout(() => {
                modalImg.src = '';
                modalTitle.textContent = '';
                modalDesc.textContent = '';
            }, 300);
        };

        modalCloseBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                closeModal();
            }
        });
    }

});
