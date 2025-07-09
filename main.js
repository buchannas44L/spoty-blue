// Transparencia del topbar
const topBar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
    topBar.style.opacity = window.scrollY > 0 ? '0.9' : '1';
});

// Ajuste de padding para el contenido principal
const mainContent = document.querySelector('.main-content');
mainContent.style.paddingTop = `${topBar.offsetHeight + 20}px`;

// Controlador de reproducción de música
document.querySelectorAll('.card').forEach(card => {
    const audio = card.querySelector('.audio-player');
    const playButton = card.querySelector('.btn-play');

    // Crear botón de play si no existe
    if (!playButton) {
        const newPlayButton = document.createElement('button');
        newPlayButton.className = 'btn-play';
        newPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        card.appendChild(newPlayButton);
    }

    // Evento de clic para play/pause
    card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-play')) {
            // Pausar otros audios
            document.querySelectorAll('.audio-player').forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    const otherButton = otherAudio.closest('.card').querySelector('.btn-play');
                    if (otherButton) otherButton.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            });

            // Play/pause del audio actual
            if (audio.paused) {
                audio.play();
                e.target.closest('.btn-play').innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                audio.pause();
                e.target.closest('.btn-play').innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }
    });
});

// Reiniciar ícono cuando el audio termine
document.querySelectorAll('.audio-player').forEach(audio => {
    audio.addEventListener('ended', () => {
        const button = audio.closest('.card').querySelector('.btn-play');
        if (button) button.innerHTML = '<i class="fa-solid fa-play"></i>';
    });
});