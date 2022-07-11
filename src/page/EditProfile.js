import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import  { mutlipart } from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';

const EditProfile = () => {
    const user = useSelector((state)=>state.user);
    const [form, setForm] = useState({fullName:"",gender:"",address:"",phone:"",avatar:""});
    mutlipart.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    useEffect(() => {
      mutlipart.get(`/api/v1/auth/profile`).then(res=>{
        check(res);
        setForm({...form, fullName:res?.data.data.Profil.fullName, gender:res?.data.data.Profil.gender,address:res?.data.data.Profil.address,phone:res?.data.data.Profil.phone})
      })

        return () => {
            console.log('clear');
        };
    }, []);

    function submit(e){
        e.preventDefault();
    mutlipart.post('/api/v1/auth/profile',form).then(res=>{
        check(res);
        console.log(res);
        if(res.data.status === "success"){
            window.location.href = "/profil";
        }
    })
    }
    return (
        <Layout>
        <div className=' flex justify-center min-h-[79vh]'>
        <div className ='w-[55rem]'>
        <p className='card-title '>Edit Profil</p>
        <form onSubmit={(e)=>{submit(e)}}>
        <input type="text" value={form.fullName} onChange={(e)=>{setForm({...form, fullName:e.target.value})}} placeholder="Full Name" className="input input-bordered input-sm w-full mt-5" />
        <select value={form.gender} onChange={(e)=>{setForm({...form, gender:e.target.value})}} className="select select-bordered select-sm w-full mt-5">
           <option disabled selected>gender</option>
           <option>Male</option>
           <option>Female</option>
        </select>
        <input type="number" value={form.phone} onChange={(e)=>{setForm({...form, phone:e.target.value})}} placeholder="Phone" className="input input-bordered input-sm w-full mt-5" />
        <textarea onChange={(e)=>{setForm({...form, address:e.target.value})}} value={form.address} className='input input-bordered input-sm w-full h-20 mt-5' placeholder='Address' id="" cols="30" rows="10"></textarea>
        <input type="file" onChange={(e)=>{setForm({...form, avatar:e.target.files[0]})}} placeholder="Avatar" className="input input-bordered input-sm w-full mt-3" required/>
        <div className=' flex justify-end'>
        <button type='submit'  className=' bg-slate-900 text-white gap-2 w-32 p-1 px-2 rounded mt-5'>Edit Profile </button>
        </div>
        </form>
        </div>
        </div>
        </Layout>
    );
}

export default EditProfile;
