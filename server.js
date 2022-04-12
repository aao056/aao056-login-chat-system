const http = require('http')
const app = require('./app')

const {connect,disconnect} = require('./services/database.conn')

const PORT = 8080;

const server = http.createServer(app);


async function startServer(){
    await connect();
    server.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}...`)
    })
 
}

startServer()