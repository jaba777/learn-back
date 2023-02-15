import React,{useState} from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {userSchema} from '../validations/UserValidation';
import { string } from 'yup';

type register = {
  username: string;
  email: string;
  password: string;
}

const Register = () => {

  const [err,setErr]=useState<string>('');


const {register,handleSubmit,reset,formState: { errors }} = useForm<register>({
  resolver: yupResolver(userSchema)
});


    const submitHandler=async (event:register) =>{
        try{
           await axios.post("http://localhost:4001/users",event)

        }catch(err:any){
          setErr(err.response.data)
        }

       reset({
        username: '',
        email: '',
        password: ''
       })

    }

  return (
    <div className='w-full min-h-screen bg-slate-700 flex justify-center items-center'>
    <div className='border-2 border-indigo-600 p-3.5 w-80	max-w-7xl'>
      <form className='flex flex-col gap-4 text-white' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex flex-col'>
          <label htmlFor="username">Username:</label>
          <input type="text" className='outline-none p-1 text-black' id='username' 
          {...register('username')} />
          

        </div>

        <p>{errors.username?.message}</p>

        <div className='flex flex-col'>
          <label htmlFor="email">Email:</label>
          <input type="text" className='outline-none p-1 text-black' id='email' 
          {...register('email')}/>
        </div>

        <p>{errors.email?.message}</p>

        <div className='flex flex-col'>
          <label htmlFor="password">Password:</label>
          <input type="password" className='outline-none p-1 text-black' id='password' 
          {...register('password')} />
        </div>

        <p>{errors.password?.message}</p>

        {err && <p>{err}</p>}

        <div className='flex'>
          <button className='bg-slate-800	 py-1.5 px-8' onClick={handleSubmit(submitHandler)}>Register</button>
        </div>

      </form>
    </div>
  </div>
  )
}

export default Register
