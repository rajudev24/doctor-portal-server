import  {MongoClient}  from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qhwuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const db =  () =>{
    client.connect();
    const database = client.db('doctors_portal');
    return database;
}







