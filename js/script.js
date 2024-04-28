/*COUNTDOW*/

let targetDate = new Date("September 21, 2024 17:00:00").getTime();

let countdown = setInterval(function() {


    let now = new Date().getTime();

    let difference = targetDate - now;
    
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    

    document.getElementById("days").innerHTML = formatTime(days);
    document.getElementById("hours").innerHTML = formatTime(hours);
    document.getElementById("minutes").innerHTML = formatTime(minutes);
    document.getElementById("seconds").innerHTML = formatTime(seconds);
    

    if (difference < 0) {
        clearInterval(countdown);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);


function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

/* POPUP */

function showPopUp() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function hidePopup() {
    // Añade la clase de animación fade-out
    document.getElementById('popup').classList.remove('animate__fadeIn');
    document.getElementById('popup').classList.add('animate__fadeOut');
    
    // Espera a que la animación termine (dura 1 segundo por defecto) y luego oculta los elementos
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
        
        // Quita la clase de animación fade-out para la próxima vez que se muestre el pop-up
        document.getElementById('popup').classList.remove('animate__fadeOut');
    }, 1000); // La duración de la animación fade-out es de 1 segundo
}

/* MUSICA */

let audios = document.getElementById("audioPrueba");

let playAudio = () => {
  audios.play().catch((error) => {
    console.log(
      "La reproducción automática no está permitida. Haz clic en la página para reproducir el audio."
    );
    return false;
  });
  document.getElementById("btnPlay").classList.add("hidden");
  document.getElementById("btnPausa").classList.remove("hidden");
};

let pauseAudio = () => {
  audios.pause();
  document.getElementById("btnPausa").classList.add("hidden");
  document.getElementById("btnPlay").classList.remove("hidden");
};

/* POP UP */

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".nosotros-img img");
    const popupContainer = document.getElementById("popup-container");
    const popupImage = document.getElementById("popup-image");
    const closeButton = document.querySelector(".close");
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    let currentIndex = 0;

    // Función para abrir el pop-up y mostrar la imagen correspondiente
    function openPopup(index) {
        const src = images[index].getAttribute("src");
        popupImage.setAttribute("src", src);
        popupContainer.style.display = "block";
        currentIndex = index;
    }

    // Función para cerrar el pop-up
    function closePopup() {
        popupContainer.style.display = "none";
    }

    // Función para cambiar la imagen mostrada en el pop-up
    function changeImage(direction) {
        const popupImage = document.getElementById('popup-image');
        let animationClass;
    
        // Determina la animación a aplicar según la dirección
        if (direction === 'next') {
            animationClass = 'animate__fadeOutRight';
        } else if (direction === 'prev') {
            animationClass = 'animate__fadeOutLeft';
        }
    
        // Añade la animación de salida a la imagen
        popupImage.classList.add(animationClass);
    
        // Espera a que la animación termine antes de cambiar la imagen
        setTimeout(() => {
            // Quita la animación de salida
            popupImage.classList.remove(animationClass);
    
            // Cambia el índice de la imagen según la dirección
            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % images.length;
            } else if (direction === 'prev') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
    
            // Llama a openPopup para mostrar la nueva imagen
            openPopup(currentIndex);
        }, 1000); // Duración de la animación (1 segundo por defecto)
    }

    // Evento de clic en las imágenes para abrir el pop-up
    images.forEach(function(image, index) {
        image.addEventListener("click", function() {
            openPopup(index);
        });
    });

    // Evento de clic en el botón de cierre para cerrar el pop-up
    closeButton.addEventListener("click", closePopup);

    // Evento de clic fuera de la imagen para cerrar el pop-up
    popupContainer.addEventListener("click", function(event) {
        if (event.target === this) {
            closePopup();
        }
    });

    // Evento de teclado para la navegación entre imágenes
    document.addEventListener("keydown", function(event) {
        if (popupContainer.style.display === "block") {
            if (event.key === "ArrowLeft") {
                changeImage("prev");
            } else if (event.key === "ArrowRight") {
                changeImage("next");
            } else if (event.key === "Escape") {
                closePopup();
            }
        }
    });

    let startX = 0;
    let currentX = 0;
    const swipeThreshold = 50; // Distancia mínima en píxeles para considerar un gesto como deslizamiento

    // Agrega un listener para eventos táctiles en el contenedor emergente
    popupContainer.addEventListener("touchstart", handleTouchStart, false);
    popupContainer.addEventListener("touchmove", handleTouchMove, false);
    popupContainer.addEventListener("touchend", handleTouchEnd, false);

    function handleTouchStart(event) {
        // Almacena la posición inicial del toque
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        // Actualiza la posición actual del toque
        currentX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        // Calcula la distancia y dirección del deslizamiento
        const distance = startX - currentX;

        if (Math.abs(distance) > swipeThreshold) {
            // Si el desplazamiento es mayor que el umbral, determina la dirección
            if (distance > 0) {
                // Deslizamiento hacia la izquierda (prev)
                changeImage("prev");
            } else {
                // Deslizamiento hacia la derecha (next)
                changeImage("next");
            }
        }
    }

    // Evento de clic en el botón "Anterior" para navegar hacia atrás
    prevButton.addEventListener("click", function() {
        changeImage("prev");
    });

    // Evento de clic en el botón "Siguiente" para navegar hacia adelante
    nextButton.addEventListener("click", function() {
        changeImage("next");
    });
});