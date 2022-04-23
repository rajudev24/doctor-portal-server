import express from 'express'

import {saveUser} from '../controllers/usersContrl.js';

const router = express.Router();

router.post('/users', saveUser )

export default router