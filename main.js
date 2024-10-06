const page = document.querySelector('html');
const buttonFokus = document.querySelector('.app__card-button--enfoque');
const buttonShortBreak = document.querySelector('.app__card-button--corto');
const buttonLongBreak = document.querySelector('.app__card-button--largo');

removeActive = () => {
    document.querySelectorAll('.app__card-button').forEach((button) => {
        button.classList.remove('active');
    });
}

buttonFokus.addEventListener('click', () => {
    page.setAttribute("data-contexto", "enfoque");
    removeActive();
    buttonFokus.classList.add('active');
});

buttonShortBreak.addEventListener('click', () => {
    page.setAttribute("data-contexto", "descanso-corto");
    removeActive();
    buttonShortBreak.classList.add('active');
});

buttonLongBreak.addEventListener('click', () => {
    page.setAttribute("data-contexto", "descanso-largo");
    removeActive();
    buttonLongBreak.classList.add('active');
});
