import { createSlice } from "@reduxjs/toolkit";

const initialState={
    login:false,
    id:0,
    fullName:"",
    email:"",
    status:"",
    token:"",
    image:""
}

const userSlice= createSlice({
 name:"users",
 initialState,
 reducers:{
    userAdd(state,action){
        const data= action.payload;
        state.login=data.login;
        state.status=data.status;
        state.fullName=data.fullName;
        state.email=data.email;
        state.token=data.token;
        state.image=data.image;
        state.id=data.id
    },
    userlogout(state){
        state.login=false;
        state.fullName="";
        state.email="";
        state.status="";
        state.token="";
        state.id=0;
    }
 }
});

export const {userAdd,userlogout}= userSlice.actions;
export default userSlice.reducer;