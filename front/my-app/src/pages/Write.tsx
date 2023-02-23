import React, { useEffect, useState,useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {AuthContext} from '../auth/AuthContext';


const Write = () => {


  const postCreate= useContext(AuthContext);

  

  const [postTitle,setPostTitle]=useState<string>();

  const [title,setTitle]=useState<any>();

  const titleHandler=(e:any)=>{
    setTitle(e.currentTarget.value);
  }


  const postSubmitHandler= async (event:any)=>{
    event.preventDefault();
    try{
      
    }catch(err){

    }
  }



  return (
    <div>

      <div className='flex flex-col gap-2	mx-auto  mt-11 w-2/4'>

    <form onSubmit={postSubmitHandler}>

      <div>
       <input type="text" placeholder='Title' className='p-2 outline-none border border-current w-full' 
       
       onChange={titleHandler} />
      </div>
        <div className='h-52 overflow-scroll border-solid border-2 border-stone-500 w-full'>
            <ReactQuill theme='snow' className='h-full w-full border-none' value={postTitle} onChange={setPostTitle} />
        </div>
        
          <button type='submit' className='ease-out duration-300 text-white bg-lime-400 p-1 hover:bg-lime-600'
          onClick={postSubmitHandler}>Submit</button>
        
     </form>
      
      </div>
      
    </div>
  )
}

export default Write
