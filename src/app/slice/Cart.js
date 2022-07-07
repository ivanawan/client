import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

const userSlice= createSlice({
 name:"carts",
 initialState,
 reducers:{
    addItem(state,action){
        const data= action.payload;
        const found=state.find(e =>e.id===data.id)
        if(found===undefined){
            state.push(data);
        }
    },

    deleteItem(state,action){
        console.log("delte item");
        const data= action.payload;
        const id = state.findIndex(object => {
            return object.id === data;
          });
        
       state.splice(id, 1); 
    },

    clearItem(state,action){
        // console.log(state);
        // state 
        state.splice(0,state.length)
    },
    
 }
});

export const {addItem,deleteItem,clearItem}= userSlice.actions;
export default userSlice.reducer;