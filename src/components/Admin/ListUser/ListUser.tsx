import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

export default function ListUser() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xl text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3 p-0">
              
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#5FA8D3]  text-center p-3 rounded-3xl">
                Nom
              </span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-primary  text-center p-3 rounded-3xl">
                Email
              </span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#00B4D8]  text-center p-3 rounded-3xl">
                Date d'entrée
              </span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#4895EF]  text-center p-3 rounded-3xl">
                Poste
              </span>
            </th>
            <th scope="col" className="px-6 py-3 p-0">
              <span className="bg-[#5FA8D3]  text-center p-3 rounded-3xl">
                Action
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="text-2xl text-center font-bold">
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 flex justify-center">
              <CgProfile />
            </td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4 flex justify-center">
              <BiEdit />
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 flex justify-center">
              <CgProfile />
            </td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4 text-purple-600">Sourcing</td>
            <td className="px-6 py-4 flex justify-center">
              <BiEdit />
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-6 py-4 flex justify-center">
              <CgProfile />
            </td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4 text-green-500">extracteur</td>
            <td className="px-6 py-4 flex justify-center">
              <BiEdit />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
