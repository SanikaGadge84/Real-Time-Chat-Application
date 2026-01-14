const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// room -> { socketId: username }
const rooms = {};

io.on("connection", (socket) => {
  socket.on("join-room", ({ username, room }) => {
    socket.join(room);

    if (!rooms[room]) rooms[room] = {};
    rooms[room][socket.id] = username;

    // notify others
    socket.to(room).emit("user-joined", username);

    // send updated users list
    io.to(room).emit("room-users", Object.values(rooms[room]));
  });

  socket.on("send-message", ({ room, message }) => {
    socket.to(room).emit("receive-message", {
      name: rooms[room][socket.id],
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("user-typing", username);
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      if (rooms[room][socket.id]) {
        const username = rooms[room][socket.id];
        delete rooms[room][socket.id];

        socket.to(room).emit("left", username);
        io.to(room).emit("room-users", Object.values(rooms[room]));

        if (Object.keys(rooms[room]).length === 0) {
          delete rooms[room];
        }
        break;
      }
    }
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
