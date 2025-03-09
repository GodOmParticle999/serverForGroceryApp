import 'dotenv/config'
import fastify from 'fastify'
import { PORT } from './src/configs/config.js'
import { connectDB } from './src/configs/dbConnect.js'


const start =async()=>{
   await connectDB()

   const app =fastify()

   app.listen({port:PORT,host:"0.0.0.0"},(err)=>{
    if(err){
        console.log(err)
        process.exit(1)
    }else{
        console.log(`Grocery App server is running on port ${PORT}`)
    }
    
   })
}

start()