import express from 'express'
import mysql2 from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv'
import path from "path";
import http from 'http'
import { Server } from 'socket.io'


// const {Pool} =  pg
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"));

 const pool=mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // port: 5432
    
}).promise()






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



app.post("/socketDB", async (req,res,next)=>{
    console.log(req.body)
    try{
        const {in_area}=req.body

        await pool.query(
           `INSERT into socket_DB(text)
            VALUES (?)`,[in_area]
        )

        res.status(201).send({message: "success"})
    }catch(err){
        console.err(err)
        next(err)
    }

})


// const socket = io("ws://localhost:8080")

// socket.on('message',text =>{

// })