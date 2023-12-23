import socketConnection from '../services/socketConnection';
const buttons = document.querySelectorAll("button.alert");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        socketConnection();
    });
});