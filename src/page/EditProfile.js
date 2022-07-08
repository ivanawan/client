import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { mutlipart } from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';

const EditProfile = () => {
    const user = useSelector((state)=>state.user);
    const [form, setForm] = useState({fullName:"",gender:"",address:"",phone:"",avatar:""});
    mutlipart.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    function submit(){
    mutlipart.post('/auth/profile',form).then(res=>{
        check(res);
        
    })
    }
    return (
        <Layout>
        <div className=' flex justify-center min-h-[79vh]'>
        <div className ='w-[55rem]'>
        <p className='card-title '>Add Book</p>
        <input type="text" value={form.fullName} onChange={(e)=>{setForm({...form, fullName:e.target.value})}} placeholder="Full Name" className="input input-bordered input-sm w-full mt-5" />
        <input type="text" value={form.gender} onChange={(e)=>{setForm({...form, gender:e.target.value})}} placeholder="Gender" className="input input-bordered input-sm w-full mt-5" />
        <input type="number" value={form.phone} onChange={(e)=>{setForm({...form, phone:e.target.value})}} placeholder="Phone" className="input input-bordered input-sm w-full mt-5" />
        <textarea onChange={(e)=>{setForm({...form, address:e.target.value})}} className='input input-bordered input-sm w-full h-20 mt-3' placeholder='Address' id="" cols="30" rows="10">{form.address}</textarea>
        <input type="file" onChange={(e)=>{setForm({...form, avatar:e.target.files[0]})}} placeholder="Avatar" className="input input-bordered input-sm w-full mt-5" />
        <div className=' flex justify-end'>
        <button type='submit' onClick={()=>{submit()}} className=' bg-slate-900 text-white flex gap-2 w-32 p-1 px-2 rounded'>Add Book <img src="/addbook1.png"  alt="add book" /></button>
        </div>
        </div>
        </div>
        </Layout>
    );
}

export default EditProfile;
