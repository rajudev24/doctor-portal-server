import express from 'express'
import {db} from '../Config/config.js';
const database = db();

// const app = express()
// app.use(express.json());

const doctorsCollection = database.collection('doctors');
const doctorsAvailableCollection = database.collection('available-doctors')

export const createDoctor = (doctor)=>{
    return doctorsCollection.insertOne(doctor);
}

export const createDoctorInfo = (info) =>{
    return doctorsAvailableCollection.insertOne(info)
}

export const getDoctors = (date)=>{
    const getDate = new Date(date).toLocaleDateString();
    const query = {startDate : getDate}
    return doctorsAvailableCollection.find(query);
}

export const verifyDoctor =  (email)=>{
    const query = {email:email};
    return doctorsCollection.findOne(query)
}