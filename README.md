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

2. Instalar dependencias
```
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
nest g res chat
```
