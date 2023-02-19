import React,{useContext, useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Img/logo.jpg';
import {AuthContext} from '../auth/AuthContext';

const Header = () => {

    const logout=useContext(AuthContext);


    const logoutHandler=(event:any)=>{
      event.preventDefault();
      logout?.logout(event);
    }

  return (
    <header className='w-full bg-slate-500 text-white py-2.5 px-3.5'>
      <div className='flex justify-between items-center'>

        <div className='w-28 h-28'>
            <img src={Logo} 
            alt="" className='w-full h-full object-contain' />
        </div>

        <div>
         <ul className='flex items-center gap-14 mr-6'>
            <li><Link to='/about'>About</Link></li>
            <li>
                {logout?.currentUser?.body.username}
            </li>

            <li className='cursor-pointer w-16 h-16 border-solid border border-black rounded-full flex justify-center items-center 
            ease-in duration-300 hover:bg-sky-700' onClick={logoutHandler}>Logout</li>
         </ul>
        </div>

      </div>
    </header>
  )
}

export default Header
