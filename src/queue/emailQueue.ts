import { Queue } from 'bullmq'
import dotenv from 'dotenv'
dotenv.config()

const connection = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
}

export const emailQueue = new Queue('email-queue',{connection})