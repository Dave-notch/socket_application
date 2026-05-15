import express from 'express'
import pg from 'pg'
import cors from 'cors'
import dotenv, { config } from 'dotenv'

const {Pool} =  pg
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))

const pool = new Pool({
    host: process.env.POSTGRESS_HOST,
    user: process.env.POSTGRESS_USER,
    password: process.env.POSTGRESS_PASS,
    database: process.env.POSTGRESS_DB,
    port: 5432
})

app.post("/socket_DB", async (req,res,next)=>{
    try{
        const {text}=req.body
    }catch(err){
        console.err(err)
        next(err)
    }

})