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