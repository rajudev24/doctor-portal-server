import express from 'express'
const router = express.Router();
import {saveDoctor, saveDoctorInfo, getAvailableDoctors,getVerifyDoctors} from '../controllers/doctorsContrl.js'

router.post('/doctor', saveDoctor )
router.post('/availabledoctor', saveDoctorInfo )
router.get('/availabledoctor', getAvailableDoctors )
router.get('/doctors/:email', getVerifyDoctors)

export default router