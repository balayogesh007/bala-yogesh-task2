import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'events' })
export class SocketGateway implements OnGatewayConnection, OnGatewayInit {
  public connectedClients: Set<Socket> = new Set<Socket>();

  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    Logger.log('Websocket Connected');
    server.on('connection', (socket) => {
      Logger.log(socket);
    });
  }

  handleConnection(client: any) {
    this.connectedClients.add(client);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() data: string) {
    console.log('SendMessage', data);
    this.server.emit('Event Emitted', {
      message: 'OnMessage',
      content: data,
    });
  }
}
