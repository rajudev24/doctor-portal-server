 
import {saveAppoinment, showUserAppoinemts, showDoctorAppointments, deleteAppointment} from '../service/appointments.js'

 export const createAppoinments = (req, res) =>{
    const appointment = req.body;
    const result = saveAppoinment(appointment)
    return res.json(result)
 }

 export const getUserAppointments = async(req, res) =>{
    const email = req.query.email;
    const cursor = showUserAppoinemts(email);
    const appointments = await cursor.toArray()
    return res.json(appointments)
 }

 export const getDoctorAppointments = async (req, res)=>{
    const email = req.params.email;
    const cursor = showDoctorAppointments(email)
    const appointments = await cursor.toArray()
    return res.json(appointments)
 }

 export const cancleAppointment = async(req, res)=>{
    const id = req.params.id;
    const result = await deleteAppointment(id);
    return res.json(result)
 }
