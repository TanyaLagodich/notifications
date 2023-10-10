const socket = io('http://localhost:8000');

socket.on('send-notification', ({ message }) => {
    console.log(message);
    document.body.innerHTML = message;
})
