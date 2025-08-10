// Animación de sobre al inicio
window.addEventListener('DOMContentLoaded', function() {
    var overlay = document.getElementById('envelope-overlay');
    if (overlay) {
        setTimeout(function() {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 700);
        }, 2200);
    }
});
// Funcionalidades interactivas para la invitación de casamiento

document.addEventListener('DOMContentLoaded', function() {
    
    // Configuración de la fecha del evento
    const weddingDate = new Date('2025-12-05T19:00:00');
    
    // Números de WhatsApp (cambiar por los números reales)
    const whatsappConfirm = '5492646275358'; // Número para confirmar asistencia
    
    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate.getTime() - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
    
    // Actualizar contador cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Animación de entrada suave para las secciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a todas las secciones
    const sections = document.querySelectorAll('section, .header');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });


    // Copiar Alias o CBU individualmente
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.getAttribute('data-copy');
            navigator.clipboard.writeText(value).then(() => {
                // Mostrar confirmación visual
                this.classList.add('copied');
                const originalHTML = this.innerHTML;
                this.innerHTML = '<span style="color:#28a745;font-size:1.1em;">✓</span>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('copied');
                }, 1200);
            });
        });
    });

   

    // Efecto parallax suave en el scroll
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floral-left-img, .floral-right-img');
        
        parallaxElements.forEach((element, index) => {
            const speed = index % 2 === 0 ? 0.3 : -0.2;
            element.style.transform += ` translateY(${scrolled * speed}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });


    // Smooth scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de brillo en los nombres al pasar el mouse
    const names = document.querySelectorAll('.name');
    names.forEach(name => {
        name.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(139, 79, 107, 0.8), 2px 2px 4px rgba(0,0,0,0.1)';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        name.addEventListener('mouseleave', function() {
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
            this.style.transform = 'scale(1)';
        });
    });

    // Animación especial para el contador
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.addEventListener('animationend', function() {
            this.style.animation = 'none';
        });
    });

    // Agregar estilo de animación para números que cambian
    const countdownStyle = document.createElement('style');
    countdownStyle.textContent = `
        @keyframes numberChange {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); color: #d4a574; }
            100% { transform: scale(1); }
        }
        .countdown-number.animate {
            animation: numberChange 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(countdownStyle);

    // Detectar cambios en el contador para animar
    let lastDays = 0, lastHours = 0, lastMinutes = 0, lastSeconds = 0;
    
    function animateCountdownChange() {
        const days = parseInt(document.getElementById('days').textContent);
        const hours = parseInt(document.getElementById('hours').textContent);
        const minutes = parseInt(document.getElementById('minutes').textContent);
        
        if (days !== lastDays) {
            document.getElementById('days').classList.add('animate');
            setTimeout(() => document.getElementById('days').classList.remove('animate'), 500);
        }
        if (hours !== lastHours) {
            document.getElementById('hours').classList.add('animate');
            setTimeout(() => document.getElementById('hours').classList.remove('animate'), 500);
        }
        if (minutes !== lastMinutes) {
            document.getElementById('minutes').classList.add('animate');
            setTimeout(() => document.getElementById('minutes').classList.remove('animate'), 500);
        }
        
        lastDays = days;
        lastHours = hours;
        lastMinutes = minutes;
    }

    // Verificar cambios en contador cada segundo
    setInterval(animateCountdownChange, 1000);
});
    