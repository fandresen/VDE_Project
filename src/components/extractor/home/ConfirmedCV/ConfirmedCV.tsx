import { formatDate, interfaceData, interfaceItem } from "../function/formatDate";
import { Linechart } from "./Linechart/Linechart";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";


const queryClient = new QueryClient();


function Confirmed() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("/extract/last-five-days_confirmed").then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  const transformedData = data.map((item: interfaceItem) => {
    const formattedDate = formatDate(item.date);
    return {
      ...formattedDate,
      count: item.count,
    };
  });

  // Extract days and counts into separate arrays
  const days = transformedData.map((item: interfaceData) => item.dayName).reverse();
  const counts = transformedData.map((item: interfaceData) => item.count).reverse();


  return (
    <div className='rounded-3xl border border-black20 shadow-xl shadow-black20  p-20 flex flex-col gap-10'>
        <div className='text-3xl font-bold flex justify-center text-primary'>
            <h1>CV Confirmé</h1>
        </div>
        <Linechart date={days} counts={counts}/>
    </div>
  )
}

export default function ConfirmedCV() {
  return (
    <QueryClientProvider client={queryClient}>
      <Confirmed />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
