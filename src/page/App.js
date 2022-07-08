import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../app/slice/Cart';
import axios from '../component/axios';
import { check } from '../component/check';
import './css/index.css';
import Layout from './layout/Layout';
import swal from 'sweetalert';

function App() {
  const user = useSelector((state)=>state.user);
  const {data}=useQuery('book', async ()=>{
    return await axios.get('/book');
  });
  check(data);


  return (
    <Layout>
  <div className="mt-10 mb-20">
  <p className=" text-center text-3xl font-semibold">With us, you can shop online & help</p>
  <p className=" text-center text-3xl font-semibold">save your high street at the same time</p>
 </div>
{user.login? <PromoBooklogin/> : <PromoBook/>}

<div className='  mt-28 mx-12'>
  <p className=' text-2xl font-semibold'>List Book</p>
  <div className=' grid grid-cols-6 mt-5  '>

  {data?.data.data.books.map(item=>
  <a href={`/detail/${item.id}`} key={item.id}>
  <div className='w-40 mt-7' >
  <img src={ `http://${window.location.hostname}:5000/public/upload/${item.thumbnail}`} className=' aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover' alt="sampul" />
  <p className=' text-base w-full font-semibold'>{item.title.substring(0,20) }</p>
  <p className=' text-sm text-slate-400'>by {item.author}</p>
  <p className='  text-lime-500 mt-3'>Rp. {item.price}</p>
  </div>
  </a>
)}


  </div>
</div>

    </Layout>
  );
}



function PromoBooklogin(){
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

  const {data}=useQuery('book', async ()=>{
    return await axios.get('/book');
  });

    let { data:myBook } = useQuery(
    "profilChache",
    async () => {
      const response = await axios.get("/auth/profile");
      check(response);
      return response.data.data.Profil?.PurchasesBooks.map(a => a.BookId);
    }
    );

    

    function addToCart(item) {
      dispatch(addItem(item));
      swal({
         text:"The product is successfully added to the cart",
         timer: 2000,
         buttons: false
         })
    }

    return(
<div className=' grid grid-flow-col overflow-x-auto mx-8 gap-8 scrollbar '>
{data?.data.data.books.map(item=>
<div className='flex  w-96 h-56 ' key={item.id}>
  <img src={ `http://${window.location.hostname}:5000/public/upload/${item.thumbnail}`} className=' aspect-[9/16] w-[40%] object-cover' alt="sampul" />
  <div className=' w-3/5 px-2 my-5 bg-white relative'>
<a href={`/detail/${item.id}`}>
<p className=' text-lg w-full font-semibold'>{item.title.substring(0,30)}</p>
</a>
<p className=' text-sm text-slate-400'>by {item.author}</p>

<p className=' mt-1 text-sm text-black text-justify'>
 {item.description.substring(0, 55)}
</p>
<div className=' absolute bottom-0 w-full'>
<p className=' text-lime-500 '>Rp. {item.price}</p>

{ myBook?.includes(item.id) ? 
<a href={`http://${window.location.hostname}:5000/book/${user.id}/${item.id}`} className='bg-slate-800  text-center inline-block text-sm  text-white w-full p-1'>Download</a> :
<button onClick={()=>{ addToCart(item)}} className=' bg-slate-800  text-sm  text-white w-full p-1'>Add to Cart</button>
}
</div>
  </div>
</div>
  )}  

</div>

    )
}

function PromoBook(){

  const {data}=useQuery('book', async ()=>{
    return await axios.get('/book');
  });
    return(
<div className=' grid grid-flow-col overflow-x-auto mx-8 gap-8 scrollbar '>

{data?.data.data.books.map(item=>
<div className='flex  w-96 h-56 ' key={item.id}>
  <img src={ `http://${window.location.hostname}:5000/public/upload/${item.thumbnail}`} className=' aspect-[9/16] w-[40%] object-cover' alt="sampul" />
  <div className=' w-3/5 px-2 my-5 bg-white relative'>
<a href={`/detail/${item.id}`}>
<p className=' text-lg w-full font-semibold'>{item.title.substring(0,30)}</p>
</a>
<p className=' text-sm text-slate-400'>by {item.author}</p>

<p className=' mt-1 text-sm text-black text-justify'>
 {item.description.substring(0, 55)}
</p>
<div className=' absolute bottom-0 w-full'>
<p className=' text-lime-500 '>Rp. {item.price}</p>
<button  className=' bg-slate-800  text-sm  text-white w-full p-1'>Add to Cart</button>
</div>
  </div>
</div>
  )}  

</div>

    )
}
export default App;
