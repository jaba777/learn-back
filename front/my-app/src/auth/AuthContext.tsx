import axios from "axios";
import { createContext, useEffect, useState } from "react";


  interface current {
        username: string,
        email: string,
        password: string
    }

interface TodosContextProps {
    login: (inputs: any)=> void;
    logout: (inputs: any) => void;
    createPost: (inputs: any)=>void;
    currentUser: current
    
  }


export const AuthContext = createContext<TodosContextProps | null | any>(null);

export const AuthContextProvider = ({children}:any) => {

    const printItems:any = localStorage.getItem("user");

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(printItems) || null
      );

      
    
      const login = async (inputs:any) => {
        const res = await axios.post("http://localhost:4001/login", inputs);
        setCurrentUser(res.data);
        
      };
    
      const logout = async (inputs:any) => {
       // await axios.post("http://localhost:4001/logout");
        setCurrentUser(null);
      };

      const createPost=async (input:any)=>{
         await axios.post("http://localhost:4001/posts",input)
      }

      
    
      useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
       
      }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,login, logout,createPost }}>
      {children}
    </AuthContext.Provider>
  )
}


