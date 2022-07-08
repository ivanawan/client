import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import axios from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';


const ListTransaction = () => {
  const user = useSelector((state)=>state.user);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  const {data}=useQuery('transaction', async ()=>{
    return await axios.get("/transaction");
  });
check(data);


function textcolor(item){
if(item ==="Approve"){
  return "text-green-400";
}

if(item === "Cancel"){
  return "text-rose-500";
}

if(item === "Pending"){
  return "text-yellow-500";
}
}

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
    {data?.data.data?.transactions.map(item=>
      <tr key={item.id}>
        <th>{item.id}</th>
        <td>{item.User.fullName}</td>
        <td className=' text-sky-600'>{item.attachment}</td>
        <td>{item.Purchases[0].Book.title}</td>
        <td className={item.status === "Approve" ? "text-green-400":" text-rose-500"}>Rp. {item.totalPayment}</td>
        <td className={textcolor(item.status)}>{item.status}</td>
      </tr>
        )}
     
  
    
       
    </tbody>
  </table>
</div>

             </div>

            </div>
        </Layout>
    );
}

export default ListTransaction;