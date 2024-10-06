const page = document.querySelector("html");
const buttonFokus = document.querySelector(".app__card-button--enfoque");
const buttonShortBreak = document.querySelector(".app__card-button--corto");
const buttonLongBreak = document.querySelector(".app__card-button--largo");
const imageContext = document.querySelector(".app__image");
const titleContext = document.querySelector(".app__title");
const toggleMusic = document.querySelector("#alternar-musica");

const music = new Audio("./sonidos/luna-rise-part-one.mp3");
music.volume = 0.5; 
music.loop = true;


const soundEnd = new Audio("./sonidos/beep.mp3");
soundEnd.volume = 0.3;

const soundStart = new Audio("./sonidos/play.wav");
soundStart.volume = 0.3;

const soundPause = new Audio("./sonidos/pause.mp3");
soundPause.volume = 0.3;

const timerWatch = document.querySelector("#timer");

const buttonTimer = document.querySelector("#start-pause");
let time = 1500; // 25 minutos
let interval = null;

const imgBttTimer = document.querySelector(".app__card-primary-butto-icon");
const textBttTimer = document.querySelector("#start-pause span");


const displayTime = () => {
    const timeFormat = new Date(time * 1000).toLocaleTimeString("es-CO", {minute: "2-digit", second: "2-digit"});
    timerWatch.textContent = `${timeFormat}`;
}
displayTime();

const reboot = () => {
    clearInterval(interval);
    interval = null;
};
const lessTime = () => {
    if (time < 1) {
        soundEnd.play();
        alert("¡Tiempo terminado!");
        reboot();
        textBttTimer.textContent = "Iniciar";
        imgBttTimer.src = "./imagenes/play_arrow.png";
        return;
    }
    time--;
    displayTime();
}
const timer = () => {
    if (interval) {
        soundPause.play();
        reboot();
        return;
    }
    soundStart.play();
    // Disminuir el tiempo cada segundo
    interval = setInterval(lessTime, 1000); // 1000ms = 1s
}

const removeActive = () => {
    document.querySelectorAll(".app__card-button").forEach((button) => {
        button.classList.remove("active");
    });
};

const setContext = (context) => {
    page.setAttribute("data-contexto", context);
    imageContext.setAttribute("src", `./imagenes/${context}.png`);
    textBttTimer.textContent = "Iniciar";
    imgBttTimer.src = "./imagenes/play_arrow.png";
    switch (context) {
        case "enfoque":
            time = 1500; // 25 minutos
            titleContext.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            reboot();
                break;
        case "descanso-corto":
            time = 300; // 5 minutos
            titleContext.innerHTML = `¿Qué tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa!</strong>`;
            reboot();
                break;
        case "descanso-largo":
            time = 900; // 15 minutos
            titleContext.innerHTML = `Hora de volver a la superficie.<br>
                <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            reboot();
                break;
    }
    displayTime();
};


// Eventos
buttonTimer.addEventListener("click", () => {
    // Cuando se presiona el boton por primera vez no hay intervalo
    if (interval) {
        // Al pausar
        textBttTimer.textContent = "Reanudar";
        imgBttTimer.src = "./imagenes/play_arrow.png";
    } else {
        // Al iniciar o reanudar
        textBttTimer.textContent = "Pausar";
        imgBttTimer.src = "./imagenes/pause.png";
    }
    timer();
});

buttonFokus.addEventListener("click", () => {
    setContext("enfoque");
    removeActive();
    buttonFokus.classList.add("active");
});

buttonShortBreak.addEventListener("click", () => {
    setContext("descanso-corto");
    removeActive();
    buttonShortBreak.classList.add("active");
});

buttonLongBreak.addEventListener("click", () => {
    setContext("descanso-largo");
    removeActive();
    buttonLongBreak.classList.add("active");
});

toggleMusic.addEventListener("change", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});
