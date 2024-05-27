import { useState, useEffect } from "react";
import Modal from "../../Others/Modal/Modal";
import EditUserForm from "./Content/Content";
import axios from "axios";
import { BiEdit } from "react-icons/bi";

// Interface pour les données de l'utilisateur
interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  email: string;
  role: "ADMIN" | "SUPERVISOR" | "EXTRACTOR" | "SOURCING";
  isActivate: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface pour les propriétés de EditUser
interface EditUserProps {
  userId: number;
  reloadUserData: () => void; // Fonction pour recharger les données de l'utilisateur
}

export default function EditUser({ userId, reloadUserData }: EditUserProps) {
  const [isModalOpen, setModalOpen] = useState(false); // État pour contrôler l'ouverture du modal
  const [userData, setUserData] = useState<UserData | null>(null); // État pour stocker les données de l'utilisateur

  // Effet pour charger les données de l'utilisateur lorsque le composant est monté
  useEffect(() => {
    axios.get(`/admin/user/${userId}`)
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des données de l'utilisateur:", error);
      });
  }, [userId]); // Recharger les données lorsque l'ID de l'utilisateur change

  // Fonction pour ouvrir le modal
  const openModal = () => setModalOpen(true);

  // Fonction pour fermer le modal
  const closeModal = () => {
    setModalOpen(false);
    reloadUserData(); // Recharger les données de l'utilisateur lorsque le modal est fermé
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        <BiEdit />
      </button>
      <Modal
        isOpen={isModalOpen}
        title="Titre du modal personnalisé"
        onClose={closeModal}
        animation="fade"
      >
        {/* Rendre EditUserForm uniquement lorsque userData est disponible */}
        {userData && (
          <EditUserForm
            userId={userId}
            userData={userData}
            closeModal={closeModal} // Passer closeModal en tant que prop
          />
        )}
      </Modal>
    </>
  );
}
