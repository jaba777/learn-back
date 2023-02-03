import express,{Request,Response, Application} from 'express';
import { DataSource } from 'typeorm';
import {User} from './Entities/User';
import {Posts} from './Entities/Posts';
const dotenv =require('dotenv').config();
import parser from 'body-parser';




const app:Application=express();

app.use(parser.json())

const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_NAME,
    username: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User,Posts]
})

myDataSource
.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

app.get('/users', async function(req:Request,res:Response){

    const users = await myDataSource.getRepository(User).find()
    res.json(users)

})

app.post("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})



app.listen(4001,(): void=>{
    console.log('server Running!');
   
})