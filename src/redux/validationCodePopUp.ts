import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type email_Id_T = {
        email:string,
        id:number
}
interface popUp {
    value : boolean;
    status : "success"|"error"|"";
    loading : boolean;
    id: number;
    addCv:boolean;
    editpopUpShow:boolean;
    email_id:email_Id_T;
}

const initialState : popUp ={
    value : false,
    status: "",
    loading : false,
    id : 0,
    addCv:false,
    editpopUpShow:false,
    email_id:{
        email:'',
        id:0
    }
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
        },
        setAddCv:(state)=>{
            state.addCv = !state.addCv
        },
        setEditpopUpShow:(state,action:PayloadAction<boolean>)=>{
            state.editpopUpShow = action.payload
        },
        setEmail_Id:(state,action:PayloadAction<email_Id_T>)=>{
            state.email_id.email = action.payload.email;
            state.email_id.id = action.payload.id;
        }
    }
})

export const {show,hide,success,erreur,loading,setId,vide,setAddCv,setEditpopUpShow,setEmail_Id} = PopUpSlice.actions;
export default PopUpSlice.reducer;