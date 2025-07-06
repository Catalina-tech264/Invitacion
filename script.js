document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('wedding-audio');
    const playButton = document.querySelector('.play-button i');
    const currentTimeDisplay = document.querySelector('.time-display');
    const progressBar = document.querySelector('.progress');
    const durationDisplay = document.querySelector('.duration');
    let isPlaying = false;

    // Función para formatear el tiempo
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Actualizar la barra de progreso
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
    }

    // Controlar la reproducción
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playButton.classList.replace('fa-pause', 'fa-play');
        } else {
            audio.play().then(() => {
                playButton.classList.replace('fa-play', 'fa-pause');
            }).catch(error => {
                console.error("Error al reproducir el audio:", error);
                alert("Error al reproducir la canción. Asegúrate de que el archivo de audio esté en la carpeta correcta.");
            });
        }
        isPlaying = !isPlaying;
    }

    // Event listeners
    playButton.addEventListener('click', togglePlay);

    // Actualizar el tiempo actual
    audio.addEventListener('timeupdate', updateProgress);

    // Actualizar la duración total cuando esté cargada
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    // Reiniciar la reproducción al finalizar
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    // Manejar clic en la barra de progreso
    document.querySelector('.progress-bar').addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    // Card flip functionality
    document.querySelectorAll('.card').forEach(card => {
        // Flip card on click
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Prevent text selection on double click
        card.addEventListener('mousedown', function(e) {
            if (e.detail > 1) {
                e.preventDefault();
            }
        });
        
        // Add touch support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            // Only flip if the touch wasn't a swipe
            if (Math.abs(touchEndX - touchStartX) < 10) {
                this.classList.toggle('flipped');
            }
        }, { passive: true });
    });
});

// Contador regresivo
function updateCountdown() {
    const weddingDate = new Date('September 20, 2025 18:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Actualizar el DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Llamar una vez al cargar

// Agrega esto al final de tu archivo script.js
document.addEventListener('DOMContentLoaded', function() {
    const countdownSection = document.querySelector('.countdown-section');
    
    function checkScroll() {
        const sectionTop = countdownSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Si la sección está en el viewport
        if (sectionTop < windowHeight - 100) {
            countdownSection.classList.add('animate');
            // Removemos el event listener después de la primera animación
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    // Verificar al cargar la página
    checkScroll();
    
    // Verificar al hacer scroll
    window.addEventListener('scroll', checkScroll);
});