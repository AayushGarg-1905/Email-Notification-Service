import { Kafka } from 'kafkajs'
import { emailQueue } from './queue/emailQueue'
import dotenv from 'dotenv'
import { MAX_QUEUE_SIZE } from './utils/constants'
dotenv.config()

const kafka = new Kafka({
  clientId: 'email-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'email-group' })

async function run() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'email-topic', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        const { to, subject, text } = JSON.parse(message.value.toString())

        const currentJobCount = await emailQueue.count()
        if (currentJobCount > MAX_QUEUE_SIZE) {
          console.warn("Service under high load. Skipping email job for:", to)
          return
        }

        await emailQueue.add('send_email', { to, subject, text }, {
          attempts: 3,
          backoff: { type: 'exponential', delay: 5000 }
        })
      }
    }
  })
}

run().catch(console.error)