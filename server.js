const http = require('http')
const app = require('./app')

const {connect,disconnect} = require('./services/database.conn')

const PORT = 8080;

const server = http.createServer(app);
const io = require ('socket.io')(server)
const users = {}

io.on('connection', socket => {
    socket.on('user-connected', name => {
       users[socket.id] = name
       socket.broadcast.emit('new-user',name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

async function startServer(){
    await connect();
   
    server.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}...`)
    })
 
}

startServer()