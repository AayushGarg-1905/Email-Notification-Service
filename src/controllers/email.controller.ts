import { Request, Response } from 'express'
import { MAX_QUEUE_SIZE } from '../utils/constants';
import { kafkaProducer } from '../utils/kafkaProducer';

export const sendEmail = async (req: Request, res: Response) => {
    try {

        const { to, subject, text } = req.body
        if (!to || !subject || !text) {
            return res.status(400).json({ msg: 'Missing Fields' })
        }

        await kafkaProducer.send({
            topic: 'email-topic',
            messages: [{ value: JSON.stringify({ to, subject, text }) }]
        })

        res.json({ msg: 'Email queued for delivery' })
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }

}

