const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');

const socket = io();

const renderMessage = (payload) => {
    const { userId, message } = payload;
  
    // Crear un DIV Element
    const divElement = document.createElement('div');
  
    // Agregar la clase de mensaje
    divElement.classList.add('message');
  
    // Si el UserID NO es el mío, agregar "incoming"
    if ( userId !== socket.id ) {
      divElement.classList.add('incoming');
    }
  
    // Agregar el mensaje al DIV
    divElement.innerHTML = message;
  
    // Agregar el DIV al chat
    chatElement.appendChild(divElement);
  
  }

  /*socket.on('on-message', (payload) => {
    renderMessage(payload);
  });*/
  socket.on('on-message', renderMessage)

  form.addEventListener( 'submit', (e) => {
    e.preventDefault();
    const message = input.value;
    input.value = '';

    socket.emit( 'send-message', message );
  })
  