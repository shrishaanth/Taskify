import { Server as SocketIOServer, Socket } from 'socket.io';

export interface AuthSocket extends Socket {
  userId?: string;
}

export function setupSockets(io: SocketIOServer) {
  io.use(async (socket: AuthSocket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    // Verify JWT (reuse auth logic)
    try {
      const payload = require('../services/auth.service').verifyToken(token);
      socket.userId = payload.userId;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthSocket) => {
    console.log(`User ${socket.userId} connected`);

    // Task events (emit already in controllers)
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });
}

