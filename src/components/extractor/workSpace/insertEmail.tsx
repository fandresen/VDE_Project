import { useEffect, useRef, useState } from "react";

const InsertEmail = () => {
  const [tabList, setTablist] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const liste = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="bg-white mx-auto mt-20 w-[85vw] h-[85vh] pl-10 rounded-2xl overflow-y-scroll" ref={liste}>
        <div className="flex justify-start mt-8">
          <h1 className="text-3xl text-primary font-bold mr-[10vw] ml-[0.3vw]">N°</h1>
          <h1 className="text-3xl text-primary font-bold">Email</h1>
        </div>
        <div className="w-[80vw] border border-black20 mt-2"></div>

        {tabList.map((tab: number) => (
          <div key={tab}>
            <div className="mt-[1vh] flex justify-start">
              <h1 className="text-black90 w-[2vw] text-center text-3xl font-semibold mr-[10vw]">{tab}</h1>
              <input type="email" className="border-none h-10 w-[40vw] py-6 text-2xl" />
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
