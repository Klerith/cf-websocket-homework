import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: '*',
})
export class ChatGateway implements OnModuleInit {


  @WebSocketServer()
  public server: Server;

  
  constructor(private readonly chatService: ChatService) {}


  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      const userName = socket.handshake.headers['user-name'];
      if ( !userName ) {
        socket.disconnect();
        return;
      }

      // this.server.emit('on-clients-changed', { message: 'Hola desde el server' });
      this.server.emit('on-clients-changed', this.chatService.getClients() );
      


    });
  }


  @SubscribeMessage('message')
  handleNewClient( 
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ) {
    
    client.broadcast.emit('message', { message: 'Hola desde el server '})

    return data;
  }



}
