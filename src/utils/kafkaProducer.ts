import { Kafka } from 'kafkajs'
import dotenv from 'dotenv'
dotenv.config()

const kafka = new Kafka({
    clientId: 'email-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
})

export const kafkaProducer = kafka.producer()
kafkaProducer.connect()