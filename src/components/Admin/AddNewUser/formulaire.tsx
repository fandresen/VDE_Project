import {useEffect, useState } from "react"
import './formulaire.css'
import axios, { Axios } from "axios"
import { SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch,RootState } from "../../../redux/store";
import { loading, setId, show, vide } from "../../../redux/validationCodePopUp";

// const emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

interface dataFormT {
    first_name : string;
    last_name : string;
    email : string;
    password : string;
    role : string
}

export default function FormulaireInsertionUser() {

    const [samePsswd,setSamePsswd]=useState<boolean>(true)
    const [emailValid,setemailValid]=useState<boolean>(true)
    const [connexErr,setConnexErr] = useState<boolean>(false)
    const [formValid, setFormValid] = useState(false);
    const [formValues, setFormValues] = useState({
      email: '',
      nom: '',
      prenom: '',
      psswd: '',
      poste:'',
      conf_psswd: '',
    });

    const dispatch = useDispatch<AppDispatch>()

    const status :string = useSelector<RootState>((state)=>state.popUp.status) as string

      useEffect(()=>{

          setFormValues({
              email:'',
              prenom:'',
              nom:'',
              poste:'',
              psswd:'',
              conf_psswd:''
          })
          setemailValid(true)
      },[connexErr,status])
    
  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };

      // Vérifiez si tous les champs ne sont pas vides
      const isValid = Object.values(newValues).every((val) => val.trim() !== '');
      
      setSamePsswd(true)
      if (newValues.conf_psswd !=="") {
        if (newValues.psswd===newValues.conf_psswd) {
        setFormValid(isValid); 
      }
      else {
        setSamePsswd(false)
        setFormValid(false)
      }    
      }
      return newValues;
    });
  };

  const handleSelectChange = (e:SelectChangeEvent)=>{
      setFormValues((prevValues) => {
      const newValues = { ...prevValues, [e.target.name]: e.target.value };

       const isValid = Object.values(newValues).every((val) => val.trim() !== '');
       setFormValid(isValid)
      //  console.log(newValues);
       
      return newValues;
    });
    
  }      
  
      const changerdataForm=()=>{
        const dataForm : dataFormT= {
          email:formValues.email,
          first_name:formValues.nom,
          last_name:formValues.prenom,
          password:formValues.conf_psswd,
          role:formValues.poste
        }
        return dataForm
      }
     
    
