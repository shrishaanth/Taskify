// Task-specific socket handlers (augment sockets/index.ts)
import { Server, Socket } from 'socket.io';
import { AuthSocket } from './index';

export function setupTaskSockets(io: Server) {
  io.of('/tasks').on('connection', (socket: AuthSocket) => {
    console.log('Task namespace connected:', socket.id);

    socket.on('join-project', (projectId: string) => {
      socket.join(`project:${projectId}`);
    });

    // Broadcast task changes (already handled in controllers via io.emit)
  });
}

