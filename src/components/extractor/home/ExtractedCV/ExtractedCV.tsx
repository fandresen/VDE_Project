import BarChart from "./BarChart/Barchart";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { formatDate, interfaceData, interfaceItem } from "../function/formatDate";

const queryClient = new QueryClient();


function Extracted() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("/extract/last-five-days").then((res) => res.data)
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
    <div className="rounded-3xl border border-black20 shadow-xl shadow-black20  p-20 flex flex-col gap-10">
      <div className="text-3xl font-bold flex justify-center text-primary">
        <h1>CV Extraits</h1>
      </div>
      <BarChart date={days} counts={counts}/>
    </div>
  );
}

export default function ExtractedCV() {
  return (
    <QueryClientProvider client={queryClient}>
      <Extracted />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
