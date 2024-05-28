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
            <div className="w-[85vw] bg-white px-[2vw] pt-20 pb-10 mx-auto rounded-2xl">
        
                <form action=""onSubmit={handleSublit} ref={formulaire}>
                    <input type="email" placeholder="email" name="email" className="w-full text-2xl border border-black90 p-3"/>
                    <div className="flex justify-between mt-4">
                        <input type="text" placeholder="Nom" name="firstName" className="w-[40vw] text-2xl border border-black90 p-3"/>
                        <input type="text" placeholder="Prenom" name="lastName" className="w-[40vw] text-2xl border border-black90 p-3"/>
                    </div>
                    <input type="text" placeholder="Adress" name="adress" className="w-full text-2xl p-3 border border-black90 mt-3"/>
                    <div className="flex justify-between mt-4">
                        <input type="text" placeholder="Num" name="tel" className="w-[40vw] text-2xl border border-black90 p-3"/>
                        <input type="text" placeholder="Ville" name="city" className="w-[40vw] text-2xl border border-black90 p-3"/>
                    </div>
                    <input type="text" placeholder="Diplome/Poste" name="degree" className="w-full text-2xl p-3 border border-black90 mt-4"/>
                    <div className="flex justify-center">
                        <button type="submit" className="py-4 px-20 text-2xl text-white bg-[#3BB53B] mt-14 rounded-xl">Valider</button>
                    </div>

                </form>

            </div>
      </>
    )
  }
  
  export default  InsertCVForm;