const handleSubmit = (e:HTMLFormElement) => {
        e.preventDefault();
        dispatch(loading(true))
        
        // Soumettez le formulaire uniquement si il est valide
        if (formValid) {
        axios.post('/admin/new-user',changerdataForm())
        .then(res =>{
          setConnexErr(false)
          if (res.status === 200) {
            // console.log(res.data.userid)
            dispatch(setId(res.data.userid))
            dispatch(show())
          }
          
        })
        .catch(error=>{
          if (error.response.status == 409) {
            setemailValid(false)
            setTimeout(()=>{
              setemailValid(true)
            },10000)
            
          }
          else {
            setConnexErr(true);
            setTimeout(()=>{
              setConnexErr(false);
            },10000)
          } 
          // console.log(error.response.status);   
        })
        .finally(()=>{
          dispatch(loading(false))
        })
        }
         else {
          console.log('Form not submitted. Please fill all fields.');
        }
      };
 
    return (
      <>
      {
        connexErr? <div className="bg-red-700 rounded-lg py-3 w-[50vw] mx-auto"><h1 className="text-white text-2xl text-center font-bold"><img src="src/assets/icon/warning.svg" alt="error" className="w-8 inline-block mr-3 mb-2 text-white" />Une erreur s'est produite veuillez réssayer</h1></div>:''

      }
      {
        !emailValid? <div className="bg-red-700 rounded-lg py-3 w-[50vw] mx-auto"><h1 className="text-white text-2xl text-center font-bold"><img src="src/assets/icon/warning.svg" alt="error" className="w-8 inline-block mr-3 mb-2 text-green-500" />Il y a deja un compte utilisant cet email</h1></div>:''

      }
      {
        status=="success"? <div className="bg-green-600 rounded-lg py-3 w-[50vw] mx-auto"><h1 className="text-white text-2xl text-center font-bold"><img src="src/assets/icon/success.svg" alt="error" className="w-8 inline-block mr-3 mb-2 text-white" />La création de l'utilisateur a été effectuée avec succes.</h1></div> :''
      }
      {
        status == "error"? <div className="bg-red-700 rounded-lg py-3 w-[50vw] mx-auto"><h1 className="text-white text-2xl text-center font-bold"><img src="src/assets/icon/warning.svg" alt="error" className="w-8 inline-block mr-3 mb-2 text-green-500" />Code invalide veuillez réssayer</h1></div> :''
      }
       
        <div className="h-auto w-[80vw] pb-8 bg-white mx-auto mt-[3vh] pt-[3vh] rounded-3xl shadow-lg shadow-black90">
            <form className="" onSubmit={handleSubmit} name="createuserForm">

                <div className="flex gap-24 justify-center">
                    <InputC placeholder={'email'} type={'email'} name={'email'} erreur={!emailValid} onChange={handleInputChange} value={formValues.email} />

                    <div className="relative mt-10">
                            <select className="text-2xl text-primary bg-white font-medium p-4 w-[30vw] border-2 border-primary rounded-lg hover:cursor-pointer" name="poste" onChange={handleSelectChange}>
                                <option className="text-primary hover:cursor-pointer mt-5" value="ADMIN"> Admin</option>
                                <option className="text-secondary hover:cursor-pointer mt-5" value="SUPERVISOR">Superviseur</option>
                                <option className="text-extracteur hover:cursor-pointer mt-5" value="EXTRACTOR">Extracteur</option>
                                <option className="text-souricng hover:cursor-pointer my-5" value="SOURCING">Sourcing</option>
                                <option value="" className="text-primary hover:cursor-pointer my-5" selected={formValues.poste===''? true :false} hidden>Poste</option>
                            </select>
                    </div>

                </div>    
                <div className="flex gap-24 justify-center mt-[2vh]">
                    <InputC placeholder={'Nom'} type={'text'} name={'nom'} onChange={handleInputChange} value={formValues.nom}/>
                    <InputC placeholder={'Prenom'} type={'text'} name={'prenom'} onChange={handleInputChange} value={formValues.prenom}/>
                </div>       
                <div className="flex gap-24 justify-center mt-[2vh] relative">
                    <InputC placeholder={'Mot de passe'} type={'password'} name={'psswd'} erreur={!samePsswd} onChange={handleInputChange} value={formValues.psswd}/>
                    <InputC placeholder={'Confirmer mot de passe'} type={'password'} name={'conf_psswd'} erreur={!samePsswd} onChange={handleInputChange} value={formValues.conf_psswd}/>
                </div>       
                <h1 className={`text-red-600 text-xl ml-[8vw] mt-2 ${samePsswd?'hidden':''}`}>Mot de passe et Confirmer mot de passe ne se ressemble pas</h1>
                <div className="mt-[4vh] text-center">
                    <button className="text-4xl font-bold py-[2vh] px-36 text-primary border-[5px] border-secondary rounded-2xl hover:bg-sky-100 disabled:text-gray-500  disabled:border-gray-400 disabled:hover:cursor-not-allowed"disabled={!formValid}>Créer</button>
                </div>
         
            </form>
        </div>
      </>
    )
  }



  // composant InputC
  interface CustomInputProps {
    name: string;
    placeholder: string;
    value: string;
    type: string;
    erreur: boolean; 
    onChange: (name: string, value: string) => void;
  }
  const InputC = ({placeholder,name,type,erreur,onChange,value}:CustomInputProps)=>{

    const [focus,setFocus] = useState<boolean>(false)
    const [inputValue,SetInputValue] = useState<string>()
    const handleFocus =()=>{
        setFocus(true)  
    }
    const handleBlur=()=>{
        if (inputValue==="") {
            setFocus(false)
        }
        // else console.log('error')
    }
  const clickLabel = ()=>{
        if (focus && inputValue==="") {
            setFocus(false)
        }
        else {
            setFocus(true)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value);
      };

    return (
        <>
             <div className="relative mt-10">
                <h3 className={`text-2xl absolute left-5 ${focus? 'top-[-1.5vh] text-2xl' : ' text-3xl top-3'} ${erreur? 'text-red-600':'text-primary'} bg-white`} id="label" onClick={clickLabel}>{placeholder}</h3>
                <input type={type} className={`text-3xl p-4 w-[30vw] border-2  text-black80 rounded-lg ${erreur? 'border-red-600':'border-primary'}`} onFocus={handleFocus} onBlur={handleBlur} name={name} onChange={handleChange} value={value}/>
            </div>
        </>
    )
  }
  