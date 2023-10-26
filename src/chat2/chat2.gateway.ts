import { WebSocketGateway } from '@nestjs/websockets';
import { Chat2Service } from './chat2.service';

@WebSocketGateway()
export class Chat2Gateway {
  constructor(private readonly chat2Service: Chat2Service) {}
}
