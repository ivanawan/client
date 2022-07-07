import React from 'react';
import Layout from './layout/Layout';

const Complain = () => {
    return (
     <Layout>
        <div className='flex justify-center min-h-[79vh] pt-2 pb-2'>
            <div className='w-[65rem] gap-3 flex'>
                <div className=' bg-zinc-200 rounded w-1/4 h-max'>
                <hr />
                 <div className=' flex h-20 gap-5 items-center '>
                    <img src="/1.jpg" className=' w-14  object-cover ml-3 h-14 rounded-full' alt="" />
                    <p >baharudin mx</p>
                 </div>
                </div>
                <hr />

                <div className=' rounded w-3/4 bg-zinc-200  '>
                    <div className='h-full mb-2 flex rounded flex-col'>
                    <div className='flex items-center h-16 gap-3 bg-zinc-300 rounded-t'>
                  <img src="/1.jpg" className=' w-14  object-cover ml-3 h-14 rounded-full' alt="" />
                   <div>
                    <p className=' font-semibold'>baharudin</p>
                    <p className='font-thin flex gap-2'> <div className='h-2 w-2 rounded bg-green-600 mt-2 '></div>  online</p>
                    </div>
                    </div>

                    <div className=' self-end'>
                        <p>hjh</p>
                    </div>
                  </div>
                   <div className='flex gap-2'>
                   <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full " />
                      <button className='bg-zinc-300 rounded w-14'>+</button>
                   </div>
                    </div>

                 
                </div>
             
            </div>
        
     </Layout>
    );
}

export default Complain;
