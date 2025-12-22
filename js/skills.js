// Enhanced Skills Animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    const learningCards = document.querySelectorAll('.learning-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Observer for skill items
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Add animation class
                    entry.target.classList.add('animate-in');
                    
                    // Animate icon
                    const icon = entry.target.querySelector('.skill-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1) rotate(0)';
                        icon.style.transitionDelay = '0.2s';
                    }
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observer for learning cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Animate icon
                    const icon = entry.target.querySelector('.learning-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1) rotate(0)';
                        icon.style.transitionDelay = '0.3s';
                    }
                    
                    // Animate level dots
                    const dots = entry.target.querySelectorAll('.level-dot');
                    dots.forEach((dot, dotIndex) => {
                        setTimeout(() => {
                            dot.classList.add('animate-dot');
                        }, 400 + (dotIndex * 100));
                    });
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Initialize animations
    function initSkillsAnimations() {
        // Set initial states
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            skillObserver.observe(item);
        });
        
        learningCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            cardObserver.observe(card);
        });
        
        // Animate skill categories
        const skillCategories = document.querySelectorAll('.skill-category, .skill-category-compact');
        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(30px)';
            category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            const categoryObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200);
                    }
                });
            }, observerOptions);
            
            categoryObserver.observe(category);
        });
    }
    
    // Handle color scheme changes
    document.addEventListener('colorschemechange', function(e) {
        // Re-trigger animations on color scheme change
        setTimeout(() => {
            skillItems.forEach(item => {
                item.classList.add('color-change');
                setTimeout(() => item.classList.remove('color-change'), 500);
            });
        }, 300);
    });
    
    // Add hover effects
    function addHoverEffects() {
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px) scale(1.02)';
                this.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
                this.style.zIndex = '1';
            });
        });
        
        learningCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            });
        });
    }
    
    // Skill progress animation (for any future progress bars)
    function animateProgressElements() {
        const progressElements = document.querySelectorAll('[data-progress]');
        
        progressElements.forEach(element => {
            const progress = element.getAttribute('data-progress') || '0';
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.width = `${progress}%`;
                        element.style.opacity = '1';
                    }
                });
            }, { threshold: 0.5 });
            
            element.style.width = '0%';
            element.style.opacity = '0.5';
            element.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
            observer.observe(element);
        });
    }
    
    // Initialize everything
    function initSkillsSystem() {
        initSkillsAnimations();
        addHoverEffects();
        animateProgressElements();
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            .animate-dot {
                animation: pulseDot 0.5s ease forwards;
            }
            
            .color-change {
                transition: background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes pulseDot {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.3);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Start the skills system
    initSkillsSystem();
    
    // Public API
    window.skillsSystem = {
        refreshAnimations: initSkillsAnimations,
        addHoverEffects: addHoverEffects
    };
});
