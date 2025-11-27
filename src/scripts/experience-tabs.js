class ExperienceTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.experience__tab');
        this.panels = document.querySelectorAll('.experience__panel');
        this.init();
    }
    
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
        
        // Активируем первый таб по умолчанию
        if (this.tabs.length > 0) {
            this.switchTab(this.tabs[0].getAttribute('data-tab'));
        }
    }
    
    switchTab(targetTab) {
        // Убираем активный класс со всех табов
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Скрываем все панели
        this.panels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Активируем выбранный таб
        const activeTab = document.querySelector(`[data-tab="${targetTab}"]`);
        const activePanel = document.getElementById(`${targetTab}-panel`);
        
        if (activeTab && activePanel) {
            activeTab.classList.add('active');
            
            // Добавляем небольшую задержку для плавной анимации
            setTimeout(() => {
                activePanel.classList.add('active');
            }, 50);
        }
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new ExperienceTabs();
});

// Добавьте этот код в существующий файл experience-tabs.js
document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.querySelector('.experience__tabs');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const dots = document.querySelectorAll('.scroll-indicator__dot');
    
    if (!tabsContainer) return;
    
    // Проверяем, нужен ли скролл
    function checkScrollability() {
        const isScrollable = tabsContainer.scrollWidth > tabsContainer.clientWidth;
        
        if (isScrollable) {
            tabsContainer.classList.add('scrollable');
            
            // Добавляем анимацию подсказки при первом посещении
            if (!sessionStorage.getItem('scrollHintShown')) {
                setTimeout(() => {
                    tabsContainer.classList.add('hint-animation');
                    sessionStorage.setItem('scrollHintShown', 'true');
                    
                    // Убираем анимацию после завершения
                    setTimeout(() => {
                        tabsContainer.classList.remove('hint-animation');
                    }, 7000);
                }, 1000);
            }
        }
    }
    
    // Обновляем индикатор прокрутки
    function updateScrollIndicator() {
        const scrollLeft = tabsContainer.scrollLeft;
        const scrollWidth = tabsContainer.scrollWidth - tabsContainer.clientWidth;
        const scrollPercentage = scrollLeft / scrollWidth;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            const dotPosition = index / (dots.length - 1);
            if (scrollPercentage >= dotPosition - 0.25 && scrollPercentage <= dotPosition + 0.25) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Скрываем индикатор когда доскроллили до конца
        if (scrollLeft >= scrollWidth - 10) {
            scrollIndicator.style.opacity = '0.3';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
    
    // Инициализация
    checkScrollability();
    updateScrollIndicator();
    
    // Слушаем события
    tabsContainer.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', checkScrollability);
    
    // Добавляем интерактивность для индикатора
    scrollIndicator.addEventListener('click', function() {
        const scrollAmount = tabsContainer.clientWidth * 0.8;
        tabsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Показываем/скрываем индикатор при hover
    tabsContainer.addEventListener('mouseenter', function() {
        scrollIndicator.style.opacity = '1';
    });
    
    tabsContainer.addEventListener('mouseleave', function() {
        if (tabsContainer.scrollLeft < tabsContainer.scrollWidth - tabsContainer.clientWidth - 10) {
            scrollIndicator.style.opacity = '1';
        }
    });
});