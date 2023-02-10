import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {

    interface register{
        username: string;
        email: string;
        password: string;
    }

    const [username,setUsername]=useState<string>('');

    const [email,setEmail]=useState<string>('');
    
    const [password,setPassword]=useState<string>('');

    const usernameHandlechange=(e:any)=>{
        setUsername(e.target.value);
    }

    const emailHandlechange=(e:any)=>{
        setEmail(e.target.value);
    }

    const passwordHandlechange=(e:any)=>{
        setPassword(e.target.value);
    }

    const handleSubmit=async (e:any) =>{
        e.preventDefault();

        const registerArray:register={
            username: username,
            email: email,
            password: password
        }

        console.log(registerArray)

        try{
            await axios.post("http://localhost:4001/users",registerArray)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='w-full min-h-screen bg-slate-700 flex justify-center items-center'>
    <div className='border-2 border-indigo-600 p-3.5 w-80	max-w-7xl'>
      <form className='flex flex-col gap-4 text-white' onSubmit={handleSubmit}>

        <div className='flex flex-col'>
          <label htmlFor="username">Username:</label>
          <input type="text" className='outline-none p-1' id='username' name='username' onChange={usernameHandlechange} />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="email">Email:</label>
          <input type="text" className='outline-none p-1 text-black' id='email' name='email' onChange={emailHandlechange} />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="password">Password:</label>
          <input type="password" className='outline-none p-1 text-black' id='password' name='password' onChange={passwordHandlechange} />
        </div>

        <div className='flex'>
          <button className='bg-slate-800	 py-1.5 px-8' onClick={handleSubmit}>Register</button>
        </div>

      </form>
    </div>
  </div>
  )
}

export default Register
