import React from 'react';
import { useQuery } from 'react-query';
import {  useSelector } from 'react-redux';
import axios from '../component/axios';
import { check } from '../component/check';
import Layout from './layout/Layout';

const Profil = () => {
  
   let user = useSelector(state=>state.user);
   axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
   const {data}=useQuery('profil', async ()=>{
    return await axios.get("/api/v1/auth/profile");
  });
check(data);
// if(data?.data.data.Profil.avatar  !== null && data?.data.data.Profil.avatar !== user.image){
  // console.log("change image");
  // console.log(user);
  // user.image=data?.data.data.Profil.avatar;
  // console.log(user.image ,"====",data?.data.data.Profil.avatar);
// }

    return (
      <Layout>
        <div className=" mx-60">
          <p className=" mt-16 card-title">Profil</p>
          <div className=" bg-red-200 rounded-md p-5 flex justify-between">
            <div>
              <div className="flex gap-2">
                <img src="/email.png" className="mt-2 w-10 h-8" alt="email" />
                <div>
                  <p className=" text-black">{data?.data.data.Profil.email}</p>
                  <p className=" text-slate-500">Email</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <img src="/Vector.png" className="mt-2 w-10 h-10" alt="email" />
                <div>
                  <p className=" text-black">
                    {data?.data.data.Profil.gender === null
                      ? "null"
                      : data?.data.data.Profil.gender}
                  </p>
                  <p className=" text-slate-500">Gender</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <img src="/tlp.png" className="mt-2 w-10 h-10" alt="email" />
                <div>
                  <p className=" text-black">
                    {data?.data.data.Profil.phone === null
                      ? "null"
                      : data?.data.data.Profil.phone}
                  </p>
                  <p className=" text-slate-500">Mobile Phone</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <img src="/maps.png" className="mt-2 w-10 h-10" alt="email" />
                <div>
                  <p className=" text-black">
                    {data?.data.data.Profil.address === null
                      ? "null"
                      : data?.data.data.Profil.address}
                  </p>
                  <p className=" text-slate-500">Address</p>
                </div>
              </div>
            </div>

            <div>
              <img
                src={
                  data?.data.data.Profil.avatar
                    ? `${process.env.REACT_APP_URL}/public/image/${data?.data.data.Profil.avatar}`
                    : "/201025-M-AB981-003.jpeg"
                }
                className="h-48 object-cover w-48"
                alt=""
              />
              <a
                href="/edit-profil"
                className=" bg-red-600 text-white text-center inline-block w-full mt-4 p-1 rounded"
              >
                Edit Profile
              </a>
            </div>
          </div>
          <p className=" card-title mt-10 mb-10">My Book</p>
          <div className=" grid grid-cols-4 mt-5  gap-16">
            {data?.data.data.Profil?.PurchasesBooks.map((item, index) => (
              <div className="w-40 " key={index}>
                <a href={`/detail/${item.BookId}`}>
                  <img
                    src={`${process.env.REACT_APP_URL}/public/upload/${item.Book.thumbnail}`}
                    className=" aspect-[9/16]  w-[9.8rem] h-[14rem] object-cover"
                    alt="sampul"
                  />
                </a>
                <a href={`/detail/${item.BookId}`}>
                  <p className="  text-lg font-bold mt-1">{item.Book.title}</p>
                </a>
                <p className=" text-sm text-slate-400">by {item.Book.author}</p>
                <a
                  href={`${process.env.REACT_APP_URL}/book/${user.id}/${item.BookId}`}
                  className=" text-center inline-block w-full bg-slate-700 text-white mt-2"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
}

export default Profil;