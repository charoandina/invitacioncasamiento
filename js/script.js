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
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
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
  document.getElementById("btnPausa").classList.add("pulse");
};

let pauseAudio = () => {
  audios.pause();
  document.getElementById("btnPausa").classList.add("hidden");
  document.getElementById("btnPlay").classList.remove("hidden");
  document.getElementById("btnPlay").classList.add("vertical_shake");
};



