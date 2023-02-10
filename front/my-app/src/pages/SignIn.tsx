import React from 'react'

import {Link} from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='w-full min-h-screen bg-slate-700 flex justify-center items-center'>
      <div className='border-2 border-indigo-600 p-3.5 w-80	max-w-7xl'>
        <form className='flex flex-col gap-4 text-white'>
          <div className='flex flex-col'>
            <label htmlFor="email">Email:</label>
            <input type="text" className='outline-none p-1 text-black' id='email' />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password">Password:</label>
            <input type="password" className='outline-none p-1 text-black' id='password' />
          </div>

          <Link to='/register' className='ease-in duration-300 text-teal-300 hover:text-teal-600'>register</Link>

          <div className='flex'>
            <button className='bg-slate-800	 py-1.5 px-8'>Add</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default SignIn
