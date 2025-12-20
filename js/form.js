// form.js - VERSIÓN FINAL CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) return;
    
    // Elementos del formulario
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // Objeto para rastrear interacción del usuario
    const userInteracted = {
        name: false,
        email: false,
        subject: false,
        message: false
    };
    
    // Inicializar: ocultar todos los mensajes de error
    function initializeForm() {
        Object.keys(inputs).forEach(key => {
            const errorDiv = document.getElementById(`${key}-error`);
            if (errorDiv) {
                errorDiv.classList.add('hidden');
                errorDiv.style.display = 'none'; // Forzar ocultar
            }
            
            // Limpiar estilos de error
            const input = inputs[key];
            if (input) {
                input.classList.remove('border-red-500', 'focus:ring-red-500');
                input.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
            }
        });
        
        if (formStatus) {
            formStatus.classList.add('hidden');
            formStatus.style.display = 'none';
        }
    }
    
    // Configurar eventos para cada campo
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (!input) return;
        
        const errorDiv = document.getElementById(`${key}-error`);
        
        // Focus: marcar como interactuado y ocultar placeholder
        input.addEventListener('focus', function() {
            userInteracted[key] = true;
            this.dataset.placeholder = this.placeholder;
            this.placeholder = '';
        });
        
        // Blur: restaurar placeholder si está vacío
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.placeholder = this.dataset.placeholder || '';
            }
        });
        
        // Input: limpiar error cuando el usuario escribe
        input.addEventListener('input', function() {
            userInteracted[key] = true;
            clearError(input, errorDiv);
        });
        
        // Blur: validar solo si el usuario ha interactuado
        input.addEventListener('blur', function() {
            if (userInteracted[key]) {
                validateSingleField(input, key);
            }
        });
    });
    
    // Validar un solo campo
    function validateSingleField(field, fieldName) {
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        // Si el campo está vacío Y el usuario ha interactuado
        if (!field.value.trim() && userInteracted[fieldName]) {
            showError(field, errorDiv, 'Este campo es requerido');
            return false;
        }
        
        // Validaciones específicas solo si hay contenido
        if (field.value.trim()) {
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, errorDiv, 'Por favor ingresa un email válido');
                return false;
            }
            
            if (field.minLength && field.value.length < field.minLength) {
                showError(field, errorDiv, `Mínimo ${field.minLength} caracteres`);
                return false;
            }
        }
        
        clearError(field, errorDiv);
        return true;
    }
    
    // Mostrar error
    function showError(field, errorDiv, message) {
        if (!field || !errorDiv) return;
        
        field.classList.add('border-red-500', 'focus:ring-red-500');
        field.classList.remove('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
        
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.style.display = 'block';
    }
    
    // Limpiar error
    function clearError(field, errorDiv) {
        if (!field) return;
        
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
        
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            errorDiv.style.display = 'none';
        }
    }
    
    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validar TODO el formulario
    function validateForm() {
        let isValid = true;
        let firstErrorField = null;
        
        Object.keys(inputs).forEach(key => {
            // Forzar validación al enviar
            userInteracted[key] = true;
            
            if (!validateSingleField(inputs[key], key)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = inputs[key];
                }
            }
        });
        
        return { isValid, firstErrorField };
    }
    
    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        // Validar primero
        const validation = validateForm();
        
        if (!validation.isValid) {
            e.preventDefault(); // Prevenir envío solo si hay errores
            showStatus('Por favor, completa todos los campos requeridos', 'error');
            
            // Enfocar el primer campo con error
            if (validation.firstErrorField) {
                validation.firstErrorField.focus();
            }
            
            return;
        }
        
        // Si pasa validación, permitir que FormSubmit haga su trabajo
        // Solo mostrar estado de carga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showStatus('Enviando tu mensaje...', 'info');
        
        // Restaurar botón después de 8 segundos (por si hay error)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (formStatus) {
                formStatus.classList.add('hidden');
                formStatus.style.display = 'none';
            }
        }, 8000);
    });
    
    // Mostrar mensaje de estado
    function showStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'p-4 rounded-lg mt-4';
        
        // Colores según tipo
        const typeClasses = {
            success: 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/30 dark:text-green-300',
            error: 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/30 dark:text-red-300',
            info: 'bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-300'
        };
        
        formStatus.className = `p-4 rounded-lg mt-4 ${typeClasses[type]}`;
        formStatus.classList.remove('hidden');
        formStatus.style.display = 'block';
        
        // Ocultar mensaje después de 5 segundos
        if (type !== 'success') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    // Inicializar el formulario cuando carga la página
    initializeForm();
    
    // Agregar CSS para forzar que errores estén ocultos inicialmente
    const style = document.createElement('style');
    style.textContent = `
        #name-error, #email-error, #subject-error, #message-error {
            display: none !important;
        }
        #form-status {
            display: none;
        }
    `;
    document.head.appendChild(style);
});
