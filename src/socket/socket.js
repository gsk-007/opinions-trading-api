import { Server } from "socket.io";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust for production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Broadcast event updates (creation, status, results)
const broadcastEventUpdate = (action, event) => {
  if (io) {
    io.emit("eventUpdate", { action, event });
  }
};

// Broadcast trade updates (created, updated)
const broadcastTradeUpdate = (action, trade) => {
  if (io) {
    io.emit("tradeUpdate", { action, trade });
  }
};

export { initializeSocket, broadcastEventUpdate, broadcastTradeUpdate };
