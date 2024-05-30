
interface DataItem<T> {
    label: T;
    count: number;
}

interface DataProps {
    data: DataItem<string>[];
}

export default function Statistics({data}: DataProps) {
  console.log(data);

  return (
    <div className="flex gap-5 justify-center">
      {data.map((item, index) => (
        <div key={index} className="rounded-3xl border-2 p-1 bg-gradient-to-t from-primary to-secondary w-52">
          <div className="p-2 py-10 bg-muted rounded-3xl h-full">
            <h1 className="flex justify-center text-3xl font-bold bg-gradient-to-t from-primary to-secondary text-transparent bg-clip-text">{item.count}</h1>
            <span className="text-xs text-primary flex justify-center">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
