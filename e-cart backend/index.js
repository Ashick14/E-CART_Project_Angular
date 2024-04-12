require('dotenv').config()

const express=require('express')

const cors=require('cors')

const db=require('./Connection/db')

const router=require('./Routes/router')

const ecartServer=express()

ecartServer.use(cors())
ecartServer.use(express.json())
ecartServer.use(router)

const PORT=3000 || process.env.PORT

ecartServer.listen(PORT,()=>{
    console.log("listening on the port "+PORT);
})

ecartServer.get('/',(req,res)=>{
    res.send("WELCOME TO ECART SERVER")
})