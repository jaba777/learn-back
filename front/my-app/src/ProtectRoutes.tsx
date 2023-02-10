import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';


interface User{
    loggedIn: boolean;
}
const useAuth=()=>{
    const user:User = {loggedIn: false};
    return user && user.loggedIn
}

const ProtectRoutes = () => {
  const isAuth=useAuth();
  return isAuth ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectRoutes
