



const socket = io({
  extraHeaders: {
    'user-name': 'fernando',
  }
});


socket.on('on-clients-changed', (clients) => {
  console.log(clients);
});



