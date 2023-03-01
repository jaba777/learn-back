import express,{Request,Response, Application, NextFunction} from 'express';
import { DataSource } from 'typeorm';
import User from './Entities/User';
import Posts from './Entities/Posts';
const dotenv =require('dotenv').config();
import parser from 'body-parser';
import cors from 'cors';
import * as jwt from 'jsonwebtoken';
import config from './config/config';
import nodemailer from 'nodemailer';



const app:Application=express();

app.use(parser.json())
app.use(cors())
app.set("view engine","ejs");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tskhovreba777@gmail.com',
        pass: 'jaba9293709p13'
    }
})

const myDataSource = new DataSource({
    migrationsTableName: 'migration',
    type: "mysql",
    port: 3306,
    host: process.env.HOST_NAME,
    username: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User,Posts]
})

const JWT_SECRET ="hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

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

app.post("/users", async function (req: Request, res: Response,next:NextFunction) {
    const {username,email,password}=req.body;
    const user = new User();
    user.username=username;
    user.email=email;
    user.password=password;
 
    const userResponsitory = myDataSource.getRepository(User)

    try{
        user.hashPassword()
       await userResponsitory.save(user)
        res.status(201).json({
            message: 'User created!'
        })
    }catch(err){
        res.status(409).json('email or name has alrady use!')
        
    }

    
    
})


app.post("/login", async function (req: Request, res: Response) {
    const {email,password} = req.body;

    if(!(email && password)){
        res.status(409).json({message: 'email & pass are required'})
    }

    const authRepo=myDataSource.getRepository(User);
    let user:User;
    try{

        user = await authRepo.findOneOrFail({
            where: {
                email
            }
        })

    }catch(err){
        return res.status(452).json({message: 'Email or Password is incorrect'})
    }

    if(!user.checkPassword(password)){
       return res.status(452).json({message: 'password incorrect'})
    }


    const token = jwt.sign(
        {userId: user.id,username: user.username},
        config.jwtSecret,{expiresIn: '1d'}
    )
    return res.setHeader('auth',token).status(200).json({message: 'login',token,body:{ id:user.id,username: user.username, email:user.email}});
    
})


app.get('/posts', async function (req: Request, res: Response,next:NextFunction){
    const posts = await myDataSource.getRepository(Posts).find()
        res.json(posts)

})


app.post('/posts', async function (req: Request, res: Response,next:NextFunction){
    const {title,desc,userId} =req.body;
    const posts = new Posts();
    posts.title=title;
    posts.desc=desc;
    posts.user=userId;
    posts.userId=userId;
    

    const userResponsitory = myDataSource.getRepository(Posts);

    try{
        await userResponsitory.save(posts)
    
        res.status(201).json({
            message: 'post created!'
        })
    }catch(error){
        res.status(409).json(error)
    }

})

app.put("/posts/:id", async function (req: Request, res: Response) {
    const post:any = await myDataSource.getRepository(Posts).findOneBy({
        id: req.params.id,
    }) 
    myDataSource.getRepository(Posts).merge(post, req.body)
    const results = await myDataSource.getRepository(Posts).save(post)
    return res.send(results)
})


app.delete("/posts/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Posts).delete(req.params.id)
    return res.send(results)
})

app.get('/user-login',async function(req:Request,res:Response){

    const userRepo= myDataSource.getRepository(User);

    const userFound= await userRepo.find({
        relations: {
            posts: true
        },
    });

    res.json(userFound)
    

})


app.post('/forgot-password',async function(req:Request,res:Response){
  const {email}=req.body;
  const authRepo=myDataSource.getRepository(User);
 
  if(!email){
    res.status(401).json({message: 'enter your email'});
  }

  try {
    const userfind:any=await authRepo.findOne({where: {email: email}});
    console.log('userfined',userfind)

    const token = jwt.sign(
        {userId: userfind.id},
        config.jwtSecret,{expiresIn: '120s'}
    )

    console.log('token',token)

    //const setusertoken= await authRepo.findOne

  } catch (error) {

  }




})

/*app.get('/reset-password/:id/:token', async function(req:Request,res:Response){

    const {id,token}=req.params;
    const authRepo=myDataSource.getRepository(User)
    const oldUse=authRepo.findOne({where: {id}});

    if(!oldUse){
        res.json({message: 'User not Exists !'})
    }
    try{

       const verify:any = jwt.verify(token,config.jwtSecret)
       res.render("./views/index.ejs",{email: verify.email})
    }catch(err){
        console.log(err)
        res.send("Not verified!")
    }

})*/

app.listen(4001,(): void=>{
    console.log('server Running!');
   
})