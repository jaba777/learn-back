import React, { useState,useContext } from 'react'
import {AuthContext} from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Write = () => {


  const postCreate= useContext(AuthContext);

  const [postTitle,setPostTitle]=useState<string>('');

  const [title,setTitle]=useState<any>();

  const navigate = useNavigate();


  const titleHandler=(e:any)=>{
    setTitle(e.currentTarget.value);
  }

  const postHandler=(event:any)=>{
    setPostTitle(event.target.value)
  }


  const postSubmitHandler= async (event:any)=>{
    event.preventDefault();

    if(title === '' || postTitle === ''){
      return
    }

    try{
      await axios.post('http://localhost:4001/posts',{
        title: title,
        desc: postTitle,
        userId: postCreate?.currentUser?.body.id
      })

      
      setPostTitle('');
      setTitle('');
      navigate('/');

    }catch(err){
      console.log(err)
    }
    
  }



  return (
    <div>

   <div className='flex flex-col gap-2	mx-auto max-w-full	 post-write text-white'>

    <form onSubmit={postSubmitHandler}>

      <div>
       <input type="text" placeholder='Title' className='p-2 outline-none border border-current w-full bg-inherit' 
       
       onChange={titleHandler} />
      </div>
        <div className='h-52 border-solid border-2 w-full'>

            <textarea id="w3review" name="w3review"  className='h-full w-full border-none p-2 bg-inherit'
             onChange={postHandler}/>

        </div>
        
          <button type='submit' className='ease-out duration-300 text-white bg-lime-400 p-1 hover:bg-lime-600'
          onClick={postSubmitHandler}>Submit</button>
        
     </form>
      
      </div>
      
    </div>
  )
}

export default Write
