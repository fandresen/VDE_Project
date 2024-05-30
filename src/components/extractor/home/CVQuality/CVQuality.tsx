import Statistics from "./Statistics/Statistics";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function CVQ() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("/extract/today-stat").then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  
  

  return (
    <div className='rounded-3xl border border-black20 shadow-xl shadow-black20  p-10 flex flex-col gap-10'>
        <div className='text-3xl font-bold flex justify-center text-primary'>
            <h1>Qualité des CV après retour des sourcings</h1>
        </div>
        <Statistics data={data}/>
    </div>
  )
}


export default function CVQuality() {
  return (
    <QueryClientProvider client={queryClient}>
      <CVQ />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
