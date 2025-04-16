// ===== PRELOADER =====
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderCounter = document.querySelector('.loader-counter');
    let progress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress > 100) progress = 100;
        
        loaderProgress.style.width = `${progress}%`;
        loaderCounter.textContent = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            
            // Add loaded class to body
            document.body.classList.add('loaded');
            
            // Hide loader with animation
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    
                    // Initialize animations after loader is hidden
                    initAnimations();
                }, 500);
            }, 1000);
        }
    }, 100);
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 50);
    });
    
    // Cursor hover effect on links and buttons
    const links = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
}

// ===== STICKY HEADER =====
function initStickyHeader() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// ===== COPY BUTTONS =====
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container') || (() => {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    })();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check' : 'fa-times'}"></i>
        ${message}
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.getAttribute('data-value');
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                showToast('Text copied successfully!');
            } catch (err) {
                console.error('Failed to copy text:', err);
                showToast('Failed to copy text', 'error');
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navbar.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navbar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navbar.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target) && navbar.classList.contains('active')) {
            menuBtn.classList.remove('open');
            navbar.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .section-subtitle, .about-text h3, .about-text p, .skills-text h3, .skills-text p, .service-card, .portfolio-item, .timeline-item, .testimonial-item, .contact-info, .contact-form').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
}

// ===== SKILLS ANIMATION =====
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const skillValue = entry.target.getAttribute('data-skill');
                const skillPercent = entry.target.querySelector('.skill-info span').textContent;
                
                skillProgress.style.width = skillPercent;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// ===== PORTFOLIO MODAL =====
