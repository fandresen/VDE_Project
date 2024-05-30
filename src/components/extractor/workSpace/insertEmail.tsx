import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

const InsertEmail = () => {
  const [tabList, setTablist] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [emailExist,setEmailExist]=useState<boolean|null>(null)
  const liste = useRef<HTMLDivElement>(null);

  const emailValid  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

  const handleScroll = () => {
    if (liste.current) {
      const scrollTop = liste.current.scrollTop;
      const scrollHeight = liste.current.scrollHeight;
      const clientHeight = liste.current.clientHeight;

      if (clientHeight + scrollTop >= scrollHeight - 1) {
        setTablist(prev => {
          const lastNumber = prev[prev.length - 1];
          const newNumbers = Array.from({ length: 15 }, (_, i) => lastNumber + i + 1);
          return prev.concat(newNumbers);
        });
      }
    }
  };

  useEffect(() => {
    const listeRef = liste.current;
    if (listeRef) {
      listeRef.addEventListener('scroll', handleScroll);
      return () => {
        listeRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const sendEmail= async (email:string,input)=>{
    try {
        const res = (await axios.post('/extract/addemail',{"email":email}))
        if(res && res.data &&res.data.status){
          if(await res.data.status==true){
            changeBgGreen(input)
            console.log(res.data.id);
          }  
        }
       
    } catch (error:any) {
      if(error.response.status){
        if(error.response.status==400){
          changeBgRed(input)
        }
      }
      console.log(error);
    }
      
  }

  const changeBgGreen =(input)=>{
    if(input.targe.classList.contains('bg-red-400')){
      input.target.classList.remove('bg-red-400')
    } 
    input.target.classList.add('bg-green-300')
    setTimeout(()=>{
              input.target.classList.remove('bg-green-300')
        },2000)
  }
  const changeBgRed =(input)=>{
    input.target.classList.add('bg-red-400')
  }

  const checkEmail =(email:string,input:React.KeyboardEvent<HTMLInputElement>)=>{
      sendEmail(email,input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const email = e.currentTarget.value;
      if (emailValid.test(email)) {
        checkEmail(email,e);
      }
    }
  }

/*   inputEmail.current?.addEventListener('keydown',(e)=>{
    console.log(e.target);
      
    // e.preventDefault()
    if (inputEmail.current && e.key ==='Enter') {
      
        // if (emailValid.test(inputEmail.current.value)) {
        //     checkEmail(inputEmail.current.value)
        //     // console.log('email:',inputEmail.current.value);  
        // }
    }
}) */


  return (
    <>
      <div className="bg-white mx-auto mt-20 w-[85vw] h-[85vh] pl-10 rounded-2xl overflow-y-scroll" ref={liste}>
        <div className="flex justify-start mt-8">
          <h1 className="text-3xl text-primary font-bold mr-[10vw] ml-[0.3vw]">N°</h1>
          <h1 className="text-3xl text-primary font-bold">Email</h1>
        </div>
        <div className="w-[80vw] border border-black20 mt-2"></div>

        {tabList.map((tab: number) => (
          <div key={tab} id={tab.toString()}>
            <div className="mt-[1vh] flex justify-start">
              <h1 className="text-black90 w-[2vw] text-center text-3xl font-semibold mr-[10vw]">{tab}</h1>
              <input type="email" className="border-none h-10 w-[40vw] py-6 text-2xl bg-transparent" onKeyDown={handleKeyDown}/>
              <button className="text-white text-xl font-semibold bg-primary px-6 rounded-xl ml-[18vw]">Edit</button>
            </div>
            <div className="w-[80vw] border border-black20 mt-2"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InsertEmail;
