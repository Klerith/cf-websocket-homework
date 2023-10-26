import { Module } from '@nestjs/common';
import { Chat2Service } from './chat2.service';
import { Chat2Gateway } from './chat2.gateway';

@Module({
  providers: [Chat2Gateway, Chat2Service],
})
export class Chat2Module {}
