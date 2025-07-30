import { Worker } from "bullmq";
import { sendEmail } from "../utils/emailSender";
import dotenv from 'dotenv'
dotenv.config()

const connection = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
}

const worker = new Worker('email-queue',async job=>{
    const { to, subject, text} = job.data

    try{
        await sendEmail(to, subject, text)
        console.log('send to ',to)
    }catch(err){
        console.error(` Failed to send email to ${to}:`, err);
        throw err; 
    }
},{connection})

worker.on('failed', (job, err) => {
  console.log(`Job failed after attempts: ${job &&job.attemptsMade}`, err.message);
});