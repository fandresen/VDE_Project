import React, { useState } from 'react';

interface DataEntry {
  date: string;
  noNumber: number;
  improbableCV: number;
  studentJob: number;
  ageCriteria: number;
  notMobile: number;
}

const initialData: DataEntry[] = [
  { date: '2023-01-01', noNumber: 20, improbableCV: 35, studentJob: 85, ageCriteria: 25, notMobile: 30 },
  { date: '2023-02-01', noNumber: 30, improbableCV: 45, studentJob: 75, ageCriteria: 35, notMobile: 40 },
  { date: '2023-03-01', noNumber: 40, improbableCV: 55, studentJob: 65, ageCriteria: 45, notMobile: 50 },
  { date: '2023-04-01', noNumber: 50, improbableCV: 65, studentJob: 55, ageCriteria: 55, notMobile: 60 },
  { date: '2023-05-01', noNumber: 60, improbableCV: 75, studentJob: 45, ageCriteria: 65, notMobile: 70 },
];

const Data: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const filteredData = initialData.filter((entry) => {
    const entryDate = new Date(entry.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;
    return entryDate >= start && entryDate <= end;
  });

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex justify-center'>
        <label>
          De:
          <input type="date" value={startDate} onChange={handleStartDateChange} />
        </label>
        <label>
          À:
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </label>
      </div>
      <table className='text-center progression'>
        <thead className='text-md'>
          <tr>
            <th>Date</th>
            <th>Pas de numéro</th>
            <th>CV improbables</th>
            <th>Job étudiant(e)</th>
            <th>Critère d'âge</th>
            <th>Pas mobile IDF/P</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry) => (
            <tr key={entry.date} className=''>
              <td>{entry.date}</td>
              <td>{entry.noNumber}</td>
              <td>{entry.improbableCV}</td>
              <td>{entry.studentJob}</td>
              <td>{entry.ageCriteria}</td>
              <td>{entry.notMobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
