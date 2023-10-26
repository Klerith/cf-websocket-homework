
const username = localStorage.getItem('name');
if ( !username ) throw new Error('Name is required');


const socket = io({
  extraHeaders: {
    'user-name': username,
  }
});


const usersUlElement = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');


const renderUsers = (users) => {

  usersUlElement.innerHTML = '';
  users.forEach((user) => {
    const liElement = document.createElement('li');
    liElement.innerText = user.name;
    usersUlElement.appendChild(liElement);
  });

  // Scroll to bottom
  setTimeout(() => {
    chatElement.scrollTop = chatElement.scrollHeight;
  }, 100);

};

const renderMessage = (payload) => {
  const { userId, message, userName } = payload
  
  const divElement = document.createElement('div');
  divElement.classList.add('message');

  if ( userId !== socket.id ) {
    divElement.classList.add('incoming');
  }

  divElement.innerHTML = message;
  chatElement.appendChild(divElement);

  // Scroll al final de los mensajes
  chatElement.scrollTop = chatElement.scrollHeight;
}


socket.on('on-clients-changed', renderUsers );
socket.on('on-message', renderMessage );



form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const message = input.value;
  input.value = '';

  socket.emit('send-message', message);

});
