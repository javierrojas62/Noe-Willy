// Botón flotante scroll to top
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar el botón según el scroll
    var btn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', function() {
        if (!btn) btn = document.getElementById('scrollTopBtn');
        if (window.scrollY > 200) {
            btn && (btn.style.display = 'flex');
        } else {
            btn && (btn.style.display = 'none');
        }
    });
    // Scroll suave al top
    btn && btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Enlace Spotify dinámico
    var spotifyBtn = document.getElementById('spotifyLink');
    if (spotifyBtn) {
        spotifyBtn.href = 'https://open.spotify.com/playlist/7y9jvxNntdjLfpY1jKUGSF?si=JpkCHWoITMmz3qiVpe8NAg&pi=nE-ygSbdSTOQL&pt=8f9d527dd033710a2e0f7ddc53b5e81c';
        spotifyBtn.target = '_blank';
    }
});
// Fade in animation on scroll
        function fadeInOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Countdown timer
        function updateCountdown() {
            const weddingDate = new Date('December 5, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerHTML = days;
            document.getElementById('hours').innerHTML = hours;
            document.getElementById('minutes').innerHTML = minutes;
            document.getElementById('seconds').innerHTML = seconds;

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = '<h3>¡Es hoy!</h3>';
            }
        }

        // Initialize
        window.addEventListener('scroll', fadeInOnScroll);
        window.addEventListener('load', fadeInOnScroll);
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });