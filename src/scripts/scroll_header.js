class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        this.isHidden = false;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Определяем направление скролла
        const scrollingDown = scrollTop > this.lastScrollTop;
        const scrollingUp = scrollTop < this.lastScrollTop;
        
        // Если скроллим вниз и проскроллили больше порога - скрываем header
        if (scrollingDown && scrollTop > this.scrollThreshold && !this.isHidden) {
            this.hideHeader();
        } 
        // Если скроллим вверх - показываем header
        else if (scrollingUp && this.isHidden) {
            this.showHeader();
        }
        
        // Добавляем/убираем стиль для скролла (уменьшенный header)
        if (scrollTop > 50) {
            this.header.classList.add('header--scrolled');
        } else {
            this.header.classList.remove('header--scrolled');
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    hideHeader() {
        this.header.classList.add('header--hidden');
        this.isHidden = true;
    }
    
    showHeader() {
        this.header.classList.remove('header--hidden');
        this.isHidden = false;
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new HeaderScroll();
});