function initPortfolioModal() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modal = document.querySelector('.project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalContent = document.querySelector('.modal-content');
    
    // Project data for portfolio items
    const projectData = [
        {
            id: 'italy-plane',
            title: 'Design Avion Italie',
            category: 'Digital',
            client: 'Compagnie Aérienne Italienne',
            description: 'Une conception numérique élégante pour une compagnie aérienne italienne, mettant en valeur les couleurs nationales et l\'héritage culturel italien tout en maintenant une esthétique moderne et professionnelle.',
            images: ['italy-plane.png'],
            challenge: 'Créer un design d\'avion qui représente l\'identité nationale italienne tout en restant contemporain et attrayant pour un public international.',
            solution: 'J\'ai développé un design qui intègre subtilement les couleurs du drapeau italien dans une composition fluide et dynamique, évoquant à la fois la tradition et l\'innovation.'            
        },
        {
            id: 'air-algerie-redesign',
            title: 'Redesign Air Algérie',
            category: 'Digital',
            client: 'Compagnie Aérienne Nationale Algérienne',
            description: 'Un redesign complet de l\'identité visuelle d\'Air Algérie, modernisant l\'image de la compagnie tout en préservant son héritage culturel et ses valeurs fondamentales.',
            images: ['air algérie redesign.png'],
            challenge: 'Revitaliser l\'image d\'une compagnie aérienne nationale historique pour la rendre plus contemporaine et compétitive sur le marché international, tout en respectant son identité culturelle.',
            solution: 'J\'ai créé une nouvelle identité visuelle qui conserve les symboles nationaux clés tout en les réinterprétant dans un langage graphique moderne, avec une palette de couleurs rafraîchie et une typographie contemporaine qui améliore la lisibilité et la reconnaissance de la marque.'            
        },
        {
            id: 'polygon-logo',
            title: 'Projet Polygon',
            category: 'Digital',
            client: 'Entreprise Technologique',
            description: 'Une identité visuelle géométrique et innovante pour une entreprise technologique, utilisant des formes polygonales pour symboliser la précision, la modularité et l\'adaptabilité.',
            images: ['polygon.png'],
            challenge: 'Développer une identité visuelle qui communique les valeurs d\'innovation et de haute technologie tout en restant suffisamment flexible pour s\'adapter à différentes applications et supports.',
            solution: 'J\'ai conçu un système d\'identité basé sur des formes polygonales qui peuvent se reconfigurer et s\'adapter à différents contextes, créant ainsi une identité dynamique qui reflète la nature évolutive et adaptative de l\'entreprise.'            
        },
        {
            id: 'travel-plane',
            title: 'Design Avion Voyage',
            category: 'Digital',
            client: 'Agence de Voyage Internationale',
            description: 'Un design d\'avion créatif pour une agence de voyage, illustrant le concept de voyage mondial avec des éléments graphiques représentant différentes destinations et cultures.',
            images: ['travel-plane-nw.png'],
            challenge: 'Concevoir une livrée d\'avion qui communique l\'idée de voyage global et d\'exploration tout en restant visuellement cohérente et reconnaissable.',
            solution: 'J\'ai créé un design qui utilise des motifs abstraits inspirés de différentes cultures mondiales, avec une palette de couleurs vives qui évoque l\'aventure et la découverte.'            
        },
        {
            id: 'digital-campaign',
            title: 'Campagne Digitale',
            category: 'Digital',
            client: 'Marque de Mode Contemporaine',
            description: 'Une campagne digitale complète pour une marque de mode, comprenant des visuels pour les réseaux sociaux, des bannières web et des éléments interactifs qui renforcent l\'identité de la marque.',
            images: ['project3.svg'],
            challenge: 'Développer une campagne digitale cohérente qui se démarque dans un secteur saturé tout en communiquant efficacement les valeurs et l\'esthétique de la marque.',
            solution: 'J\'ai conçu une série d\'éléments visuels distinctifs avec une direction artistique forte, utilisant des compositions audacieuses et une typographie unique pour créer une présence mémorable sur toutes les plateformes digitales.'            
        },
        {
            id: 'modern-logo',
            title: 'Logo Moderne',
            category: 'Logos',
            client: 'Startup Technologique',
            description: 'Un logo minimaliste et moderne pour une startup technologique, capturant l\'essence de l\'innovation et de la fiabilité à travers des formes géométriques simples et une typographie soignée.',
            images: ['project1.svg'],
            challenge: 'Créer un logo qui communique l\'innovation technologique tout en restant intemporel et facilement reconnaissable dans différents contextes d\'application.',
            solution: 'J\'ai développé un symbole abstrait basé sur des principes géométriques, combiné avec une typographie personnalisée qui reflète la précision et la vision avant-gardiste de l\'entreprise.'            
        },
        {
            id: 'corporate-logo',
            title: 'Logo d\'Entreprise',
            category: 'Logos',
            client: 'Entreprise de Services Financiers',
            description: 'Un logo corporate sophistiqué pour une entreprise de services financiers, alliant professionnalisme et approche contemporaine à travers une identité visuelle équilibrée.',
            images: ['project5.svg'],
            challenge: 'Concevoir un logo qui inspire confiance et expertise dans le secteur financier tout en se différenciant des approches visuelles conventionnelles du domaine.',
            solution: 'J\'ai créé un logo qui utilise des formes subtiles suggérant stabilité et croissance, avec une palette de couleurs raffinée qui communique le professionnalisme et l\'innovation.'            
        },
        {
            id: 'event-flyer',
            title: 'Flyer Événement',
            category: 'Flyers',
            client: 'Festival Culturel',
            description: 'Un flyer captivant pour un événement culturel, combinant typographie expressive, illustrations dynamiques et mise en page stratégique pour communiquer efficacement les informations essentielles.',
            images: ['project6.svg'],
            challenge: 'Créer un flyer qui attire immédiatement l\'attention dans un environnement urbain saturé d\'informations, tout en transmettant clairement les détails de l\'événement.',
            solution: 'J\'ai conçu un flyer avec une hiérarchie visuelle claire, utilisant des contrastes de couleurs et de tailles pour guider l\'œil du spectateur vers les informations les plus importantes, tout en maintenant une esthétique cohérente avec l\'esprit de l\'événement.'            
        }
    ];
    
    portfolioLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the parent portfolio item to determine which project to show
            const portfolioItem = link.closest('.portfolio-item');
            const projectId = portfolioItem.getAttribute('data-id');
            
            // Find the matching project in projectData
            let project = projectData.find(p => p.id === projectId) || projectData[0];
            
            // Populate modal content
            modalContent.innerHTML = `
                <div class="project-details">
                    <h2>${project.title}</h2>
                    <div class="project-info">
                        <div class="info-item">
                            <h5>Catégorie:</h5>
                            <p>${project.category}</p>
                        </div>
                        <div class="info-item">
                            <h5>Client:</h5>
                            <p>${project.client}</p>
                        </div>
                    </div>
                    <div class="project-gallery">
                        ${project.images.map(img => `<img src="${img}" alt="Image du Projet">`).join('')}
                    </div>
                    <div class="project-description">
                        <h3>Aperçu du Projet</h3>
                        <p>${project.description}</p>
                        <h3>Défi</h3>
                        <p>${project.challenge}</p>
                        <h3>Solution</h3>
                        <p>${project.solution}</p>
                    </div>
                </div>
            `;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking on close button or overlay
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    // Show testimonial at current index
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('active');
        });
        
        testimonialItems[index].style.display = 'block';
        
        // Add animation class after a small delay
        setTimeout(() => {
            testimonialItems[index].classList.add('active');
        }, 50);
    }
    
    // Next testimonial
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= testimonialItems.length) {
            currentIndex = 0;
        }
        showTestimonial(currentIndex);
    });
    
    // Previous testimonial
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = testimonialItems.length - 1;
        }
        showTestimonial(currentIndex);
    });
    
    // Auto slide testimonials
    setInterval(() => {
        nextBtn.click();
    }, 5000);
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form (simple validation)
        if (name && email && subject && message) {
            // In a real project, you would send this data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
    
    // Input animation
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const focusEffect = group.querySelector('.input-focus-effect');
        
        input.addEventListener('focus', () => {
            focusEffect.style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                focusEffect.style.width = '0';
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if the href is not just #
            if (link.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== TEXT ANIMATION =====
function initTextAnimation() {
    const animateText = document.querySelector('.animate-text');
    
    if (animateText) {
        const text = animateText.textContent;
        animateText.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.05}s`;
            animateText.appendChild(span);
        }
    }
}

// ===== INITIALIZE ALL ANIMATIONS =====
function initAnimations() {
    // Add class to body to start animations
    document.body.classList.add('animate-start');
    
    // Initialize all components
    initCustomCursor();
    initStickyHeader();
    initMobileMenu();
    initScrollAnimations();
    initSkillsAnimation();
    initPortfolioFilter();
    initPortfolioModal();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();
    initTextAnimation();
    initCopyButtons();
    
    // Add animation classes to elements
    document.querySelectorAll('.hero-text h1, .hero-text p, .hero-btns, .social-icons').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Animate hero image
    const heroImg = document.querySelector('.hero-img-container');
    if (heroImg) {
        heroImg.style.opacity = '0';
        heroImg.style.transform = 'translateX(50px) rotate(3deg)';
        
        setTimeout(() => {
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'translateX(0) rotate(3deg)';
        }, 1000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .section-subtitle, .about-text h3, .about-text p, .skills-text h3, .skills-text p, .service-card, .portfolio-item, .timeline-item, .testimonial-item, .contact-info, .contact-form').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
});