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
      //! const { name, token } = socket.handshake.auth
      if ( !userName ) {
        socket.disconnect();
        return;
      }

      this.chatService.onClientConnected({ id: socket.id, name: `${userName}` });

      // this.server.emit('on-clients-changed', { message: 'Hola desde el server' });
      this.server.emit('on-clients-changed', this.chatService.getClients() );

      socket.on('disconnect', () => {
          this.chatService.onClientDisconnected(socket.id);
          this.server.emit('on-clients-changed', this.chatService.getClients() );
      });
    });

    
  }


  @SubscribeMessage('send-message')
  handleMessage( 
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket
  ) {
    const userName = client.handshake.headers['user-name'];
    
    if ( !message ) return;
    this.server.emit(
      'on-message', 
      { userId: client.id, userName, message }
    )

  }



}
