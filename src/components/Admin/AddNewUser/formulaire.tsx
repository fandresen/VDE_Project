import {ChangeEvent, useState } from "react"
import './formulaire.css'


export default function FormulaireInsertionUser() {
    return (
      <>
        <div className="h-[80vh] xl:h-[70vh] w-[80vw] bg-white mx-auto mt-10 pt-[3vh] rounded-3xl shadow-lg shadow-black90">
            <form className="">

                <div className="flex gap-24 justify-center">
                    <EmailInput placeholder={'email'}/>

                    <div className="relative mt-10">
                            <select className="text-2xl text-primary bg-white font-medium p-4 w-[30vw] border-2 border-primary rounded-lg hover:cursor-pointer" aria-placeholder="poste">
                                <option className="text-primary hover:cursor-pointer mt-5" value="admin"> Admin</option>
                                <option className="text-secondary hover:cursor-pointer mt-5" value="superviseur">Superviseur</option>
                                <option className="text-extracteur hover:cursor-pointer mt-5" value="extracteur">Extracteur</option>
                                <option className="text-souricng hover:cursor-pointer my-5" value="sourcing">Sourcing</option>
                                <option value="" className="text-primary hover:cursor-pointer my-5" disabled selected hidden>Poste</option>
                            </select>
                    </div>

                </div>    
                <div className="flex gap-24 justify-center mt-[2vh]">
                    <TextInput  placeholder={'Nom'}/>
                    <TextInput placeholder={'Prenom'}/>
                </div>       
                <div className="flex gap-24 justify-center mt-[2vh]">
                    <PswdInput  placeholder={'Mot de passe'}/>
                    <PswdInput  placeholder={'Confirmer mot de passe'}/>
                </div>       
                <div className="mt-16 text-center">
                    <button className="text-4xl font-bold py-[2vh] px-36 text-primary border-[5px] border-secondary rounded-2xl hover:bg-sky-100">Créer</button>
                </div>
         
            </form>
        </div>
      </>
    )
  }

  const TextInput = ({placeholder}:any)=>{
    const [focus,setFocus] = useState<boolean>(false)
    const [inputValue,SetInputValue] = useState<string>('')


    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        SetInputValue(e.target.value)
    }
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

    return (
        <>
             <div className="relative mt-10">
                <h3 className={`text-primary absolute left-5 ${focus? 'top-[-1.5vh] text-2xl' : ' text-3xl top-3'} bg-white`} id="label" onClick={clickLabel}>{placeholder}</h3>
                <input type="text" className="text-2xl p-4 w-[30vw] border-2 border-primary rounded-lg" onFocus={handleFocus} onBlur={handleBlur} value={inputValue} onChange={handleChange}/>
            </div>
        </>
    )
  }

  const EmailInput = ({placeholder}:any)=>{
    const [focus,setFocus] = useState<boolean>(false)
    const [inputValue,SetInputValue] = useState<string>('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        SetInputValue(e.target.value)
    }
    const handleFocus =()=>{
        setFocus(true)  
    }
    const handleBlur=()=>{
        if (inputValue==="") {
            setFocus(false)
        }
        else if (inputValue ) {
            
        }
    }
    const clickLabel = ()=>{
        if (focus && inputValue==="") {
            setFocus(false)
        }
        else {
            setFocus(true)
        }
    }
    return (
        <>
             <div className="relative mt-10">
                <h3 className={`text-primary text-2xl absolute left-5 ${focus? 'top-[-1.5vh] text-2xl' : ' text-3xl top-3'} bg-white`} id="label" onClick={clickLabel}>{placeholder}</h3>
                <input type="email" className="p-4 text-2xl w-[30vw] border-2 border-primary rounded-lg" onFocus={handleFocus} onBlur={handleBlur} value={inputValue} onChange={handleChange}/>
            </div>
        </>
    )
  }
  const PswdInput = ({placeholder}:any)=>{
    const [focus,setFocus] = useState<boolean>(false)
    const [inputValue,SetInputValue] = useState<string>('')


    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        SetInputValue(e.target.value)
    }
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

    return (
        <>
             <div className="relative mt-10">
                <h3 className={`text-primary text-2xl absolute left-5 ${focus? 'top-[-1.5vh] text-2xl' : ' text-3xl top-3'} bg-white`} id="label" onClick={clickLabel}>{placeholder}</h3>
                <input type="password" className="text-3xl p-4 w-[30vw] border-2 border-primary rounded-lg" onFocus={handleFocus} onBlur={handleBlur} value={inputValue} onChange={handleChange}/>
            </div>
        </>
    )
  }
  