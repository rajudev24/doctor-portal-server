import {db} from '../Config/config.js';
import {ObjectId } from 'mongodb';
const database = db();

const appointmentsCollection = database.collection('appointments');


export const saveAppoinment = (appointment)=>{
    return appointmentsCollection.insertOne(appointment)
}

export const showUserAppoinemts = (email)=>{
    const query = {email:email}
    return appointmentsCollection.find(query)
}
export const showDoctorAppointments = (email)=>{
    const query = {doctorEmail:email};
    return appointmentsCollection.find(query)
}

export const deleteAppointment = (id)=>{
    const query = {_id: ObjectId(id)};
    return appointmentsCollection.deleteOne(query)
}