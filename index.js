const express = require('express')
const app = express()
const cors = require('cors');
const admin = require("firebase-admin");
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const serviceAccount = require('./doctors-portal-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qhwuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//JWT Token
async function verifyToken(req, res, next) {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
        }
        catch {

        }
    }
    next();
}

async function run(){
    try{
        await client.connect();
        const database = client.db('doctors_portal');
        const usersCollection = database.collection('users');
        const doctorsCollection = database.collection('doctors');
        const doctorsAvailableCollection = database.collection('available-doctors')
        const appointmentsCollection = database.collection('appointments');

        //Save users data
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        });
        //Save doctors data
        app.post('/doctors', async (req, res) => {
            const doctors = req.body;
            const result = await doctorsCollection.insertOne(doctors);
            res.json(result);
        });
        //Save Doctors Availability & more Information
        app.post('/availabledoctor', async(req, res)=>{
            const available = req.body
            const result = await doctorsAvailableCollection.insertOne(available)
            res.json(result)
        })
        // Save users Appointments
        app.post('/appointments', async(req, res)=>{
            const appointment = req.body;
            // console.log(appointment);
            const result = await appointmentsCollection.insertOne(appointment);
            res.json(result)
        })
        //Show Appointments by user
        app.get('/appointments', verifyToken, async(req, res)=>{
            const email = req.query.email;
            const query = {email:email}
            const cursor = appointmentsCollection.find(query);
            const appointments = await cursor.toArray();
            res.json(appointments);
        })
         //Show Appointments by Doctors
        app.get('/appointments/:email', verifyToken, async(req, res)=>{
            const email = req.params.email;
            const query = {doctorEmail:email};
            const cursor = appointmentsCollection.find(query);
            const appointments = await cursor.toArray();
            res.json(appointments);
        })
        //Show Available Docotors by Date
        app.get('/availabledoctor', async(req, res)=>{
            const date = new Date(req.query.date).toLocaleDateString();
            const query = {startDate : date}
            const cursor = doctorsAvailableCollection.find(query);
            const doctors = await cursor.toArray();
            res.json(doctors)
        })

        //Verify doctor
        app.get('/doctors/:email', async(req, res) =>{
            const email = req.params.email;
            const query = {email:email};
            const doctor = await doctorsCollection.findOne(query);
            let isDoctor = false;
            if(doctor?.role === 'doctor' ){
                isDoctor = true
            }
            res.json({doctor:isDoctor})
        })

        //User & Doctor cancel the appointments
        app.delete('/appointments/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await appointmentsCollection.deleteOne(query)
            res.json(result)
        })

        

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})