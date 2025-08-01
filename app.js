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
    const whatsappConfirm = '5492644000000'; // Número para confirmar asistencia
    const whatsappMusic = '5492644000000';   // Número para recomendar música
    
    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate.getTime() - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
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

    // Funcionalidad del botón de play
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Placeholder para video
            alert('¡Pronto podrás ver nuestro video especial!');
        });
    }

    // Botón para confirmar asistencia
    const confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            const message = '¡Hola! Quiero confirmar mi asistencia al casamiento de Willy y Noe el 5 de Diciembre de 2025 a las 19:00hs en El Horizonte. ¡Nos vemos ahí! 💕';
            const whatsappUrl = `https://wa.me/${whatsappConfirm}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Botón para recomendar música
    const musicButton = document.getElementById('musicButton');
    if (musicButton) {
        musicButton.addEventListener('click', function() {
            const message = '¡Hola! Quiero recomendar música para el casamiento de Willy y Noe. Mi sugerencia es: ';
            const whatsappUrl = `https://wa.me/${whatsappMusic}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Copiar información bancaria al hacer clic
    const bankDetails = document.querySelector('.bank-details');
    if (bankDetails) {
        bankDetails.addEventListener('click', function() {
            const bankInfo = `Nombre: Noelia Belen Martinez
Banco: Brubank
Alias: bodanyw
CBU: 1430001713030100330019
Nº de cuenta: 1303010033001
CUIT: 27-37506444-3`;
            
            navigator.clipboard.writeText(bankInfo).then(function() {
                // Mostrar confirmación visual
                const originalBg = bankDetails.style.backgroundColor;
                bankDetails.style.backgroundColor = '#d4edda';
                bankDetails.style.border = '2px solid #28a745';
                
                // Crear mensaje temporal
                const message = document.createElement('div');
                message.textContent = '¡Información bancaria copiada!';
                message.style.cssText = `
                    position: absolute;
                    top: -35px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #28a745;
                    color: white;
                    padding: 8px 15px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    z-index: 1000;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                `;
                
                bankDetails.style.position = 'relative';
                bankDetails.appendChild(message);
                
                setTimeout(() => {
                    bankDetails.style.backgroundColor = originalBg;
                    bankDetails.style.border = '1px solid rgba(139, 79, 107, 0.1)';
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 3000);
            }).catch(function() {
                alert('No se pudo copiar automáticamente. Por favor, selecciona y copia manualmente.');
            });
        });
        
        // Agregar cursor pointer y tooltip
        bankDetails.style.cursor = 'pointer';
        bankDetails.title = 'Haz clic para copiar toda la información bancaria';
    }

    // Funcionalidad para agregar al calendario
    const calendarButton = document.getElementById('calendarButton');
    if (calendarButton) {
        calendarButton.addEventListener('click', function() {
            const eventTitle = 'Casamiento de Willy y Noe';
            const eventLocation = 'El Horizonte, Moron 433 Sur, Marquesado, Rivadavia, San Juan';
            const eventDescription = 'Ceremonia y Fiesta de Casamiento - Dress Code: Total Black';
            
            // Formatear fecha para Google Calendar (formato: YYYYMMDDTHHMMSSZ)
            const startDate = weddingDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const endDateTime = new Date(weddingDate.getTime() + (5 * 60 * 60 * 1000)); // +5 horas
            const endDate = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            
            // Crear enlace para Google Calendar
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
            
            window.open(googleCalendarUrl, '_blank');
        });
    }

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

    // Animación de los corazones flotantes
    function createFloatingHeart() {
        const hearts = ['💕', '💖', '💗', '💓', '💝'];
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 15 + 12}px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp ${3 + Math.random() * 2}s ease-in-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }

    // Agregar animación CSS para los corazones
    if (!document.querySelector('#heart-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'heart-animation-styles';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(180deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Crear corazones flotantes cada cierto tiempo
    setInterval(createFloatingHeart, 4000);

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
        const seconds = parseInt(document.getElementById('seconds').textContent);
        
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
        if (seconds !== lastSeconds) {
            document.getElementById('seconds').classList.add('animate');
            setTimeout(() => document.getElementById('seconds').classList.remove('animate'), 500);
        }
        
        lastDays = days;
        lastHours = hours;
        lastMinutes = minutes;
        lastSeconds = seconds;
    }

    // Verificar cambios en contador cada segundo
    setInterval(animateCountdownChange, 1000);

    // Efecto de partículas en el fondo (sutil)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(139, 79, 107, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            animation: particleFloat ${5 + Math.random() * 3}s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }

    // Agregar animación para partículas
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Crear partículas ocasionalmente
    setInterval(createParticle, 3000);

    console.log('🎉 Invitación de Willy y Noe cargada correctamente');
    console.log('⏰ Contador iniciado para el 5 de Diciembre de 2025');
    console.log('💕 ¡Que vivan los novios!');
});
    