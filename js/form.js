// form.js - COMPLETO para FormSubmit
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) return;
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    function validateField(e) {
        const field = e.target;
        const errorSpan = document.getElementById(`${field.id}-error`);
        
        if (!field.value.trim()) {
            showError(field, errorSpan, 'Este campo es requerido');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(field, errorSpan, 'Por favor ingresa un email válido');
            return false;
        }
        
        if (field.minLength && field.value.length < field.minLength) {
            showError(field, errorSpan, `Mínimo ${field.minLength} caracteres`);
            return false;
        }
        
        clearError(field, errorSpan);
        return true;
    }
    
    function showError(field, errorSpan, message) {
        field.classList.add('border-red-500', 'focus:ring-red-500');
        field.classList.remove('border-border', 'focus:ring-primary');
        
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.remove('hidden');
        }
    }
    
    function clearError(field, errorSpan) {
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-border', 'focus:ring-primary');
        
        if (errorSpan) {
            errorSpan.classList.add('hidden');
        }
    }
    
    function clearFieldError(e) {
        const field = e.target;
        const errorSpan = document.getElementById(`${field.id}-error`);
        clearError(field, errorSpan);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Validación antes de enviar (FormSubmit maneja el envío real)
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        inputs.forEach(input => {
            const event = new Event('blur');
            input.dispatchEvent(event);
            if (input.classList.contains('border-red-500')) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showStatus('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        // Si pasa validación, FormSubmit se encarga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showStatus('Redirigiendo a confirmación...', 'info');
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 5000);
    });
    
    function showStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'mt-4 p-4 rounded-lg block';
        
        switch(type) {
            case 'success':
                formStatus.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300');
                break;
            case 'error':
                formStatus.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300');
                break;
            case 'info':
                formStatus.classList.add('bg-blue-100', 'text-blue-700', 'border', 'border-blue-300');
                break;
        }
        
        formStatus.classList.remove('hidden');
    }
});
