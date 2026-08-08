// ========================================
// OASIS OF HOPE WORSHIP CENTRE
// Main Script - Complete Interactive Functionality
// ========================================

// ---------- MOBILE MENU ----------
(function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    if (menuToggle && navLinks) {
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        function toggleMenu() {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = isActive ? 'hidden' : '';
        }

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
})();

// ---------- NAVBAR SCROLL EFFECT ----------
(function() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
})();

// ---------- SCROLL REVEAL ANIMATIONS ----------
(function() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
})();

// ---------- ACTIVE NAV LINK ----------
(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
})();

// ---------- CONTACT FORM ----------
(function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            let isValid = true;

            [name, email, message].forEach(input => {
                if (input) {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });

            if (name && name.value.trim() === '') {
                isValid = false;
                name.style.borderColor = '#ef4444';
                name.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15)';
                name.setAttribute('placeholder', '⚠ Please enter your name');
            }

            if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                isValid = false;
                email.style.borderColor = '#ef4444';
                email.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15)';
                email.setAttribute('placeholder', '⚠ Please enter a valid email');
            }

            if (message && message.value.trim() === '') {
                isValid = false;
                message.style.borderColor = '#ef4444';
                message.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.15)';
                message.setAttribute('placeholder', '⚠ Please enter your message');
            }

            if (!isValid) {
                e.preventDefault();
                const inputs = this.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('focus', function() {
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                        if (this.getAttribute('placeholder')?.startsWith('⚠')) {
                            this.setAttribute('placeholder', this.getAttribute('placeholder').replace('⚠ ', ''));
                        }
                    });
                });
            }
        });
    }
})();

// ---------- SMOOTH SCROLL ----------
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
})();

// ---------- BULLETIN PAGE ----------
(function() {
    if (document.querySelector('.bulletin-item')) {
        const loadBulletin = window.loadBulletin || function(event, file) {
            const previewFrame = document.getElementById('pdfPreview');
            const downloadLink = document.getElementById('downloadLink');
            const placeholder = document.getElementById('pdfPlaceholder');

            if (placeholder) placeholder.style.display = 'none';
            if (previewFrame) {
                previewFrame.style.display = 'block';
                previewFrame.src = file;
            }
            if (downloadLink) {
                downloadLink.style.display = 'flex';
                downloadLink.href = file;
                downloadLink.download = file.split('/').pop();
            }

            document.querySelectorAll('.bulletin-item').forEach(item => {
                item.classList.remove('active');
            });
            if (event && event.currentTarget) {
                event.currentTarget.classList.add('active');
            }
        };
        window.loadBulletin = loadBulletin;

        const firstActive = document.querySelector('.bulletin-item.active');
        if (firstActive) {
            const onclickAttr = firstActive.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/['"]([^'"]+)['"]/);
                if (match && match[1]) {
                    const file = match[1];
                    fetch(file, { method: 'HEAD' })
                        .then(response => {
                            if (response.ok) {
                                loadBulletin(null, file);
                            }
                        })
                        .catch(() => {
                            console.log('Bulletin PDFs not found yet.');
                        });
                }
            }
        }
    }
})();

// ---------- GIVE PAGE: COPY TO CLIPBOARD ----------
(function() {
    if (document.querySelector('.copy-btn')) {
        if (typeof window.copyToClipboard === 'undefined') {
            window.copyToClipboard = function(id, button) {
                const textElement = document.getElementById(id);
                if (!textElement) return;
                const text = textElement.textContent.trim();

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        button.classList.add('copied');
                        showNotification('✅ Account number copied to clipboard!');
                        setTimeout(() => {
                            button.innerHTML = '<i class="fas fa-copy"></i> Copy Account Number';
                            button.classList.remove('copied');
                        }, 2500);
                    }).catch(() => {
                        fallbackCopy(text, button);
                    });
                } else {
                    fallbackCopy(text, button);
                }
            };
        }

        function fallbackCopy(text, button) {
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            tempInput.setSelectionRange(0, 99999);
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    button.classList.add('copied');
                    showNotification('✅ Account number copied to clipboard!');
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-copy"></i> Copy Account Number';
                        button.classList.remove('copied');
                    }, 2500);
                }
            } catch (err) {
                console.error('Copy failed:', err);
                alert('Copy failed. Please copy manually: ' + text);
            }
            document.body.removeChild(tempInput);
        }
    }
})();

// ---------- GIVE PAGE: NOTIFICATION ----------
(function() {
    if (typeof window.showNotification === 'undefined') {
        window.showNotification = function(message) {
            const existing = document.querySelector('.notification');
            if (existing) existing.remove();

            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        };
    }
})();

// ---------- LAZY LOAD IMAGES ----------
(function() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px' });
        images.forEach(img => imageObserver.observe(img));
    }
})();

// ---------- KEYBOARD ACCESSIBILITY ----------
(function() {
    document.querySelectorAll('.ministry-item, .program-card, .course-card, .book-card, .bulletin-item, .method-card, .account-card').forEach(card => {
        if (!card.getAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                if (this.classList.contains('bulletin-item')) {
                    const onclickAttr = this.getAttribute('onclick');
                    if (onclickAttr) {
                        eval(onclickAttr);
                    }
                }
            }
        });
    });
})();

// ---------- BACK TO TOP BUTTON ----------
(function() {
    let btn = document.querySelector('.back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ---------- DYNAMIC COPYRIGHT ----------
document.addEventListener('DOMContentLoaded', function() {
    const copyright = document.querySelector('.footer-bottom p');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.textContent = copyright.textContent.replace('2026', year);
    }
    console.log('🙏 Oasis of Hope Worship Centre - Website Loaded');
});

// ---------- PREVENT DOUBLE SUBMITS ----------
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const buttons = this.querySelectorAll('button[type="submit"]');
        buttons.forEach(btn => {
            btn.disabled = true;
            const originalText = btn.innerHTML;
            btn.setAttribute('data-original-text', originalText);
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = btn.getAttribute('data-original-text') || 'Submit';
            }, 5000);
        });
    });
});