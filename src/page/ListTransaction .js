import React from 'react';
import Layout from './layout/Layout';


const ListTransaction = () => {
    return (
        <Layout>
            <div className=' flex justify-center min-h-[78vh]'>
             <div className=' w-[55rem] '>
                <p className=' card-title'>Transaction</p>
 <div className="overflow-x-auto mt-3">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr className=' text-red-600'>
        <th>No</th>
        <th>User</th>
        <th>Evidence of Transfer</th>
        <th>Product Purchased</th>
        <th>Total Payment</th>
        <th>Status Payment</th>
        
      </tr>
    </thead>
    <tbody>
    
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
     
  
    
       
    </tbody>
  </table>
</div>

             </div>

            </div>
        </Layout>
    );
}

export default ListTransaction;