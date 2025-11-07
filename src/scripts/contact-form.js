class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('.form__submit');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }
    
    setupValidation() {
        const inputs = this.form.querySelectorAll('.form__input, .form__textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateField(field) {
        const errorElement = field.parentNode.querySelector('.form__error');
        
        // Очищаем предыдущие ошибки
        this.clearError(field);
        
        // Проверка обязательных полей
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showError(field, 'This field is required');
            return false;
        }
        
        // Проверка email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    showError(field, message) {
        field.style.borderColor = '#ff6b6b';
        const errorElement = field.parentNode.querySelector('.form__error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    clearError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.form__error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('.form__input, .form__textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        this.setLoadingState(true);
        
        try {
            // Здесь будет отправка на сервер
            // Пока просто имитируем успешную отправку
            await this.sendFormData();
            
            this.showSuccessMessage();
            
        } catch (error) {
            this.showError('Sorry, there was an error sending your message. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }
    
    async sendFormData() {
        // Имитация отправки данных
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
        
        // В  приложении:
        /*
        const formData = new FormData(this.form);
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
        */
    }
    
    showSuccessMessage() {
        const successHTML = `
            <div class="form-success">
                <div class="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. I'll get back to you as soon as possible.</p>
            </div>
        `;
        
        this.form.innerHTML = successHTML;
    }
    
    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.cssText = `
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid #ff6b6b;
            color: #ff6b6b;
            padding: 12px 16px;
            border-radius: 4px;
            margin-bottom: 20px;
            font-family: 'SF Mono';
            font-size: 14px;
        `;
        errorElement.textContent = message;
        
        this.form.insertBefore(errorElement, this.form.firstChild);
        
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});