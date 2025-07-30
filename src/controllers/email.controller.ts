import {Request, Response} from 'express'
import {emailQueue} from '../queue/emailQueue'

export const sendEmail = async(req:Request,res:Response)=>{

    const {to,subject,text} = req.body
    if(!to || !subject || !text){
        return res.status(400).json({msg:'Missing Fields'})
    }

    await emailQueue.add('send_email',
        {to, subject, text},
        {attempts:3, backoff:{
            type:'exponential', delay: 5000
        }}
    )

    res.json({msg:'Email queued for delivery'})
}

