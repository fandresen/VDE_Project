import HighlightStat from "./HighlightStat/HighlightStat"


const ExtractorWork = () => {
  console.log("extractor");
  
  return (
    <div className="flex flex-col gap-16 p-10">
      <div>
        <HighlightStat />
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  )
}

export default ExtractorWork