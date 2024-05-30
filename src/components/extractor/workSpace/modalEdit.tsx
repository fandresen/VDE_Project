import { useRef, useState } from "react"
import { setAddCv, setEditpopUpShow } from "../../../redux/validationCodePopUp"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axios from "axios";


interface dataformT {
    first_name:string;
    last_name:string;
    email: string;
    diploma: string;
    phone_number:string;
    source: "Apec"|"Monster"|"Pôle"|"Employe";
    adress:string;
    ville:string;   
}
const ModalEdit = () => {
    const [emailExist,setEmailExist]=useState<boolean>()
    const [connexErr,setConnexErr]=useState<boolean>()
    const [formValid,setFormValid]=useState<boolean>(false)
    const [formValues,setFormValues]=useState<dataformT>({
        first_name:'',
        last_name:'',
        email:"",
        diploma:"",
        phone_number:"",
        source:"Apec",
        adress:"",
        ville:""
    })

    const dispatch = useDispatch()
    const email :string = useSelector<RootState>((state)=>state.popUp.email_id.email) as string;
    const id :number = useSelector<RootState>((state)=>state.popUp.email_id.id) as number;

    const formulaire = useRef <HTMLFormElement |null >(null)

    const sendData= async (data:dataformT)=>{
        try {
            const res = (await axios.post('/extract/add-candidate',data))
            if (res.status ==200) {
                dispatch(setAddCv())
                dispatch(setEditpopUpShow(false))
                console.log('insert successfully');
            }
        } catch (error) {

            console.log(error);
            setConnexErr(true)
            setTimeout(()=>{
                setConnexErr(false)
            },5000)
        }
    }

    const handleSublit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       sendData(formValues);
    }
     
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormValues((prevValues) => {
            const newValues = { ...prevValues, [e.target.name]: e.target.value};
            // console.log(newValues);
            const isValid = Object.values(newValues).every((val) => val.trim() !== '');
            
            // Vérifiez si tous les champs ne sont pas vides
            setFormValid(isValid)

            return newValues
    })


    }  
}
   


    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormValues((prevValues) => {
            const newValues = { ...prevValues, [e.target.name]: e.target.value};
            // console.log(newValues);
            const isValid = Object.values(newValues).every((val) => val.trim() !== '');
            
            // Vérifiez si tous les champs ne sont pas vides
            setFormValid(isValid)

            return newValues
    })


    }
  return (
    <>  
            <div className="w-[92vw] h-full absolute bg-[rgba(0,0,0,0.6)] top-0 flex justify-center">
            <div className="w-[85vw] bg-white px-[2vw] py-[3vh] mx-auto rounded-2xl absolute bottom-[10vh]">
                <div className="relative">
                    {
                    emailExist? <div className="absolute h-fit inset-0 flex justify-center top-2"><div className="absolute bg-red-700 rounded-lg py-3 px-[2vw] w-fit"><h1 className="text-white text-2xl text-center font-bold"><img src="/src/assets/icon/warning.svg" alt="error" className="w-8 inline-block mr-3 mb-2 text-green-500" />Email deja dans la Base</h1></div></div>:''
                    }
                    {
                        connexErr? <div className="absolute h-fit inset-0 flex justify-center top-2"><div className="absolute bg-red-700 rounded-lg py-3 px-[2vw] w-fit"><h1 className="text-white text-2xl text-center font-bold"><img src="/src/assets/icon/warning.svg" alt="error" className="w-8 inline-block mr-3 mb-2 text-green-500" />Erreur de la connexion, veuillez réssayer</h1></div></div>:''
                    }
           
                        <form action=""onSubmit={handleSublit} ref={formulaire}>

                            <input type="email" placeholder="email" name="email" className={`w-full text-2xl border p-3 ${emailExist?'border-red-600':'border-black90'}`} value={email}/>
                            
                            <div className="flex justify-between mt-4">
                                <input type="text" placeholder="Nom" name="first_name" className="w-[40vw] text-2xl border border-black90 p-3"onChange={handleChange}/>
                                <input type="text" placeholder="Prenom" name="last_name" className="w-[40vw] text-2xl border border-black90 p-3"onChange={handleChange}/>
                            </div>

                            <div className="flex justify-between">
                                <input type="text" placeholder="Adress" name="adress" className="w-[40vw] text-2xl p-3 border border-black90 mt-3 rounded-lg"onChange={handleChange}/>
                                <div className="mt-3">
                                        <select className="text-2xl text-black80 bg-white font-medium p-3 w-[40vw] border border-black90 rounded-lg hover:cursor-pointer" name="source" onChange={handleChange}>
                                            <option className="text-primary hover:cursor-pointer mt-5" value="Appec"> Appec</option>
                                            <option className="text-secondary hover:cursor-pointer mt-5" value="Monster">Monster</option>
                                            <option className="text-extracteur hover:cursor-pointer mt-5" value="Pole_Employe">Pole employe</option>
                                        </select>
                                </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                                <input type="text" placeholder="Num" name="phone_number" className="w-[40vw] text-2xl border border-black90 p-3"onChange={handleChange}/>
                                <input type="text" placeholder="Ville" name="ville" className="w-[40vw] text-2xl border border-black90 p-3"onChange={handleChange}/>
                            </div>

                            <input type="text" placeholder="Diplome/Poste" name="diploma" className="w-full text-2xl p-3 border border-black90 mt-4"onChange={handleChange}/>
                            
                            <div className="flex justify-center">
                                <button type="submit" className="py-4 px-20 text-2xl text-white bg-[#3BB53B] mt-14 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={formValid?false:true} >Valider</button>
                            </div>

                        </form>

                    </div>
            </div>
        </div>
    </>
  )
}

export default  ModalEdit; 