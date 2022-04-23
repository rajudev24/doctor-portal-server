import express from 'express'
import {db} from '../Config/config.js';
const database = db();

// const app = express()
// app.use(express.json());

const usersCollection = database.collection('users');

export const createUser = (user)=>{
    return usersCollection.insertOne(user);
}