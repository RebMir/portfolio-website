// Portfolio JavaScript - Rebeccah Miruka
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES =====
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const currentYear = document.getElementById('current-year');
    const viewArchitectureBtn = document.querySelector('.view-architecture');
    const architectureModal = document.querySelector('.architecture-modal');
    const closeModalBtn = document.querySelector('.btn-close-modal');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    
    // ===== CURRENT YEAR =====
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // ===== NAVIGATION FUNCTIONS =====
    // Toggle mobile navigation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Show/hide back to top button
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== BACK TO TOP =====
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== ANIMATED COUNTERS =====
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        const duration = 2000; // 2 seconds
                        const step = target / (duration / 16); // 60fps
                        let current = 0;
                        
                        const counter = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                stat.textContent = target;
                                clearInterval(counter);
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }, 16);
                    });
                    
                    // Stop observing after animation starts
                    observer.disconnect();
                }
            });
        }, observerOptions);
        
        observer.observe(document.querySelector('.hero-stats'));
    }
    
    // ===== PROJECT ARCHITECTURE MODAL =====
    if (viewArchitectureBtn && architectureModal && closeModalBtn) {
        // Open modal
        viewArchitectureBtn.addEventListener('click', function() {
            architectureModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        closeModalBtn.addEventListener('click', function() {
            architectureModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        architectureModal.addEventListener('click', function(e) {
            if (e.target === architectureModal) {
                architectureModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && architectureModal.classList.contains('active')) {
                architectureModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ===== CONTACT FORM HANDLING =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (in a real app, you'd send to a server)
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // In a real implementation, you would send data to your backend:
            /*
            fetch('your-backend-endpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showNotification('Error sending message. Please try again.', 'error');
            });
            */
        });
    }
    
    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left: 4px solid #48bb78;
        }
        
        .notification.error {
            border-left: 4px solid #e53e3e;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: #48bb78;
        }
        
        .notification.error i {
            color: #e53e3e;
        }
        
        .notification span {
            flex-grow: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 0.2rem;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            background: #f1f1f1;
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
                transform: translateY(-150%);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const targetPosition = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== PROJECT CARD HOVER EFFECTS =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ===== SKILL TAGS ANIMATION =====
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== INITIAL ACTIVE NAV LINK =====
    updateActiveNavLink();
    
    // ===== CONSOLE GREETING =====
    console.log('%c👋 Hello! Welcome to Rebeccah Miruka\'s Portfolio', 'color: #FF9900; font-size: 16px; font-weight: bold;');
    console.log('%cAWS Certified Cloud Practitioner | Cloud Solutions Enthusiast', 'color: #0073bb; font-size: 14px;');
    console.log('%cPortfolio built with AWS services | Open to opportunities', 'color: #232f3e; font-size: 12px;');
});

// ===== NOTIFICATION FUNCTION (Moved outside DOMContentLoaded for global access) =====
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// ===== COPY CREDENTIAL ID FUNCTION =====
function copyCredentialId() {
    const credentialIdElement = document.getElementById('credentialId');
    if (!credentialIdElement) {
        console.error('Credential ID element not found');
        return;
    }
    
    const credentialId = credentialIdElement.textContent.trim();
    
    // Use the Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(credentialId)
            .then(() => {
                // Show success feedback
                const copyBtn = document.querySelector('.copy-btn');
                if (copyBtn) {
                    const originalIcon = copyBtn.querySelector('i');
                    const originalClass = originalIcon.className;
                    
                    // Change icon to checkmark
                    originalIcon.className = 'fas fa-check';
                    copyBtn.style.background = '#48bb78';
                    
                    // Reset icon after 2 seconds
                    setTimeout(() => {
                        originalIcon.className = originalClass;
                        copyBtn.style.background = '';
                    }, 2000);
                }
                
                // Show notification
                showNotification('Credential ID copied to clipboard!', 'success');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                showNotification('Failed to copy. Please try again.', 'error');
            });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = credentialId;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                // Show success feedback
                const copyBtn = document.querySelector('.copy-btn');
                if (copyBtn) {
                    const originalIcon = copyBtn.querySelector('i');
                    const originalClass = originalIcon.className;
                    
                    // Change icon to checkmark
                    originalIcon.className = 'fas fa-check';
                    copyBtn.style.background = '#48bb78';
                    
                    // Reset icon after 2 seconds
                    setTimeout(() => {
                        originalIcon.className = originalClass;
                        copyBtn.style.background = '';
                    }, 2000);
                }
                
                showNotification('Credential ID copied to clipboard!', 'success');
            } else {
                showNotification('Failed to copy. Please try again.', 'error');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            showNotification('Failed to copy. Please try again.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}