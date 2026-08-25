/**
 * DEVELOPER PORTFOLIO - INTERACTIVE JAVASCRIPT ENGINE
 * Features: Background Canvas Constellation, Typewriter, Theme Toggle, 
 * CLI Interactive Terminal, Counter Animation, Dynamic Filters & Modal Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Theme Switcher Engine (Dark / Light Mode)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        showToast(`Switched to ${newTheme} theme`);
    });

    // --------------------------------------------------------------------------
    // 2. Mobile Navigation Toggle
    // --------------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // --------------------------------------------------------------------------
    // 3. Navbar Scroll Effect & Active Link Observer
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --------------------------------------------------------------------------
    // 4. Hero Section Typewriter Effect
    // --------------------------------------------------------------------------
    const typingElement = document.getElementById('typing-element');
    const phrases = [
        'Full-Stack Web Apps.',
        'iOS & Android Apps (Flutter).',
        'Cross-Platform Solutions.',
        'REST & GraphQL APIs.',
        'Sleek User Experiences.'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // --------------------------------------------------------------------------
    // 5. Animated Number Counter (Intersection Observer)
    // --------------------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let count = 0;
                    const increment = Math.ceil(target / 50);
                    const duration = 1500;
                    const stepTime = duration / (target / increment);

                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            stat.textContent = target + (target === 99 ? '' : '+');
                            clearInterval(timer);
                        } else {
                            stat.textContent = count;
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.stats-bar-wrapper');
    if (statsBar) statsObserver.observe(statsBar);

    // --------------------------------------------------------------------------
    // 6. Skills Category Filter
    // --------------------------------------------------------------------------
    const skillFilterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 7. Projects Showcase Category Filter
    // --------------------------------------------------------------------------
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-project-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 8. Projects Modal Detail View
    // --------------------------------------------------------------------------
    const projectData = {
        p1: {
            title: "Nexus Web Analytics Platform",
            category: "Full-Stack Web Analytics",
            image: "assets/images/project_ai.jpg",
            desc: "Nexus Web Analytics is a real-time web portal that ingests streaming user telemetry and presents traffic metrics in interactive chart dashboards.",
            highlights: [
                "Real-time data updates via WebSockets & Python FastAPI services",
                "Responsive analytics dashboard powered by Next.js & Chart.js",
                "Optimized SQL query performance for sub-100ms report generation",
                "Automated CI/CD pipeline via GitHub Actions"
            ],
            tech: ["Next.js 14", "React", "Python", "FastAPI", "Tailwind CSS", "PostgreSQL"],
            demoUrl: "#",
            githubUrl: "https://github.com/rophylbycurtis"
        },
        p2: {
            title: "OmniPay Flutter Fintech App",
            category: "Mobile Application (Flutter iOS & Android)",
            image: "assets/images/project_ecommerce.jpg",
            desc: "OmniPay is a cross-platform mobile payment app built with Flutter, offering digital wallets, biometric security, and instant multi-currency transfers.",
            highlights: [
                "60 FPS native performance compiled from a single Dart codebase for iOS & Android",
                "Integrated Stripe Payment SDK & Biometric (FaceID/Fingerprint) authentication",
                "Offline-first transaction logging with SQLite local storage",
                "Clean state management implemented with Flutter BLoC pattern"
            ],
            tech: ["Flutter", "Dart", "Python", "FastAPI", "Stripe API", "PostgreSQL"],
            demoUrl: "#",
            githubUrl: "https://github.com/rophylbycurtis"
        },
        p3: {
            title: "Pulse Web App Control Center",
            category: "Backend & System Management",
            image: "assets/images/project_devops.jpg",
            desc: "Pulse is a web-based monitoring console designed to visualize application health, monitor server memory footprints, and track endpoint performance.",
            highlights: [
                "Custom metrics aggregator for real-time API latency monitoring",
                "Interactive server status board with live WebSocket updates",
                "Instant alert webhooks integration for Slack & Email notifications",
                "Clean modular architecture with Django REST Framework & Python"
            ],
            tech: ["TypeScript", "Python", "Django", "Redis", "PostgreSQL", "Tailwind"],
            demoUrl: "#",
            githubUrl: "https://github.com/rophylbycurtis"
        },
        p4: {
            title: "FitPulse Mobile Fitness Tracker",
            category: "Mobile Application (Flutter iOS & Android)",
            desc: "FitPulse is a feature-rich mobile fitness tracker app built with Flutter, providing real-time activity metrics, workout logging, and offline synchronization.",
            highlights: [
                "Cross-platform iOS and Android mobile app built with Flutter & Dart",
                "Real-time step counter & heart rate Bluetooth plugin integration",
                "Firebase Push Notifications & cloud backup sync"
            ],
            tech: ["Flutter", "Dart", "Python", "FastAPI", "Firebase", "SQLite"],
            demoUrl: "#",
            githubUrl: "https://github.com/rophylbycurtis"
        },
        p5: {
            title: "HyperIDE Web Code Playground",
            category: "Developer Tooling",
            desc: "HyperIDE brings desktop-grade code editing to the browser with instant compilation using WebAssembly and real-time multiplayer pair programming.",
            highlights: [
                "WebAssembly sandbox environment for zero-latency execution",
                "Monaco Editor integration with customized syntax highlighting",
                "CRDT algorithm for real-time collaborative editing"
            ],
            tech: ["TypeScript", "WebAssembly", "Monaco Editor", "Socket.io", "Rust"],
            demoUrl: "#",
            githubUrl: "https://github.com/rophylbycurtis"
        },
        p6: {
            title: "Enterprise SaaS Starter Boilerplate",
            category: "Full-Stack SaaS Template",
            desc: "A production-grade starter kit engineered for developers building SaaS products, featuring auth, payments, team management, and automated deployments.",
            highlights: [
                "Next.js App Router with Server Actions & Suspense boundaries",
                "Supabase Database with Row-Level Security (RLS) policies",
                "Stripe Customer Portal & tier-based subscription gates"
            ],
            tech: ["Next.js 14", "Prisma ORM", "Supabase", "Stripe", "Tailwind CSS"],
            demoUrl: "#",
            githubUrl: "https://github.com/rophylbycurtis"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            const data = projectData[id];
            if (data) {
                renderModalContent(data);
                modalOverlay.classList.add('active');
            }
        });
    });

    function renderModalContent(data) {
        modalBody.innerHTML = `
            <div class="modal-project-content">
                ${data.image ? `<img src="${data.image}" alt="${data.title}" class="modal-project-img">` : ''}
                <div class="modal-header-info">
                    <span class="modal-category">${data.category}</span>
                    <h2 class="modal-title">${data.title}</h2>
                </div>
                <p class="modal-desc">${data.desc}</p>
                <div class="modal-section">
                    <h4>Key Engineering Highlights</h4>
                    <ul class="modal-list">
                        ${data.highlights.map(h => `<li><i class="fa-solid fa-check text-accent"></i> ${h}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Technologies Used</h4>
                    <div class="project-tags">
                        ${data.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                    <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
                        <i class="fa-brands fa-github"></i> View GitHub
                    </a>
                    <a href="${data.demoUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-glow">
                        <i class="fa-solid fa-external-link"></i> Live Demo
                    </a>
                </div>
            </div>
        `;
    }

    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // --------------------------------------------------------------------------
    // 9. Interactive CLI Terminal Engine
    // --------------------------------------------------------------------------
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalClearBtn = document.getElementById('terminal-clear-btn');

    const cliCommands = {
        help: `
            <div class="cmd-output-text">Available Commands:</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">about</span>     - Summary of Henry's experience & bio</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">skills</span>    - List top core technical skills</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">projects</span>  - Show highlighted portfolio projects</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">contact</span>   - Show email and direct social channels</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">theme</span>     - Toggle website theme (dark/light)</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">clear</span>     - Clear terminal history</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">date</span>      - Show current local time</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">whoami</span>    - Display current session info</div>
            <div class="cmd-output-text">  <span class="cmd-highlight">sudo hire</span> - Launch priority recruitment request</div>
        `,
        about: `
            <div class="cmd-output-text"><span class="cmd-success">Henry Curtis</span> | Full Stack & Mobile Developer</div>
            <div class="cmd-output-text">Location: Unavailable. 4+ years of engineering experience creating Flutter iOS & Android apps, Web Apps, and Python APIs (FastAPI & Django).</div>
        `,
        skills: `
            <div class="cmd-output-text">Core Technical Stack:</div>
            <div class="cmd-output-text">• Mobile   : Flutter, Dart, iOS & Android Publishing, BLoC / Provider</div>
            <div class="cmd-output-text">• Frontend : React, Next.js 14, TypeScript, JavaScript (ES6+), Tailwind</div>
            <div class="cmd-output-text">• Backend  : Python (FastAPI & Django), PostgreSQL, MongoDB, Redis, REST APIs</div>
            <div class="cmd-output-text">• Tools    : Git, GitHub Actions, Vite, Webpack, Firebase</div>
        `,
        projects: `
            <div class="cmd-output-text">Featured Projects:</div>
            <div class="cmd-output-text">1. <span class="cmd-highlight">Nexus Web Analytics</span> (Next.js, React, Python, FastAPI)</div>
            <div class="cmd-output-text">2. <span class="cmd-highlight">OmniPay Flutter Fintech</span> (Flutter, Dart, Python, FastAPI)</div>
            <div class="cmd-output-text">3. <span class="cmd-highlight">Pulse Web Control Center</span> (TypeScript, Python, Django, Redis)</div>
            <div class="cmd-output-text">4. <span class="cmd-highlight">FitPulse Mobile Fitness</span> (Flutter, Dart, Python, FastAPI)</div>
        `,
        contact: `
            <div class="cmd-output-text">Reach Out & Connect:</div>
            <div class="cmd-output-text">• Email     : curtishenry030@gmail.com</div>
            <div class="cmd-output-text">• GitHub    : https://github.com/rophylbycurtis</div>
            <div class="cmd-output-text">• LinkedIn  : https://www.linkedin.com/in/henry-curtis-a745792b4</div>
            <div class="cmd-output-text">• X         : https://x.com/realcurtis_</div>
            <div class="cmd-output-text">• Instagram : https://www.instagram.com/itscurtishenry</div>
        `,
        date: () => `<div class="cmd-output-text">${new Date().toLocaleString()}</div>`,
        whoami: `<div class="cmd-output-text">User: visitor@portfolio-session (Role: Recruiter / Developer / Guest)</div>`,
        theme: () => {
            themeToggleBtn.click();
            return `<div class="cmd-success">Theme updated successfully!</div>`;
        },
        'sudo hire': `
            <div class="cmd-success" style="font-weight: bold; font-size: 1.1rem;">🚀 PRIORITY RECRUITMENT INITIATED!</div>
            <div class="cmd-output-text">Thank you for your interest! Please send an email directly to <span class="cmd-highlight">curtishenry030@gmail.com</span> or fill out the contact form below. Let's build something awesome together!</div>
        `
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = terminalInput.value.trim();
                const cmd = rawCmd.toLowerCase();
                terminalInput.value = '';

                if (!cmd) return;

                // Echo typed command line
                const echoLine = document.createElement('div');
                echoLine.className = 'terminal-line';
                echoLine.innerHTML = `<span class="prompt-user">visitor@henrycurtis</span>:<span class="prompt-path">~</span>$ ${rawCmd}`;
                terminalOutput.appendChild(echoLine);

                if (cmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    return;
                }

                let responseHtml = '';
                if (cliCommands[cmd]) {
                    responseHtml = typeof cliCommands[cmd] === 'function' ? cliCommands[cmd]() : cliCommands[cmd];
                } else {
                    responseHtml = `<div class="cmd-error">Command not found: '${rawCmd}'. Type <span class="cmd-highlight">'help'</span> for available commands.</div>`;
                }

                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-line';
                responseLine.innerHTML = responseHtml;
                terminalOutput.appendChild(responseLine);

                // Auto scroll terminal to bottom
                const terminalBody = document.getElementById('terminal-body');
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    if (terminalClearBtn) {
        terminalClearBtn.addEventListener('click', () => {
            terminalOutput.innerHTML = '';
        });
    }

    // --------------------------------------------------------------------------
    // 10. Copy Buttons & Toast Notifications
    // --------------------------------------------------------------------------
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(msg) {
        toastMessage.textContent = msg;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeText = document.getElementById('code-content').innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                showToast('Code snippet copied to clipboard!');
            });
        });
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('curtishenry030@gmail.com').then(() => {
                showToast('Email address copied to clipboard!');
            });
        });
    }

    // --------------------------------------------------------------------------
    // 11. Contact Form Processing
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/xjybqglj', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Message Sent!`;
                    submitBtn.style.background = 'var(--accent-emerald)';
                    showToast('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        showToast(data.errors.map(error => error.message).join(', '));
                    } else {
                        showToast('Oops! There was a problem submitting your form.');
                    }
                    submitBtn.innerHTML = originalBtnContent;
                }
            } catch (error) {
                showToast('Network error: Unable to send message right now.');
                submitBtn.innerHTML = originalBtnContent;
            } finally {
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Download CV button feedback
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Downloading Henry Curtis Resume (PDF)...');
        });
    }

    // --------------------------------------------------------------------------
    // 12. Background Canvas Particle Constellation System
    // --------------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 18), 70);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 120})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }
});
