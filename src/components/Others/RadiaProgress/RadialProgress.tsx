

// Helper function to calculate stroke-dashoffset based on the value
const calculateDashOffset = (value: number, radius: number) => {
  const circumference = 2 * Math.PI * radius;
  return circumference - (value / 100) * circumference;
};

type SizeEnum =   80 | 90 | 100 | 120 | 150 | 160 ;

interface RadialProgressBarProps {
  value: number;
  textColor: string;
  barColor: string;
  barWidth: number;
  size: SizeEnum;
}

const RadialProgressBar = ({ value, textColor, barColor, barWidth, size }: RadialProgressBarProps) => {
  const radius = size / 2 - barWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = calculateDashOffset(value, radius);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={barWidth}
          className="text-gray-300"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={barWidth}
          className={`${barColor} transition-all duration-500`}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <span className="absolute text-6xl font-semibold text-black90" style={{ color: textColor }}>
        {value}
      </span>
    </div>
  );
};

export default RadialProgressBar;
