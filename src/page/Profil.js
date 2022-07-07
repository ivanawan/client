import React from 'react';
import Layout from './layout/Layout';

const Profil = () => {
    return (
        <Layout>
            <div className=' mx-60'>
           <p className=' mt-16 card-title'>
            Profil
           </p>
           <div className=' bg-red-200 rounded-md p-5 flex justify-between'>
            <div>

            <div className='flex gap-2'>
            <img src="/email.png" className='mt-2 w-10 h-8' alt="email" />
            <div>
             <p className=' text-black'>egigans@gmail.com</p>
             <p className=' text-slate-500'>Email</p>
            </div>
            </div>

            <div className='flex gap-2 mt-4'>
            <img src="/Vector.png" className='mt-2 w-10 h-10' alt="email" />
            <div>
             <p className=' text-black'>Male</p>
             <p className=' text-slate-500'>Gender</p>
            </div>
            </div>

            <div className='flex gap-2 mt-4'>
            <img src="/tlp.png" className='mt-2 w-10 h-10' alt="email" />
            <div>
             <p className=' text-black'>081391554252</p>
             <p className=' text-slate-500'>Mobile Phone</p>
            </div>
            </div>

            <div className='flex gap-2 mt-4'>
            <img src="/maps.png" className='mt-2 w-10 h-10' alt="email" />
            <div>
             <p className=' text-black'>jl karangan no 58</p>
             <p className=' text-slate-500'>Address</p>
            </div>
            </div>

            </div>
        
            <div>
                <img src="/1.jpg" className='h-48 w-48' alt="" />
                <button className=' bg-red-600 text-white w-full mt-4 p-1 rounded'>Edit Profile</button>
            </div>

           </div>
           <p className=' card-title mt-10 mb-10'>My Book</p>
           <div className=' grid grid-cols-4 mt-5  gap-16'>


  <div className='w-40 '>
  <img src="/sampul.png" className=' aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover' alt="sampul" />
  <p className='  text-lg font-bold mt-1'>hello</p>
  <p className=' text-sm text-slate-400'>by ivan setiawan</p>
<button className=' w-full bg-slate-700 text-white mt-2'>Download</button>
  </div>

  <div className='w-40 '>
  <img src="/sampul.png" className=' aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover' alt="sampul" />
  <p className='  text-lg font-bold mt-1'>hello</p>
  <p className=' text-sm text-slate-400'>by ivan setiawan</p>
  <button className=' w-full bg-slate-700 text-white'>Download</button>
  </div>

  <div className='w-40 '>
  <img src="/sampul.png" className=' aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover' alt="sampul" />
  <p className='  text-lg font-bold mt-1'>hello</p>
  <p className=' text-sm text-slate-400'>by ivan setiawan</p>
  <button className=' w-full bg-slate-700 text-white'>Download</button>
  </div>

  <div className='w-40 '>
  <img src="/sampul.png" className=' aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover' alt="sampul" />
  <p className='  text-lg font-bold mt-1'>hello</p>
  <p className=' text-sm text-slate-400'>by ivan setiawan</p>
  <button className=' w-full bg-slate-700 text-white'>Download</button>
  </div>

  <div className='w-40 '>
  <img src="/sampul.png" className=' aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover' alt="sampul" />
  <p className='  text-lg font-bold mt-1'>hello</p>
  <p className=' text-sm text-slate-400'>by ivan setiawan</p>
  <button className=' w-full bg-slate-700 text-white'>Download</button>
  </div>

  </div>

            </div>
        </Layout>
    );
}

export default Profil;