import {useRef } from "react";

const InsertCVForm = () => {

    const formulaire = useRef <HTMLFormElement |null >(null)

    const handleSublit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(formulaire.current  as HTMLFormElement)

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
    }
    return (
      <>
            <div className="w-[75vw] bg-white px-4 py-6">
        
                <form action=""onSubmit={handleSublit} ref={formulaire}>
                    <input type="email" placeholder="email" name="email" className="w-full text-2xl border border-black90 p-2"/>
                    <div className="flex justify-between mt-3">
                        <input type="text" placeholder="Nom" name="firstName" className="w-full text-2xl border border-black90 p-2"/>
                        <input type="text" placeholder="Prenom" name="lastName" className="w-full text-2xl border border-black90 p-2"/>
                    </div>
                    <input type="text" placeholder="adress" name="adress" className="w-full text-2xlp-2 border border-black90 mt-3"/>
                    <div className="flex justify-between mt-3">
                        <input type="text" placeholder="Num" name="tel" className="w-full text-2xl border border-black90 p-2"/>
                        <input type="text" placeholder="Ville" name="city" className="w-full text-2xl border border-black90 p-2"/>
                    </div>
                    <input type="text" placeholder="Diplome/Poste" name="degree" className="w-full text-2xl p-2 border border-black90 mt-3"/>
                    <button type="submit" className="py-3 px-10 text-2xl text-white bg-[#3BB53B] rounded-xl">Valider</button>
                </form>

            </div>
      </>
    )
  }
  
  export default  InsertCVForm;