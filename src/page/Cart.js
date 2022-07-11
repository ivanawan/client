import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItem, deleteItem } from '../app/slice/Cart';
import axios from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';
import swal from 'sweetalert';

const Cart = () => {
    const cart = useSelector((state)=>state.cart);
    const user = useSelector((state)=>state.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    const dispatch= new useDispatch();
    let totalPrice=0;

    useEffect(()=>{
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-4HI3uiV9g8Vf0PvA";
    
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
       });


    cart.forEach(e => {
        totalPrice+=e.price
    });

    function deleteItemFromCart(id){
     dispatch(deleteItem(id));
    }

    function submit() {
      
        const bookId = cart.map(a => a.id);
        axios.post('/api/v1/transaction/',{ totalPayment:totalPrice,dataBook:bookId}).then(res=>{
            check(res);  
            dispatch(clearItem());
            window.snap.pay((res.data.data.transaction.payment.token), {
                onSuccess: function (result) {
                  /* You may add your own implementation here */
                  console.log(result);
                swal({ title:"payment",text:"Thank you for ordering in us, please wait 1 x 24 hours to verify you order",icon: "success",buttons:false});
            
                },
                onPending: function (result) {
                  /* You may add your own implementation here */
                  console.log(result);
                  
                //   history.push("/profile");
                },
                onError: function (result) {
                  /* You may add your own implementation here */
                  console.log(result);
                },
                onClose: function () {
                  /* You may add your own implementation here */
                  alert("you closed the popup without finishing the payment");
                },
              });
        })
    }
  
    
    function formatUang(bilangan){
        let	number_string = bilangan.toString();
        let sisa 	= number_string.length % 3;
          let rupiah 	= number_string.substr(0, sisa);
        let	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
              
      if (ribuan) {
       let	separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
      }
       return rupiah;
        }

    return (
        <Layout>
        <div className=' flex justify-center min-h-[79vh]'>
            <div className='w-[55rem]'>
                <p className=' card-title'>
                    My Cart
                </p>
                <p className=' mt-3'>Review Your Order</p>
                <div className='mt-2 flex gap-4'>
                    <div className=' w-2/3'>
                    <hr />
                    {cart.map(item=>
                    <div className='flex justify-between my-1' key={item.id}>
                        <div className='flex gap-5'>
                        <img src={ `http://${window.location.hostname}:5000/public/upload/${item.thumbnail}`} className=' aspect-[9/16]  w-[7rem] h-[10rem] object-cover' alt="sampul" />
                        <div>
                            <p className=' font-bold'>{item.title}</p>
                            <p className=' text-sm text-slate-400'>by {item.author}</p>
                             <p className='  text-lime-500 mt-12'>Rp. {formatUang(item.price)}</p>
                        </div>
                        </div>
                         <img src="/trash.png" onClick={()=>{deleteItemFromCart(item.id)}} className='h-5 w-5 mr-2 mt-2' alt="" />
                    </div>
                    )}
                    <hr />
                    </div>
                    <div className=' w-1/3'>
                    <hr />
                    <div className='flex justify-between mt-2'>
                        <p>Subtotal</p>
                        <p>{formatUang(totalPrice)}</p>
                    </div>
                    <div className='flex justify-between mt-2 mb-2'>
                        <p>Qty</p>
                        <p>{cart.length}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between text-lime-500 mt-2'>
                        <p>Total</p>
                        <p>{formatUang(totalPrice)}</p>
                    </div>
                    <button onClick={()=> submit()} className=' mt-10 bg-slate-900 text-white w-full rounded p-1'>Pay</button>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Cart;
