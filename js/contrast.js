// contrast.js - Mejora de contraste para modo claro
export function improveLightModeContrast() {
    if (!document.body.classList.contains('dark-mode')) {
        document.body.classList.add('light-mode-enhanced');
        
        // Mejorar textos específicos
        const elements = document.querySelectorAll(
            '.text-gray-400, .text-gray-500, .text-gray-600, ' +
            '[class*="text-opacity-"], ' +
            '.opacity-70, .opacity-60, .opacity-50'
        );
        
        elements.forEach(el => {
            // Para clases de gray
            if (el.classList.contains('text-gray-400')) {
                el.classList.replace('text-gray-400', 'text-gray-600');
            } else if (el.classList.contains('text-gray-500')) {
                el.classList.replace('text-gray-500', 'text-gray-700');
            } else if (el.classList.contains('text-gray-600')) {
                el.classList.replace('text-gray-600', 'text-gray-800');
            }
            
            // Para opacidades bajas
            if (el.classList.contains('opacity-50')) {
                el.classList.replace('opacity-50', 'opacity-80');
            } else if (el.classList.contains('opacity-60')) {
                el.classList.replace('opacity-60', 'opacity-90');
            } else if (el.classList.contains('opacity-70')) {
                el.classList.replace('opacity-70', 'opacity-95');
            }
        });
    } else {
        document.body.classList.remove('light-mode-enhanced');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    improveLightModeContrast();
    
    // Observar cambios en el tema
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && 
                (mutation.target.classList.contains('dark-mode') || 
                 !mutation.target.classList.contains('dark-mode'))) {
                improveLightModeContrast();
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Escuchar evento personalizado
    document.addEventListener('colorschemechange', improveLightModeContrast);
});
