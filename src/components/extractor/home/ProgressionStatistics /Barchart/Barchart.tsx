
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart: React.FC = () => {
  const [dataKey, setDataKey] = useState<string>('jours');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataKey(e.target.value);
  };

  const dataByDay: number[] = [20, 35, 85, 25, 30];
  const dataByMonth: number[] = [200, 350, 450, 250, 300];
  const dataByYear: number[] = [2000, 3500, 4500, 2500, 3000];

  let selectedData: number[];
  switch (dataKey) {
    case 'jours':
      selectedData = dataByDay;
      break;
    case 'mois':
      selectedData = dataByMonth;
      break;
    case 'années':
      selectedData = dataByYear;
      break;
    default:
      selectedData = dataByDay;
  }

  const data = {
    labels: ['Pas de numéro', 'CV improbables', 'Job étudiant(e)', 'Critère d\'âge', 'Pas mobile IDF/P'],
    datasets: [
      {
        label: `Données par ${dataKey}`,
        data: selectedData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
        display:false
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins:{
      title:{
        display:false
      },
      legend:{
        display:false
      }
    },
  };

  return (
    <div>
      <div>
        <select value={dataKey} onChange={handleChange}>
          <option value="jours">Jours</option>
          <option value="mois">Mois</option>
          <option value="années">Années</option>
        </select>
      </div>
      <div className=''>
        <Bar data={data} options={{ ...options, indexAxis: 'x' }} className='' />
      </div>
    </div>
  );
};

export default BarChart;