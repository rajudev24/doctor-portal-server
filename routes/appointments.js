import express from 'express'
const router = express.Router();
import {createAppoinments, getUserAppointments, getDoctorAppointments, cancleAppointment} from '../controllers/appointmentsContrl.js'

router.post('/appointments', createAppoinments )
router.get('/appointments', getUserAppointments)
router.get('/appointments/:email', getDoctorAppointments)
router.delete('/appointments/:id', cancleAppointment)

export default router