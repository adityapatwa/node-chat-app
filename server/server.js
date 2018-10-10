const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('New message from the client', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};