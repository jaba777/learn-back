import React,{useContext} from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import {AuthContext} from './auth/AuthContext';





interface User{
    loggedIn: boolean;
}
const useAuth=()=>{
  const currentUser = useContext(AuthContext)
  const user:User={loggedIn: false}

  if(currentUser?.currentUser !== null){
    user.loggedIn=true;
  } else{
    user.loggedIn=false;
  }

    return user && user.loggedIn
}

const ProtectRoutes = () => {
  const isAuth=useAuth();
  return isAuth ? <Outlet/>: <Navigate to='/'/>
}

export default ProtectRoutes
