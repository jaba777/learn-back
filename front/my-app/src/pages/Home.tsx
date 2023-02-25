import React,{ useEffect,useContext,useState } from 'react';
import {AuthContext} from '../auth/AuthContext';
import axios from 'axios';
import deleteIcon from '../Img/delete.png';
import editIcon from '../Img/edit.png';


const Home = () => {

  const posts = useContext(AuthContext);

  const [postsState,setPostsState]=useState<any>([]);

  const [bool,setBool]=useState<boolean>(false)

  const [editId,setEditId]=useState<number | string>();

  const [editTitle,setEditTitle]=useState();
  const [editDesc,setEditDesc]=useState();


  useEffect(()=>{
     const postGet= async ()=>{
        try{
          const homePosts=await axios.get('http://localhost:4001/posts')
          setPostsState(homePosts.data)
          console.log(homePosts.data)
        }catch(err){
          console.log(err)
        }
    }

    postGet()
  },[])


  const postDelete= async (id:any)=>{

    try{
      await axios.delete(`http://localhost:4001/posts/${id}`)
      window.location.reload();
    }catch(err){
      console.log(err)
    }

  }

  const editIdfinder=(id:number|string)=>{
    setEditId(id)
    setBool(true)
  }

  const postEditHandler= async (event:any)=>{
    event.preventDefault();

    try{
      await axios.put(`http://localhost:4001/posts/${editId}`,{
        title: editTitle,
        desc: editDesc,
        userId: posts?.currentUser?.body.id
      })
      setBool(false)
      window.location.reload();
    }catch(error){
      console.log(error)
    }

  }




  return (
    <div>

      <div className={bool ? 'edit' : 'none'}>
        <div className="edit-box">

          <div className='title'>
            <input type="text" onChange={(e:any)=> setEditTitle(e.target.value)} />
          </div>

          <div className="desc">
           <textarea id="w3review" name="w3review"  className='desc-area' onChange={(e:any)=> setEditDesc(e.target.value)}/>
          </div>

          <div className="edit-btn">
            <button type='submit' onClick={postEditHandler}>Edit</button>
          </div>

        </div>
      </div>

     <div className='flex flex-col gap-3 mt-12 w-4/5 mx-auto'>
        {postsState.map((item:any,index:number)=> (
         <div key={index} className='border-solid border border-gray-600 p-3 flex justify-between gap-4'>
          <div className='w-9/12'>
            <h3>{item.title}</h3>
            <p className='text-sm'>{item.desc}</p>
          </div>
          

          {posts?.currentUser?.body.id == item.userId && (
          <div className='flex gap-2'>

            <span>
              <img src={editIcon} alt="edit" className='w-8 cursor-pointer object-contain'
               onClick={()=>editIdfinder(item.id)}/>
            </span>

           <span>
            <img src={deleteIcon} alt="delete" className='w-8 cursor-pointer object-contain' onClick={ ()=> postDelete(item.id)} />
           </span>
           

          </div>
          )}

         </div>
        ))}
     </div>
    </div>
  )
}

export default Home
