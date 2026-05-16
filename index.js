import http from 'http'
import { Server } from 'socket.io'


const server = http.createServer()

const io = new Server(server,{
    cors: {origin: "*"}

});

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('message',(data)=>{
        console.log(data);
        io.emit('message',`${data.username} said ${message}`)
        
    })
    
});

server.listen(8080,()=> console.log('listening port 8080'));