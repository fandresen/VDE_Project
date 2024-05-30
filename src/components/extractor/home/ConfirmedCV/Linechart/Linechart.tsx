import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartType {
  date: string[];
  counts: number[];
}



export function Linechart({date, counts}: LineChartType) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Jours de la semaine',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valeurs',
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  
  };
  
  const labels = date;
  
   const data = {
    labels,
    datasets: [
      {
        label: 'CV confirmé',
        data: counts,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 1)',    
        pointRadius: 8, // Ajustez cette valeur pour changer la taille des points
        tension: 0.1,
  
      }
    ],
  };
  return <Line options={options} data={data} className=''/>;
}
