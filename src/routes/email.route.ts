import express  from 'express'
import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller'

const router = express.Router();

router.post('/send-email',sendEmail)

export default router