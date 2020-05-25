const http = require('http').createServer();
const io = require('socket.io')(http);
const users = {};

io.on('connection', socket => {
    socket.on('new user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user connected', name);
    })

    socket.on('send chat message', data => {
        socket.broadcast.emit('chat room', data);
    })

    socket.on('disconnected', name => {
        io.emit('chat room', `${name} has disconnect`)
        console.log(`${name} disconnect`)
        delete users[socket.id]
    })

    console.log('Socket.io server is on')
})

http.listen(3000, () => {
    console.log("listening *:3000")
})