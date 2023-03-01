import { useContext,useState } from 'react';
import {Link} from 'react-router-dom'
import {AuthContext} from '../auth/AuthContext';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {loginSchema} from '../validations/UserValidation';



type login = {
  email: string;
  password: string;
}


const SignIn = () => {


  const [forgetPass,setForgetPass]=useState<boolean>(false);

  const [err,setErr]=useState<string>('');

  const {register,handleSubmit,reset,formState: { errors }} = useForm<login>({
    resolver: yupResolver(loginSchema)
  });

  const login = useContext(AuthContext)




  const LogIn = async (event:any) => {
   

    try {
      await login?.login(event)
    } catch (error:any) {
      console.log(error.response.data.message)
      setErr(error.response.data.message)
      setForgetPass(true)
    }

    reset({
      email: '',
      password: ''
    })
  };



  return (
    <div className='w-full h-screen	 flex justify-center items-center'>
      <div className='border-2 border-indigo-600 p-3.5 w-80	max-w-7xl'>
        <form className='flex flex-col gap-4 text-white' onSubmit={handleSubmit(LogIn)}>
          <div className='flex flex-col'>
            <label htmlFor="email">Email:</label>
            <input type="email" className='outline-none p-1 text-black' id='email'
            {...register('email')} />
          </div>
          

          <p>{errors.email?.message}</p>

          <div className='flex flex-col'>
            <label htmlFor="password">Password:</label>
            <input type="password" className='outline-none p-1 text-black' id='password'
            {...register('password')} />
          </div>

          <p>{errors.password?.message}</p>

          <Link to='/register' className='ease-in duration-300 text-teal-300 hover:text-teal-600'>register</Link>

         { forgetPass && <Link to='/forgot-password' className='ease-in duration-300 text-teal-300 hover:text-teal-600'>Forgot password?</Link>}
          
          <p>{err}</p>

          <div className='flex'>
            <button className='bg-slate-800	 py-1.5 px-8' onClick={handleSubmit(LogIn)}>Add</button>
          </div>

        </form>
        
      </div>
    </div>
  )
}

export default SignIn
