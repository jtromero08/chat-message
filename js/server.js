const http = require('http').createServer();
const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('Socket.io server is on')
})

http.listen(3000, () => {
    console.log("listening *:3000")
})