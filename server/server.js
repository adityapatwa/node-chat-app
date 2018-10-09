const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (newMessage) => {
        console.log('New message from the client');
        console.log(newMessage);
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        })
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