
import { createDoctor, createDoctorInfo, getDoctors, verifyDoctor } from '../service/doctors.js'

export const saveDoctor = (req, res) => {
    const doctor = req.body;
    const result = createDoctor(doctor)
    return res.json(result)
}
export const saveDoctorInfo = (req, res) => {
    const info = req.body;
    const result = createDoctorInfo(info)
    return res.json(result)
}
export const getAvailableDoctors = async (req, res) => {
    const date = req.query.date;
    const doctors = getDoctors(date)
    const result = await doctors.toArray();
    return res.json(result)
}

export const getVerifyDoctors = async (req, res) => {
    const email = req.params.email;
    const doctor = await verifyDoctor(email)
    let isDoctor = false;
    if (doctor?.role === 'doctor') {
        isDoctor = true
    }
    res.json({ doctor: isDoctor })
}