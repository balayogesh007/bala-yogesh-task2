import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Set<Socket> = new Set<Socket>();
  handleConnection(client: Socket) {
    this.connectedClients.add(client);
  }
}
