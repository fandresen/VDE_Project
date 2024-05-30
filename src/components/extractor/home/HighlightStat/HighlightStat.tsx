import TodayCV from "./TodayCV/TodayCV";
import WorkDuration from "./WorkDuration/WorkDuration";
import YesterdayCV from "./YesterdayCV/YesterdayCV";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

function HighlightStat() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("/extract/today").then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  // console.log(data);
  

  return (
    <div className="flex gap-16 justify-center">
      <div className="w-1/4">
        <YesterdayCV data={data.yesterday}/>
      </div>
      <div className="w-1/4">
        <TodayCV data={data.today}/>
      </div>
      <div className="w-2/4">
        <WorkDuration />
      </div>
    </div>
  );
}

export default function Stat() {
  return (
    <QueryClientProvider client={queryClient}>
      <HighlightStat />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
