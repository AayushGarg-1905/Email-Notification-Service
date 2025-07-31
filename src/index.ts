import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import emailRouter from './routes/email.route'
import bullBoardAdapter from './bullboard'

const app = express();

app.use(express.json());
app.use('/',emailRouter);
app.use('/admin/queues',bullBoardAdapter.getRouter());

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Email service running on port ${PORT}`)
})
