class HorizontalSnapScroll {
    constructor() {
        this.sections = document.querySelectorAll('main > section');
        this.dots = document.querySelectorAll('.section-dot');
        this.container = document.querySelector('.snap-scroll-container');
        this.progressBar = document.querySelector('.slide-progress-bar');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.currentSlide = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        this.setupInitialState();
        this.addEventListeners();
        this.updateActiveDot(0);
        this.updateProgress();
        this.setupIntersectionObserver();
    }
    
    setupInitialState() {
        this.sections.forEach((section, index) => {
            if (index === 0) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    addEventListeners() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToSlide(index);
            });
        });
        
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.scrollToSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.scrollToSlide(this.sections.length - 1);
            }
        });
        
        this.setupWheelBehavior();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Array.from(this.sections).indexOf(entry.target);
                        this.currentSlide = index;
                        this.updateActiveDot(index);
                        this.updateProgress();
                        this.activateSlideContent(entry.target);
                    }
                });
            },
            {
                threshold: 0.7,
                root: this.container
            }
        );
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    scrollToSlide(index) {
        if (index < 0) index = 0;
        if (index >= this.sections.length) index = this.sections.length - 1;
        
        if (this.isScrolling || index === this.currentSlide) return;
        
        this.isScrolling = true;
        
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        this.sections[index].classList.add('active');
        
        this.sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
        
        this.currentSlide = index;
        this.updateActiveDot(index);
        this.updateProgress();
        this.activateSlideContent(this.sections[index]);
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }
    
    nextSlide() {
        if (this.currentSlide < this.sections.length - 1) {
            this.scrollToSlide(this.currentSlide + 1);
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.scrollToSlide(this.currentSlide - 1);
        }
    }
    
    updateActiveDot(index) {
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
    }
    
    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.sections.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    activateSlideContent(section) {
        this.sections.forEach(s => {
            const contentElements = s.querySelectorAll('.slide-content');
            contentElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
            });
        });
        
        setTimeout(() => {
            const contentElements = section.querySelectorAll('.slide-content');
            contentElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 100);
    }
    
    
    setupWheelBehavior() {
        
        let isScrollingVertically = false;
        let verticalScrollTimer = null;
        
        this.sections.forEach(section => {
            const content = section.querySelector('.section-content');
            if (content) {
                content.addEventListener('wheel', (e) => {
                    isScrollingVertically = true;
                    
                    clearTimeout(verticalScrollTimer);
                    verticalScrollTimer = setTimeout(() => {
                        isScrollingVertically = false;
                    }, 100);
                }, { passive: true });
            }
        });
        
        this.container.addEventListener('wheel', (e) => {
            if (isScrollingVertically) return;
            
            e.preventDefault();
        }, { passive: false });
    }
    
    goToSlide(index) {
        this.scrollToSlide(index);
    }
    
    next() {
        this.nextSlide();
    }
    
    prev() {
        this.prevSlide();
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
}

function scrollToSection(sectionId) {
    const sections = ['hero', 'about', 'experience', 'work', 'contact'];
    const index = sections.indexOf(sectionId);
    if (index !== -1 && window.horizontalSnap) {
        window.horizontalSnap.goToSlide(index);
    }
}

function nextSlide() {
    if (window.horizontalSnap) {
        window.horizontalSnap.next();
    }
}

function prevSlide() {
    if (window.horizontalSnap) {
        window.horizontalSnap.prev();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.horizontalSnap = new HorizontalSnapScroll();
});

window.addEventListener('resize', () => {
    if (window.horizontalSnap) {
        window.horizontalSnap.goToSlide(window.horizontalSnap.getCurrentSlide());
    }
});

document.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('DOMContentLoaded', () => {
    const headerLinks = document.querySelectorAll('.header__link');
    
    headerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            const mobileMenu = document.querySelector('.mobile-menu');
            const burger = document.querySelector('.burger');
            mobileMenu.classList.remove('mobile-menu--open');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
});

class MobileMenu {
    constructor() {
        this.burger = document.querySelector('.header__burger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.overlay = document.querySelector('.mobile-overlay');
        
        this.init();
    }
    
    init() {
        this.burger.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }
    }
    
    toggleMenu() {
        const burgerIcon = this.burger.querySelector('.burger');
        this.mobileMenu.classList.toggle('mobile-menu--open');
        burgerIcon.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (this.overlay) {
            this.overlay.classList.toggle('mobile-overlay--active');
        }
    }
    
    closeMenu() {
        const burgerIcon = this.burger.querySelector('.burger');
        this.mobileMenu.classList.remove('mobile-menu--open');
        burgerIcon.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        if (this.overlay) {
            this.overlay.classList.remove('mobile-overlay--active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});