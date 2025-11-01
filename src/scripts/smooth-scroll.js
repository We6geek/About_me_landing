class SmoothScroll {
    constructor() {
        this.headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        this.scrollDuration = 1500;
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
    }
    
    // Убираем метод setupNavLinks, так как он больше не нужен
    // Основная логика теперь в общем обработчике кликов
    
    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) {
            console.warn(`Section with id "${sectionId}" not found`);
            return;
        }
        
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
        return this.headerHeight + 20;
    }
    
    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        // Если расстояние очень маленькое, скроллим нативно
        if (Math.abs(distance) < 100) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            return;
        }
        
        const startTime = performance.now();
        
        const animation = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.scrollDuration, 1);
            
            const easeProgress = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * easeProgress));
            
            if (timeElapsed < this.scrollDuration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // Остальные методы остаются без изменений
    easeInOutQuart(t) {
        return t < 0.5 
            ? 8 * t * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }
    
    easeInOutExpo(t) {
        return t === 0 
            ? 0 
            : t === 1 
            ? 1 
            : t < 0.5 
            ? Math.pow(2, 20 * t - 10) / 2 
            : (2 - Math.pow(2, -20 * t + 10)) / 2;
    }
    
    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - this.headerHeight - offset;
        this.smoothScrollTo(offsetPosition);
    }
    
    scrollToCenter(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const elementRect = targetSection.getBoundingClientRect();
        const elementAbsoluteTop = window.pageYOffset + elementRect.top;
        const elementHeight = elementRect.height;
        const windowHeight = window.innerHeight;
        
        const scrollTo = elementAbsoluteTop - (windowHeight / 2) + (elementHeight / 2) - this.headerHeight;
        
        this.smoothScrollTo(scrollTo);
        history.pushState(null, null, `#${sectionId}`);
    }
    
    setScrollDuration(duration) {
        this.scrollDuration = duration;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
});