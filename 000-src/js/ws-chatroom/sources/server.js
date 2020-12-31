const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {formatMessage} = require('./utils/messages');
const {
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'Chat Room Bot';

const DEBUG = 3

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New WS connection...');

  socket.on('join_room', ({ pseudo, room }) => {
    if (DEBUG > 1) {
      console.log('join_room');
    }
    const user = userJoin(socket.id, pseudo, room);
    if (DEBUG > 2) {
      console.log(user);
    }

    socket.join(user.room);
    socket.emit('message', formatMessage(botName, 'Welcome to Chat Room!'));
    // socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.pseudo} has joined the chat`)
      )
    ;

    io.to(user.room).emit('room_users', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('chat_message', (msg) => {
    if (DEBUG > 1) {
      console.log('chat_message');
    }
    const user = getCurrentUser(socket.id);

    if (DEBUG > 2) {
      console.log('user is');
      console.log(user);
    }
    // io.emit('message', formatMessage('USER', msg));
    io.to(user.room).emit('message', formatMessage(user.pseudo, msg));
  });

  socket.on('disconnect', () => {
    if (DEBUG > 1) {
      console.log('disconnect');
    }
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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
