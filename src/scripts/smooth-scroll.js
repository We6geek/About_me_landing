class SmoothScroll {
    constructor() {
        this.headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        this.scrollDuration = 1500; // Увеличиваем длительность скролла (в миллисекундах)
        this.init();
    }
    
    init() {
        // Обработка кликов по ссылкам с якорями
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            }
        });
        
        // Обработка навигационных ссылок
        this.setupNavLinks();
    }
    
    setupNavLinks() {
        const navLinks = document.querySelectorAll('.header__link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.closest('a').getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    this.scrollToSection(targetId);
                }
            });
        });
    }
    
    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const targetPosition = this.calculateTargetPosition(targetSection);
        this.smoothScrollTo(targetPosition);
        
        // Обновляем URL без перезагрузки страницы
        history.pushState(null, null, `#${sectionId}`);
    }
    
    calculateTargetPosition(targetElement) {
        const elementRect = targetElement.getBoundingClientRect();
        const elementAbsoluteTop = window.pageYOffset + elementRect.top;
        return elementAbsoluteTop - this.calculateOffset();
    }
    
    calculateOffset() {
        // Учитываем высоту header'а и добавляем небольшой отступ
        return this.headerHeight + 20;
    }
    
    // Кастомная функция плавного скролла с контролем скорости
    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        
        // Функция анимации
        const animation = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.scrollDuration, 1);
            
            // easing function для более плавного движения
            const easeProgress = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * easeProgress));
            
            if (timeElapsed < this.scrollDuration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    // Easing функция для плавного ускорения и замедления
    easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // Альтернативные easing функции (можно экспериментировать)
    
    // Более медленное начало и конец
    easeInOutQuart(t) {
        return t < 0.5 
            ? 8 * t * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }
    
    // Очень плавное движение
    easeInOutExpo(t) {
        return t === 0 
            ? 0 
            : t === 1 
            ? 1 
            : t < 0.5 
            ? Math.pow(2, 20 * t - 10) / 2 
            : (2 - Math.pow(2, -20 * t + 10)) / 2;
    }
    
    // Метод для скролла к конкретному элементу
    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - this.headerHeight - offset;
        this.smoothScrollTo(offsetPosition);
    }
    
    // Метод для скролла точно в центр viewport
    scrollToCenter(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const elementRect = targetSection.getBoundingClientRect();
        const elementAbsoluteTop = window.pageYOffset + elementRect.top;
        const elementHeight = elementRect.height;
        const windowHeight = window.innerHeight;
        
        // Вычисляем позицию для центрирования элемента
        const scrollTo = elementAbsoluteTop - (windowHeight / 2) + (elementHeight / 2) - this.headerHeight;
        
        this.smoothScrollTo(scrollTo);
        history.pushState(null, null, `#${sectionId}`);
    }
    
    // Метод для изменения скорости скролла
    setScrollDuration(duration) {
        this.scrollDuration = duration;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const smoothScroll = new SmoothScroll();
    
    // Опционально: можно изменить скорость после инициализации
    // smoothScroll.setScrollDuration(2000); // Еще медленнее
    
    window.smoothScroll = smoothScroll; // Делаем доступным глобально для отладки
});