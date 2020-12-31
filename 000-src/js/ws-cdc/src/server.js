
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const CONFIG = require("../config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on(`connection`, socket => {
  console.log('New WS connection...');

  // socket.on(`${CONFIG.CDC_PREFIX}join_room`, () => {
  socket.on(`join_room`, () => {
    socket.emit('message', 'Welcome to Chat Room!');
  });

  socket.on('join_room', ({ pseudo, room }) => {
    const user = userJoin(socket.id, pseudo, room);

    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to Chat Room!'));
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // io.to(user.room).emit('room_users', {
    //   room: user.room,
    //   users: getRoomUsers(user.room)
    // });
  });

  socket.on('chat_message', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.pseudo, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(
          botName,
          `${user.pseudo} has left the chat`
        )
      );
    }
  });
});

const PORT = process.env.PORT || CONFIG.CDC_PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
