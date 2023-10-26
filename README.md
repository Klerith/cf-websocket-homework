<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

# Tarea: 
Crear un servidor de Nest con WebSocket y un chat


## Instalación
1. Clonar proyecto 
```
git clone https://github.com/Klerith/cf-websocket-homework.git
```

2. Navegar dentro de la carpeta e instalar dependencias
```
cd <directorio>
npm install
```

3. Ejecutar el servidor
```
npm run start:dev
```

4. Probar las rutas:
[Login y Chat](http://localhost:3000)


## Configuración de WebSockets

1. Instalar dependencias ([más información aquí](https://docs.nestjs.com/websockets/gateways))
```
npm i --save @nestjs/websockets @nestjs/platform-socket.io
```

2. Crear el módulo, gateway y servicio, usar el CLI de Nest y seleccionar la opción de WebSockets, pero decir que **NO** a la parte del CRUD
```
nest g res chat --no-spec
```


### Configuración del gateway 
Los gateways son similares a los controladores para Rest. Se encargan de recibir las peticiones y enviar las respuestas pero mediante websockets.


### Escuchar conexiones de clientes y desconexiones

1. En el **chat.gateway.ts**, crear la siguiente propiedad y decorarla:
```
@WebSocketServer()
public server: Server;
```

* WebSocketServer viene de **'@nestjs/websockets'**

* Server viene de **'socket.io'**


2. A nuestro ChatGateway, implementar la interfaz **OnGatewayInit** y agregar el método **onModuleInit**:
   
```
export class ChatGateway implements OnModuleInit {

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    // ...
  }
}
```
* OnModuleInit viene de **'@nestjs/common'**


3. En el método **onModuleInit**, agregar el siguiente código:
```
onModuleInit() {
  this.server.on('connection', (socket) => {
    console.log('New client connected');
  });
}
```

## Configuración del cliente

1. Abrir la página del [chat (localhost:3000/chat)](http://localhost:3000/chat.html) y abrir la consola del navegador.

2. Abrir el archivo ```public/js/chat.js``` y agregar el siguiente código:
```
const socket = io();
```
* **io** viene de **'socket.io-client'** que ya está importado en el chat.html al final del archivo


3. En la consola de **NEST**, debería aparecer el mensaje de **New client connected**



## Escuchar eventos del cliente y servidor

### Server
1. En el **chat.gateway.ts**, agregar el siguiente código en el método **onModuleInit**:
```
  @SubscribeMessage('send-message')
  handleMessage( 
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket
  ) {
    
    if ( !message ) return;

    this.server.emit(
      'on-message', 
      { userId: client.id, message: message }
    )

  }
```
* Realizar las importaciones necesarias de los decoradores usados.
* Socket viene de **'socket.io'**


### Client

1. En el **chat.js**, al inicio del archivo, agregar el siguiente código:
```
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');
```
* Estas son nuestras referencias a los elementos HTML que necesitaremos


2. Crear una función para renderizar los mensajes en el chat:
```
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
```


3. Agregar el siguiente código para escuchar el evento **on-message**:
```
socket.on('on-message', (payload) => {
  renderMessage(payload);
});
```
* Alternativo
```
socket.on('on-message', renderMessage);
```

4. Agregar un listener en el formulario para escuchar el evento **submit**:
```

form.addEventListener( 'submit', ( event ) => {
  event.preventDefault();

  const message = input.value;
  input.value = '';

  socket.emit( 'send-message', message );

} );

```

* **Importante:**  Noten que en el Gateway del servidor, tenemos este código ```@SubscribeMessage('send-message')``` el cual escucha el evento que estamos mandando desde el cliente. 
  
* Es importante que el nombre del evento sea el mismo en ambos lados.

* Abran otra instancia del navegador web y manden mensajes desde ambos lados.
 
### Si logras ver los mensajes, ya sabes cómo hacer una comunicación bilateral cliente-servidor, servidor-cliente


