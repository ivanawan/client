import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../app/slice/Cart';
import axios from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';
import moment from "moment";
import swal from 'sweetalert';

const DetailBook = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    const {data}=useQuery('book', async ()=>{
        return await axios.get(`/book/${id}`);
      });
    check(data);

    function addToCart() {
        dispatch(addItem(data?.data.data.book));
        swal({
          text:"The product is successfully added to the cart",
          timer: 2000,
          buttons: false
          })
      }
    return (
        <Layout>
        <div className=' mx-60'>
        <div className=' flex gap-6'>
        <img src={ `http://${window.location.hostname}:5000/public/upload/${data?.data.data.book.thumbnail}`} className=' aspect-[9/16]  w-[19.6rem] h-[28rem] object-cover' alt="sampul" />
        <div className=' w-60'>
        <p className=' text-3xl font-semibold'>{data?.data.data.book.title}</p>
        <p className=' text-slate-400'>by {data?.data.data.book.author}</p>

        <div className=' mt-20'>
        <p className=' text-xl font-semibold'>Publication date</p>
        <p className=' text-slate-400'>{moment(new Date(data?.data.data.book.publicationDate)).format('DD MMMM, YYYY')}</p>        
        </div>
   
       <div className='mt-5'>
       <p className=' text-xl font-semibold'>Pages</p>
        <p className=' text-slate-400'>{data?.data.data.book.pages}</p>  
       </div>

       <div className='mt-5'>
       <p className=' text-xl font-semibold text-red-700'>ISBN</p>
        <p className=' text-slate-400'>{data?.data.data.book.ISBN}</p>  
       </div>

       <div className='mt-5'>
       <p className=' text-xl font-semibold'>Price</p>
       <p className='  text-lime-500 '>Rp. {data?.data.data.book.price}</p>
       </div>

        </div>
        </div>

        <div className=' mt-20'>
        <p className='text-3xl font-semibold'>About This Book</p>
        <p className=' mt-10 text-justify'>
        {data?.data.data.book.description}
        </p>
        <div className=' flex justify-end mt-4'>
        <button onClick={()=>{addToCart()}} className=' bg-slate-900 text-white px-5 flex gap-2 py-1'>Add to Cart  <img src='/cart1.png' alt='cart'/> </button>
        </div>

        </div>
        </div>
        </Layout>
    );
}

export default DetailBook;