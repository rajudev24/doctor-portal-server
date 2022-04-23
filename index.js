
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import userRoutes from './routes/users.js';
import doctorRoutes from './routes/doctors.js'
import appointmentRoutes from './routes/appointments.js'

app.use('/', userRoutes)
app.use('/', doctorRoutes)
app.use('/', appointmentRoutes)


app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})