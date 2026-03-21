import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { config } from "./config";
import app from "./app";

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

// Socket auth and events will be added here by Person B

app.set("io", io);

server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});