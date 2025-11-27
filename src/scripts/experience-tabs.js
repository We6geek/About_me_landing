// experience-tabs.js - полная версия с переключением табов и индикатором прокрутки
document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const tabsContainer = document.querySelector('.experience__tabs');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const tabs = document.querySelectorAll('.experience__tab');
    const panels = document.querySelectorAll('.experience__panel');
    
    if (!tabsContainer) return;

    // ===== ФУНКЦИОНАЛ ПЕРЕКЛЮЧЕНИЯ ТАБОВ =====
    function switchTab(tabName) {
        // Убираем активный класс у всех табов и панелей
        tabs.forEach(tab => tab.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Добавляем активный класс выбранному табу и соответствующей панели
        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedPanel = document.getElementById(`${tabName}-panel`);
        
        if (selectedTab) selectedTab.classList.add('active');
        if (selectedPanel) selectedPanel.classList.add('active');
    }

    // Добавляем обработчики кликов на табы
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // ===== ФУНКЦИОНАЛ ИНДИКАТОРА ПРОКРУТКИ =====
    function checkScrollability() {
        const isScrollable = tabsContainer.scrollWidth > tabsContainer.clientWidth;
        if (isScrollable) {
            tabsContainer.classList.add('scrollable');
        }
    }
    
    function updateScrollIndicator() {
        if (!scrollIndicator) return;
        
        const scrollLeft = tabsContainer.scrollLeft;
        const scrollWidth = tabsContainer.scrollWidth - tabsContainer.clientWidth;
        const dots = document.querySelectorAll('.scroll-indicator__dot');
        
        dots.forEach((dot, index) => {
            const dotPosition = index / (dots.length - 1);
            const scrollPercentage = scrollLeft / scrollWidth;
            
            if (scrollPercentage >= dotPosition - 0.25 && scrollPercentage <= dotPosition + 0.25) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Инициализация
    checkScrollability();
    updateScrollIndicator();
    
    // Слушатели событий
    tabsContainer.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', checkScrollability);
});