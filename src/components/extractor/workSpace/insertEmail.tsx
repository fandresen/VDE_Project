import { useEffect, useRef, useState } from "react";

const InsertEmail = () => {
  const [tabList, setTablist] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [emailExist,setEmailExist]=useState<boolean>(false)
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

  const checkEmail =(email:string)=>{
      console.log(email);
      //verfication et insertion email dans la base
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const email = e.currentTarget.value;
      if (emailValid.test(email)) {
        checkEmail(email);
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
          <div key={tab} className={`${emailExist?'bg-[rgba(255,0,0,0.8)]':''}`}>
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
