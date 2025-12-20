// form.js - VERSIÓN ULTRA SIMPLE (SOLO validación básica)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 form.js cargado - VERSIÓN SIMPLE');
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) {
        console.error('❌ No se encontró el formulario');
        return;
    }
    
    // DESACTIVAR COMPLETAMENTE validación HTML
    contactForm.setAttribute('novalidate', 'novalidate');
    contactForm.noValidate = true;
    
    console.log('✅ Validación HTML desactivada');
    
    // Obtener inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Verificar inputs
    if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        console.error('❌ Faltan inputs');
        return;
    }
    
    console.log('✅ Todos los inputs encontrados');
    
    // FUNCIÓN: Validar nombre (MUY FLEXIBLE)
    function validateName() {
        const value = nameInput.value.trim();
        const errorDiv = document.getElementById('name-error');
        
        console.log(`🔍 Validando nombre: "${value}" (${value.length} caracteres)`);
        
        // Limpiar error primero
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            nameInput.classList.remove('border-red-500');
            nameInput.classList.add('border-gray-300', 'dark:border-gray-700');
        }
        
        // Validación MUY simple
        if (!value) {
            console.log('❌ Nombre vacío');
            if (errorDiv) {
                errorDiv.textContent = 'Por favor, escribe tu nombre';
                errorDiv.classList.remove('hidden');
                nameInput.classList.add('border-red-500');
            }
            return false;
        }
        
        // ACEPTA CUALQUIER COSA: 1 carácter, 100 caracteres, números, símbolos
        if (value.length >= 1) { // ¡Incluso 1 carácter es válido!
            console.log('✅ Nombre válido:', value);
            return true;
        }
        
        return false;
    }
    
    // FUNCIÓN: Validar email
    function validateEmail() {
        const value = emailInput.value.trim();
        const errorDiv = document.getElementById('email-error');
        
        // Limpiar error
        if (errorDiv) errorDiv.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
        
        if (!value) {
            if (errorDiv) {
                errorDiv.textContent = 'Por favor, escribe tu email';
                errorDiv.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
            }
            return false;
        }
        
        // Validación simple de email
        if (!value.includes('@') || !value.includes('.')) {
            if (errorDiv) {
                errorDiv.textContent = 'Por favor, escribe un email válido';
                errorDiv.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
            }
            return false;
        }
        
        return true;
    }
    
    // FUNCIÓN: Validar asunto
    function validateSubject() {
        const value = subjectInput.value.trim();
        const errorDiv = document.getElementById('subject-error');
        
        // Limpiar error
        if (errorDiv) errorDiv.classList.add('hidden');
        subjectInput.classList.remove('border-red-500');
        
        if (!value) {
            if (errorDiv) {
                errorDiv.textContent = 'Por favor, escribe un asunto';
                errorDiv.classList.remove('hidden');
                subjectInput.classList.add('border-red-500');
            }
            return false;
        }
        
        return true;
    }
    
    // FUNCIÓN: Validar mensaje
    function validateMessage() {
        const value = messageInput.value.trim();
        const errorDiv = document.getElementById('message-error');
        
        // Limpiar error
        if (errorDiv) errorDiv.classList.add('hidden');
        messageInput.classList.remove('border-red-500');
        
        if (!value) {
            if (errorDiv) {
                errorDiv.textContent = 'Por favor, escribe tu mensaje';
                errorDiv.classList.remove('hidden');
                messageInput.classList.add('border-red-500');
            }
            return false;
        }
        
        return true;
    }
    
    // FUNCIÓN: Validar TODO el formulario
    function validateAll() {
        console.log('=== VALIDANDO FORMULARIO ===');
        
        const nameValid = validateName();
        const emailValid = validateEmail();
        const subjectValid = validateSubject();
        const messageValid = validateMessage();
        
        const allValid = nameValid && emailValid && subjectValid && messageValid;
        
        console.log('Resultados:', {
            nombre: nameValid ? '✅' : '❌',
            email: emailValid ? '✅' : '❌',
            asunto: subjectValid ? '✅' : '❌',
            mensaje: messageValid ? '✅' : '❌',
            todo: allValid ? '✅ VÁLIDO' : '❌ INCOMPLETO'
        });
        
        return allValid;
    }
    
    // MANEJAR ENVÍO DEL FORMULARIO
    contactForm.addEventListener('submit', function(event) {
        console.log('🟡 Botón enviar presionado');
        
        // 1. Prevenir envío automático
        event.preventDefault();
        event.stopPropagation();
        
        console.log('🟡 Validando formulario...');
        
        // 2. Validar
        const isValid = validateAll();
        
        if (!isValid) {
            console.log('🔴 Formulario inválido - NO enviar');
            // Mostrar mensaje general
            const formStatus = document.getElementById('form-status');
            if (formStatus) {
                formStatus.textContent = 'Por favor, completa los campos marcados';
                formStatus.className = 'p-4 rounded-lg mt-4 bg-red-100 text-red-700 border border-red-300';
                formStatus.classList.remove('hidden');
            }
            return;
        }
        
        console.log('🟢 Formulario VÁLIDO - Enviando...');
        
        // 3. Deshabilitar botón y mostrar carga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        // Mostrar mensaje de envío
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
            formStatus.textContent = 'Enviando tu mensaje...';
            formStatus.className = 'p-4 rounded-lg mt-4 bg-blue-100 text-blue-700 border border-blue-300';
            formStatus.classList.remove('hidden');
        }
        
        // 4. Crear datos para enviar
        const formData = new FormData(contactForm);
        
        // 5. Enviar usando FormSubmit (Fetch API)
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('📨 Respuesta del servidor:', response.status);
            
            if (response.ok) {
                // ÉXITO: Redirigir a página de gracias
                console.log('✅ Mensaje enviado - Redirigiendo...');
                window.location.href = 'https://miltongtzz.github.io/portafolio/gracias.html';
            } else {
                // ERROR
                throw new Error('Error en el servidor: ' + response.status);
            }
        })
        .catch(error => {
            console.error('❌ Error al enviar:', error);
            
            // Mostrar error
            if (formStatus) {
                formStatus.textContent = 'Error al enviar. Intenta nuevamente.';
                formStatus.className = 'p-4 rounded-lg mt-4 bg-red-100 text-red-700 border border-red-300';
            }
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Intentar envío tradicional después de 2 segundos
            setTimeout(() => {
                console.log('🔄 Intentando envío tradicional...');
                contactForm.removeEventListener('submit', arguments.callee);
                contactForm.submit();
            }, 2000);
        });
    });
    
    console.log('✅ Formulario configurado correctamente');
    
    // DEBUG: Función para probar
    window.probarNombre = function(nombre) {
        nameInput.value = nombre || 'Test';
        console.log('🔍 Probando con nombre:', nameInput.value);
        validateName();
    };
});
