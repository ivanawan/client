import { createSlice } from "@reduxjs/toolkit";

const initialState={
    login:false,
    fullName:"",
    email:"",
    status:"",
    token:""
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
    },
    userlogout(state){
        state.login=false;
        state.fullName="";
        state.email="";
        state.status="";
        state.token="";
    }
 }
});

export const {userAdd,userlogout}= userSlice.actions;
export default userSlice.reducer;