import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import path from "path";

const app=express()

app.use(express.static("public"));


const server = http.createServer(app)

const io = new Server(server,{
    cors: {origin: "*"}

});

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('message',(message)=>{
        console.log(message);
          io.emit("message", {
        id: socket.id,
        text: message
    });
        
    })
    
});
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});
server.listen(8080,()=> console.log('listening port 8080'));