import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {

  const [email,setEmail]=useState();

  const emailChange=(e:any)=>{
    setEmail(e.currentTarget.value);
  }

  useEffect(()=>{
    console.log(email)
  },[email])

 const submitHandler= async (event:any)=>{
   event.preventDefault();

   try{
    await axios.post('http://localhost:4001/forgot-password',{
      email: email
    })
   }catch(error:any){
    alert(error.message)
   }

 }

return (
<>

  <div className='w-full h-screen	 flex justify-center items-center'>
      <div className='border-2 border-indigo-600 p-3.5 w-80	max-w-7xl'>
        <form className='flex flex-col gap-4 text-white' onSubmit={submitHandler}>
          <div className='flex flex-col'>
            <label htmlFor="email">Email:</label>
            <input type="email" className='outline-none p-1 text-black' id='email' onChange={emailChange} />
          </div>
          
          <Link to='/' className='ease-in duration-300 text-teal-300 hover:text-teal-600'>Log in</Link>

          <div className='flex'>
            <button className='bg-slate-800	 py-1.5 px-8' onClick={submitHandler}>Submit</button>
          </div>

        </form>
        
      </div>
   </div>

      
 </>
  )
}

export default ForgotPassword
