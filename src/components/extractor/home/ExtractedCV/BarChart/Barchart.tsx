import React, { useRef, } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ScriptableContext
} from 'chart.js';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BarchartType {
  date: string[];
  counts: number[];
}

const BarChart: React.FC<BarchartType> = ({date, counts}) => {
  const chartRef = useRef(null);

  const createGradient = (ctx: CanvasRenderingContext2D, chartArea: {top: number, bottom: number}) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(17, 113, 186, 1)');
    gradient.addColorStop(1, 'rgba(255, 82, 82, 1)');
    return gradient;
  };


  const data: ChartData<'bar'> = {
    labels: date,
    datasets: [
      {
        label: 'extracted ',
        data: counts,
        backgroundColor: (context: ScriptableContext<'bar'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // Vérifiez que chartArea est défini
          if (!chartArea) {
            return 'rgba(0,0,0,0)'; // ou une couleur de secours par défaut
          }

          return createGradient(ctx, chartArea);
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 90,
        borderRadius: 10
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'CV EXTRAITS',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        
      },
      x: {
       
      }
    },
  };

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default BarChart;
