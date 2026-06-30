document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons and AOS
    lucide.createIcons();
    AOS.init({
        once: true,
        offset: 50,
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-background/90', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-border');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-background/90', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-border');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Typing Animation (Hero)
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement && window.typedTitles && window.typedTitles.length > 0) {
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentTitle = window.typedTitles[titleIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster deleting
            } else {
                typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Normal typing
            }
            
            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at the end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % window.typedTitles.length;
                typeSpeed = 500; // Pause before new word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect
        setTimeout(type, 1000);
    }

    // 6. Particles.js Setup
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#06B6D4" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#06B6D4", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 7. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;
            
            // Loading state
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            formMessage.classList.add('hidden');
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                formMessage.classList.remove('hidden', 'bg-red-500/10', 'text-red-500', 'border', 'border-red-500/20');
                
                if (data.success) {
                    formMessage.textContent = data.message;
                    formMessage.classList.add('bg-green-500/10', 'text-green-500', 'border', 'border-green-500/20');
                    contactForm.reset();
                } else {
                    formMessage.textContent = data.message || 'Something went wrong. Please try again.';
                    formMessage.classList.add('bg-red-500/10', 'text-red-500', 'border', 'border-red-500/20');
                    if (data.errors) {
                        formMessage.textContent = data.errors.map(err => err.msg).join(', ');
                    }
                }
            } catch (error) {
                formMessage.classList.remove('hidden');
                formMessage.textContent = 'Network error. Please try again later.';
                formMessage.classList.add('bg-red-500/10', 'text-red-500', 'border', 'border-red-500/20');
            } finally {
                // Restore button state
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });
    }
});
