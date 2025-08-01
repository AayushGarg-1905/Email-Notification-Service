import { Request, Response } from 'express'
import { emailQueue } from '../queue/emailQueue'
import { MAX_QUEUE_SIZE } from '../utils/constants';

export const sendEmail = async (req: Request, res: Response) => {
    try {

        const currentJobCount = await emailQueue.count();
        if(currentJobCount>MAX_QUEUE_SIZE){
            return res.status(503).json({
                msg:"Service under high load. Please try again later"
            })
        }

        const { to, subject, text } = req.body
        if (!to || !subject || !text) {
            return res.status(400).json({ msg: 'Missing Fields' })
        }

        await emailQueue.add('send_email',
            { to, subject, text },
            {
                attempts: 3, backoff: {
                    type: 'exponential', delay: 5000
                }
            }
        )

        res.json({ msg: 'Email queued for delivery' })
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }

}

