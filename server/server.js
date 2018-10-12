const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callaback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callaback('Name and room name are required');
        }

        if(!users.isUnique(params.name, params.room)) {
            return callaback('User already exists');
        }
        socket.join(params.room);

        // Remove user from existing room if he/she joins another one
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        callaback();
    });
    socket.on('createMessage', (newMessage, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }

        callback('');
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }

    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};