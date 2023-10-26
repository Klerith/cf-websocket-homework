import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
export class ChatGateway {
  
  constructor(private readonly chatService: ChatService) {}

  

  @SubscribeMessage('message')
  handleNewClient( 
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ) {
    
    client.broadcast.emit('message', { message: 'Hola desde el server '})

    return data;
  }



}
