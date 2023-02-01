import express,{Request,Response, Application} from 'express';
import { createConnection } from 'typeorm';
import {User} from './Entities/User';
const dotenv =require('dotenv').config();
import parser from 'body-parser';




const app:Application=express();

app.use(parser.json())

createConnection({
    type: "mysql",
    host: process.env.HOST_NAME,
    username: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User]
})

app.get('/',(req:Request,res: Response): void=>{
    User.find().then((data)=>{
        res.json(data)
    })
})

app.post('/',(req:Request,res: Response): void=>{
   User.insert({
    username: 'Jaba',
    email: 'tskhovreba@gmail.com',
    password: 'jaba123'
   });

   res.end();
})

app.listen(4001,(): void=>{
    console.log('server Running!');
    console.log(process.env.HOST_NAME)
})