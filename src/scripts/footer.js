class Footer {
    constructor() {
        this.currentYearElement = document.getElementById('current-year');
        this.scrollTopButton = document.getElementById('scroll-top');
        this.init();
    }
    
    init() {
        this.setCurrentYear();
        this.setupScrollTop();
        this.setupScrollIndicator();
    }
    
    setCurrentYear() {
        if (this.currentYearElement) {
            const currentYear = new Date().getFullYear();
            this.currentYearElement.textContent = currentYear;
        }
    }
    
    setupScrollTop() {
        if (!this.scrollTopButton) return;
        
        this.scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            this.toggleScrollTopButton();
        });
    }
    
    toggleScrollTopButton() {
        if (!this.scrollTopButton) return;
        
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition > 500) {
            this.scrollTopButton.style.opacity = '1';
            this.scrollTopButton.style.visibility = 'visible';
            this.scrollTopButton.style.transform = 'translateY(0)';
        } else {
            this.scrollTopButton.style.opacity = '0';
            this.scrollTopButton.style.visibility = 'hidden';
            this.scrollTopButton.style.transform = 'translateY(10px)';
        }
    }
    
    setupScrollIndicator() {
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'scroll-progress';
        progressIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, $green, #64d8ff);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressIndicator);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressIndicator.style.width = scrolled + '%';
        });
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
});