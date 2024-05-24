import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { getToken } from "../../../services/TokenServices";
import EditUser from "../EditUser/EditUser";


interface User {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  email: string;
  role: string;

}

export default function ListUser() {
  const [users, setUsers] = useState<User[]>([]);
  const token = getToken();

  useEffect(() => {
    axios.get('/admin/list-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [token]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xl text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3 p-0"></th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#5FA8D3] text-center p-3 rounded-3xl">Nom</span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-primary text-center p-3 rounded-3xl">Email</span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#00B4D8] text-center p-3 rounded-3xl">Date d'entrée</span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#4895EF] text-center p-3 rounded-3xl">Poste</span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#5FA8D3] text-center p-3 rounded-3xl">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-2xl text-center font-bold">
          {users.map(user => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 flex justify-center">
                <CgProfile />
              </td>
              <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{/* Date d'entrée, ajouter si disponible */}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4 flex justify-center">
                <EditUser />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
