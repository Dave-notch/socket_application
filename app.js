import express from 'express'
import mysql2 from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv'
import path from "path";
import http from 'http'
import { Server } from 'socket.io'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { error } from 'console';


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


app.post("/sign_UP", async (req,res,next)=>{
   console.log(req.body)
  try{
    const {userName,userEmail,pass} = req.body
    const hashedPassowrd= await bcrypt.hash(pass, 10)

    //  if(!userName || !userEmail || !pass){
    //   return res.status(400).send({message:"fields are empty please fill them up"})
    //  }

    const [NAME] =  await pool.query(
      `SELECT * FROM sign_UP WHERE name = ?
      `,[userName]
     )
      
    const [EMAIL]=  await pool.query(
      `SELECT * FROM sign_UP WHERE email = ?
      `,[userEmail]
     )
      
    const useremail=EMAIL[0]
    const User=NAME[0]
    

    if(useremail && User){
      return res.status(401).json({error:"UserName and Email already exists"});
     }else if(User){
      return res.status(401).json({error:"UserName already exists"});
     }else if(useremail){
      return res.status(401).json({error:"Email already exists"});
     }

    



    await pool.query(
      `INSERT INTO sign_UP (name, email,pass )
      VALUES (?,?,?)
      `,[userName,userEmail,hashedPassowrd]
     )

     const check =jwt.compare(token,refresh)

     const token=jwt.sign(
        {userid: User.id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
     )

     res.json({message:token})
     res.status(201).json({ message: "User created successfully" });

  }catch(err){
    console.error(err)
    next(err)
  }
 
})

// app.get('/hello', async (req,res,next)=>{

// })


app.post("/sign_UP/login", async (req,res,next)=>{
  try{
    const {logEmail,loginPass} = req.body
    const [row] = await pool.query(`SELECT * FROM sign_UP WHERE
        email=?`,[logEmail]
      )

      const user=row[0]

      if(!user){
        return res.status(401).send({error: "User not found"})
      }

      

      const isMatch= await bcrypt.compare(loginPass,user.pass)

      if(!isMatch){
        return res.status(401).send({error: "Wrong password"})
      }

    const token=jwt.sign(
        {userid: user.id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
     )

    res.send({token:token})

    res.status(201).send({ message: `Logged in successfully ${user.name}`});
 
  }catch(err){
    console.error(err)
    next(err)
  }

})

app.post("/checkJWT", async (req,res)=>{
  const token = headers.Authorization.split("")[1]
  const decoded=jwt.verify(token,process.env.JWT_SECRET)
  res.json({userid:decoded.userid})
})

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});
server.listen(8080,()=> console.log('listening port 8080'));