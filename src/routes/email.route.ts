import express  from 'express'
import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller'
import { emailRateLimiter } from '../utils/rateLimiter';

const router = express.Router();

router.post('/send-email',emailRateLimiter,sendEmail)

export default router