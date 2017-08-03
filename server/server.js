const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage,generateLocationMessage}=require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Wellcome to chat app') );

  socket.broadcast.emit('newMessage',generateMessage('Admin','new user connected'));

  socket.on('createMessage',(message,callback)=>{
    console.log(message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('this is from server');
  });

    socket.on('createLocation',(coords)=>{
      io.emit('newLocationMessage',generateLocationMessage('admin',coords.longitude,coords.latitude));
    });
  //   socket.broadcast.emit('newMessage',{
  //     from:message.from,
  //     text:message.text,
  //     createdAt:new Date().getTime()
  //   });
  // });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
