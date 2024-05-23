import {useState } from "react"
import './formulaire.css'
import axios from "axios"
import { SelectChangeEvent } from "@mui/material";

const emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

interface dataFormT {
    first_name : string,
    last_name : string,
    email : string,
    password : string,
    role : string
}


export default function FormulaireInsertionUser() {

    const [dataForm,setDataForm] = useState<dataFormT>()
    const [samePsswd,setSamePsswd]=useState<boolean>(true)
    const [emailValid,setemailValid]=useState<boolean>(true)

    const [formValues, setFormValues] = useState({
        email: '',
        nom: '',
        prenom: '',
        psswd: '',
        poste:'',
        conf_psswd: '',
      });
    
      const [formValid, setFormValid] = useState(false);
    
      const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };

      // Vérifiez si tous les champs ne sont pas vides
      const isValid = Object.values(newValues).every((val) => val.trim() !== '');
      setSamePsswd(true);
      
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
      return newValues;
    });
    
  }                       
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        // Soumettez le formulaire uniquement si il est valide
        if (formValid) {
          // Faites quelque chose avec les données du formulaire
          // const data = {...dataForm}
          // data.email = formValues.email;
          // data.first_name = formValues.nom;
          // data.last_name = formValues.prenom;
          // data.password = formValues.conf_psswd;
          // data.role = formValues.poste;
          setDataForm({
          email:formValues.email,
          first_name:formValues.nom,
          last_name:formValues.prenom,
          password:formValues.conf_psswd,
          role:formValues.poste
        })

        setTimeout(()=>console.log(dataForm),5000)
        
          
        } else {
          console.log('Form not submitted. Please fill all fields.');
        }
      };
 

    return (
      <>
        <div className="h-[80vh] xl:h-[70vh] w-[80vw] bg-white mx-auto mt-10 pt-[3vh] rounded-3xl shadow-lg shadow-black90">
            <form className="" onSubmit={handleSubmit} name="createuserForm">

                <div className="flex gap-24 justify-center">
                    <InputC placeholder={'email'} type={'email'} name={'email'} erreur={!emailValid} onChange={handleInputChange} value={formValues.email} />

                    <div className="relative mt-10">
                            <select className="text-2xl text-primary bg-white font-medium p-4 w-[30vw] border-2 border-primary rounded-lg hover:cursor-pointer" name="poste" onChange={handleSelectChange}>
                                <option className="text-primary hover:cursor-pointer mt-5" value="admin"> Admin</option>
                                <option className="text-secondary hover:cursor-pointer mt-5" value="superviseur">Superviseur</option>
                                <option className="text-extracteur hover:cursor-pointer mt-5" value="extracteur">Extracteur</option>
                                <option className="text-souricng hover:cursor-pointer my-5" value="sourcing">Sourcing</option>
                                <option value="" className="text-primary hover:cursor-pointer my-5" disabled selected hidden>Poste</option>
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
                <h1 className={`text-red-600 text-xl ml-[8vw] mt-2 ${samePsswd?'hidden':''}`}>Mot depasse et Confirmer mot depasse ne se ressemble pas</h1>
                <div className="mt-16 text-center">
                    <button className="text-4xl font-bold py-[2vh] px-36 text-primary border-[5px] border-secondary rounded-2xl hover:bg-sky-100 disabled:text-gray-500  disabled:border-gray-400 disabled:hover:cursor-not-allowed"disabled={!formValid}>Créer</button>
                </div>
         
            </form>
        </div>
      </>
    )
  }

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
        else console.log('error')
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
  