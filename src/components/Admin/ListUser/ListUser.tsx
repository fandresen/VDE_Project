import { useState, useEffect } from "react";
import defaultphoto from "../../../assets/images/765-default-avatar.png";
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
  const [isLoading, setIsLoading] = useState<boolean>(true); // État de chargement initialisé à true
  const token = getToken();

  // Fonction pour charger à nouveau les données des utilisateurs
  const reloadUserData = () => {
    setIsLoading(true); // Démarre le chargement
    axios
      .get("/admin/list-users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false); // Arrête le chargement une fois que les données sont récupérées
      });
  };

  useEffect(() => {
    reloadUserData(); // Chargement initial des données
  }, [token]);

  return (
    <div className="relative overflow-x-auto">
      {isLoading ? ( // Affiche l'indicateur de chargement si isLoading est true
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary"></div>
        </div>
      ) : (
        <table className={`w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400 ${isLoading ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-500'}`}>
          <thead className="text-xl text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3 p-0"></th>
              <th scope="col" className="px-6 py-3 p-0">
                <span className="bg-[#5FA8D3] text-center p-3 rounded-3xl">
                  Nom
                </span>
              </th>
              <th scope="col" className="px-6 py-3 p-0">
                <span className="bg-primary text-center p-3 rounded-3xl">
                  Email
                </span>
              </th>
              <th scope="col" className="px-6 py-3 p-0">
                <span className="bg-[#00B4D8] text-center p-3 rounded-3xl">
                  Date d'entrée
                </span>
              </th>
              <th scope="col" className="px-6 py-3 p-0">
                <span className="bg-[#4895EF] text-center p-3 rounded-3xl">
                  Poste
                </span>
              </th>
              <th scope="col" className="px-6 py-3 p-0">
                <span className="bg-[#5FA8D3] text-center p-3 rounded-3xl">
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-2xl text-center font-bold">
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className=" flex justify-center w-20 h-20 rounded-full">
                  <img
                    src={
                      `http://192.168.1.136:2024/uploads/${user.photo}` ||
                      defaultphoto
                    }
                    alt="Avatar"
                    className="rounded-full cursor-pointer h-full w-full object-cover "
                    // onClick={handleImageClick}
                    crossOrigin="anonymous"
                  />
                </td>
                <td className="px-6 py-4">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {/* Date d'entrée, ajouter si disponible */}
                </td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex justify-center">
                  <EditUser userId={user.id} reloadUserData={reloadUserData}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
