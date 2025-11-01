class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.fade-in');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Element visible:', entry.target); // Для отладки
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Срабатывает когда 20% элемента видно
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});