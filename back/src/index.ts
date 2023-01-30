import express,{Request,Response, Application} from 'express';
import { createConnection } from 'typeorm';
import {User} from './Entities/User';


const app:Application=express();

createConnection({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "jaba9293709p13",
    database: "todo",
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

app.listen(3001,(): void=>{
    console.log('server Running!');
})