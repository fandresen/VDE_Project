import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface popUp {
    value : boolean;
    status : "success"|"error"|"";
    loading : boolean;
    id: number;
}

const initialState : popUp ={
    value : false,
    status: "",
    loading : false,
    id : 0
}

export const PopUpSlice = createSlice ({
    name: 'popUp',
    initialState,
    reducers: {
        show: (state)=> {
            state.value = true   
            
        },
        hide : (state) => {
            state.value = false 
        },
        success : (state) =>{
            state.status ="success"
            
        },
        vide : (state) =>{
            state.status =""
        },
        erreur : (state) =>{
            state.status ="error"
        },
        loading : (state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        },
        setId : (state,action:PayloadAction<number>)=>{
            state.id = action.payload
        }
    }
})

export const {show,hide,success,erreur,loading,setId,vide} = PopUpSlice.actions;
export default PopUpSlice.reducer;