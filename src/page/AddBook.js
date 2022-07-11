import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { mutlipart } from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';

const AddBook = () => {
    const [form, setForm] = useState({ title:"",publicationDate:"", pages:"",ISBN:"",author:"",price:"",description:"",bookAttachment:"",thumbnail:"" });
    const user = useSelector((state)=>state.user);
    mutlipart.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;


    function submit(e){
      e.preventDefault();
      mutlipart.post('/api/v1/book',form).then(res=>{
       check(res);
       if(res.data.status === "success"){
        window.location.href = "/";
      }
      });
    }

    return (
       <Layout>
       <div className=' flex justify-center min-h-[79vh]'>
        <div className ='w-[55rem]'>
        <p className='card-title '>Add Book</p>

   <form onSubmit={(e)=>{submit(e)}}>

  <input type="text" onChange={(e)=>{ setForm({...form , title:e.target.value})}} placeholder="Title" className="input input-bordered input-sm w-full mt-5" />
  <input type="date" onChange={(e)=>{ setForm({...form , publicationDate:e.target.value})}} placeholder="Publish date" className="input input-bordered input-sm w-full mt-3" />
  <input type="number" onChange={(e)=>{ setForm({...form , pages:e.target.value})}} placeholder="Pages" className="input input-bordered input-sm w-full mt-3" />
  <input type="text" onChange={(e)=>{ setForm({...form , author:e.target.value})}} placeholder="Author" className="input input-bordered input-sm w-full mt-3" />
  <input type="number" onChange={(e)=>{ setForm({...form , ISBN:e.target.value})}} placeholder="ISBN" className="input input-bordered input-sm w-full mt-3" />
  <input type="number" onChange={(e)=>{ setForm({...form , price:e.target.value})}} placeholder="Price" className="input input-bordered input-sm w-full mt-3" />

<textarea onChange={(e)=>{ setForm({...form , description:e.target.value})}} className='input input-bordered input-sm w-full h-20 mt-3' placeholder='About This Book' id="" cols="30" rows="10"></textarea>
<label >thumbnail</label>
<input type="file" onChange={(e)=>{ setForm({...form , thumbnail:e.target.files[0]})}} className="input input-bordered input-sm w-full mt-3" required/>
<label>ebook</label>
<input type="file" onChange={(e)=>{ setForm({...form , bookAttachment:e.target.files[0]})}} className="input input-bordered input-sm w-full mt-3" required/>
<div className=' flex justify-end'>
    <button type='submit' className=' bg-slate-900 text-white flex gap-2 w-32 p-1 px-2 rounded'>Add Book <img src="/addbook1.png"  alt="add book" /></button>
</div>
   </form>
        </div>
       </div>
       </Layout>
    );
}

export default AddBook;
