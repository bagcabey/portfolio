// Typewriter effect logic
document.addEventListener("DOMContentLoaded", () => {
    // --- Scramble Preloader Logic ---
    const preloader = document.getElementById('preloader');
    const scrambleEl = document.querySelector('.scramble-text');

    if (preloader && scrambleEl) {
        const targetText = scrambleEl.getAttribute('data-text');
        const secondText = "BAĞÇABAŞI";
        const chars = "-_\\/[]{}—=+*^?#________";

        function runScramble(text, onComplete) {
            let frame = 0;
            let queue = [];
            for (let i = 0; i < text.length; i++) {
                queue.push({
                    from: chars[Math.floor(Math.random() * chars.length)],
                    to: text[i],
                    start: Math.floor(Math.random() * 40),
                    end: Math.floor(Math.random() * 40) + 40,
                    char: ''
                });
            }

            function update() {
                let output = '';
                let complete = 0;

                for (let i = 0; i < queue.length; i++) {
                    let { from, to, start, end, char } = queue[i];
                    if (frame >= end) {
                        complete++;
                        output += to;
                    } else if (frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = chars[Math.floor(Math.random() * chars.length)];
                            queue[i].char = char;
                        }
                        output += `<span class="dull">${char}</span>`;
                    } else {
                        output += `<span class="dull">${from}</span>`;
                    }
                }

                scrambleEl.innerHTML = output;

                if (complete === queue.length) {
                    if (onComplete) onComplete();
                } else {
                    requestAnimationFrame(update);
                    frame++;
                }
            }
            requestAnimationFrame(update);
        }

        runScramble(targetText, () => {
            setTimeout(() => {
                runScramble(secondText, () => {
                    setTimeout(() => {
                        preloader.classList.add('fade-out');
                        setTimeout(() => {
                            document.body.classList.remove('hidden-scroll');
                        }, 800);
                    }, 1000);
                });
            }, 800);
        });
    }

    // --- Typewriter Effect ---
    const texts = ["<Ömer Bağçabaşı />", "Full-Stack Developer", "Software Team Lead"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typewriterElement = document.getElementById("typewriter-text");

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Slower typing
        }

        // Handle word transitions
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000); // Start after 1 second

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Simple animation for hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Scroll Spy for Side Menu ---
    const sideLinks = document.querySelectorAll('.side-menu .side-link');
    const sections = document.querySelectorAll('section');

    const scrollSpyOptions = {
        threshold: 0.4, // Section is considered active when 40% is visible
        rootMargin: "0px"
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                sideLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });
    // --- Intersection Observer for fade-in animations ---
    const revealObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    const animateElements = document.querySelectorAll('.timeline-content, .project-row, .skill-group, .contact-box, .contact-item-pure');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        const delay = index * 0.05;
        el.style.transition = `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`;
        revealObserver.observe(el);
    });
});
