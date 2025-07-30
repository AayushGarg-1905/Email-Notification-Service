import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import emailRouter from './routes/email.route'
const app = express();

app.use(express.json());
app.use('/',emailRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Email service running on port ${PORT}`)
})
