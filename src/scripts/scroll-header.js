class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        this.isHidden = false;
        
        console.log('HeaderScroll initialized', this.header); // Отладка
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        console.log('Scroll listener added'); // Отладка
    }
    
    handleScroll() {
        // Если открыто мобильное меню - не обрабатываем скролл
        if (document.body.classList.contains('menu-open')) {
            return;
        }
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Отладка
        console.log('Scroll detected:', {
            scrollTop,
            lastScrollTop: this.lastScrollTop,
            isHidden: this.isHidden,
            scrollingDown: scrollTop > this.lastScrollTop,
            scrollingUp: scrollTop < this.lastScrollTop
        });
        
        // Определяем направление скролла
        const scrollingDown = scrollTop > this.lastScrollTop;
        const scrollingUp = scrollTop < this.lastScrollTop;
        
        // Если скроллим вниз и проскроллили больше порога - скрываем header
        if (scrollingDown && scrollTop > this.scrollThreshold && !this.isHidden) {
            console.log('Hiding header'); // Отладка
            this.hideHeader();
        } 
        // Если скроллим вверх - показываем header
        else if (scrollingUp && this.isHidden) {
            console.log('Showing header'); // Отладка
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

class MobileMenu {
    constructor() {
        this.burger = document.querySelector('.burger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.body = document.body;
        
        console.log('MobileMenu initialized', { // Отладка
            burger: this.burger,
            mobileMenu: this.mobileMenu
        });
        
        this.init();
    }
    
    init() {
        if (!this.burger || !this.mobileMenu) {
            console.error('Burger or mobile menu element not found!');
            return;
        }
        
        this.burger.addEventListener('click', () => this.toggleMenu());
        
        // Закрытие меню при клике на ссылку
        const mobileLinks = document.querySelectorAll('.mobile-menu__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Закрытие меню при клике вне его области
        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileMenu) {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.body.classList.contains('menu-open')) {
                this.closeMenu();
            }
        });
        
        // Закрытие меню при изменении размера окна (на десктоп)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.body.classList.contains('menu-open')) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.burger.classList.toggle('active');
        this.mobileMenu.classList.toggle('mobile-menu--open');
        this.body.classList.toggle('menu-open');
        
        // Создаем оверлей если его нет
        if (!document.querySelector('.mobile-overlay')) {
            this.createOverlay();
        } else {
            document.querySelector('.mobile-overlay').classList.toggle('mobile-overlay--active');
        }
    }
    
    closeMenu() {
        this.burger.classList.remove('active');
        this.mobileMenu.classList.remove('mobile-menu--open');
        this.body.classList.remove('menu-open');
        
        const overlay = document.querySelector('.mobile-overlay');
        if (overlay) {
            overlay.classList.remove('mobile-overlay--active');
            // Удаляем оверлей после анимации
            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay mobile-overlay--active';
        overlay.addEventListener('click', () => this.closeMenu());
        document.body.appendChild(overlay);
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing scripts'); // Отладка
    new HeaderScroll();
    new MobileMenu();
});