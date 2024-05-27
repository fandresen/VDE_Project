import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import ImageInput from "../../../Others/ImageInput/ImageInput";
import defaultphoto from "../../../../assets/images/765-default-avatar.png";
import axios from "axios";

// schéma du validation 
const SignupFormSchema = z.object({
  first_name: z.string().min(1, { message: "Le nom est requis" }),
  last_name: z.string().min(1, { message: "Le prénom est requis" }),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  role: z.enum(["ADMIN", "SUPERVISOR", "EXTRACTOR", "SOURCING"]).optional(),
  photo: z.instanceof(File).optional(),
  enable: z.boolean().optional(),
});

// interface pour les données 
interface SignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  role?: "ADMIN" | "SUPERVISOR" | "EXTRACTOR" | "SOURCING";
  photo: File | undefined;
  enable: boolean;
}

interface EditUserProps {
  userId: number;
  closeModal: () => void;
  userData: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: "ADMIN" | "SUPERVISOR" | "EXTRACTOR" | "SOURCING";
    photo: string;
    isActivate: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const EditUserForm: React.FC<EditUserProps> = ({
  userId,
  closeModal,
  userData,
}) => {
  // pour stoquer les valeurs des champs 
  const [formData, setFormData] = useState<SignupFormValues>({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    role: userData.role,
    photo: undefined,
    enable: userData.isActivate,
  });

  // pour voir si le form est envoyé
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // state pour la gestion des erreurs 
  const [formErrors, setFormErrors] = useState<ZodError | null>(null);

  // Etats pour gerer l'etat du compte
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    console.log(formData);
    
  }, [formData])
  
  // gestionaire de l'envoi du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);

    try {
      // Validate form data with Zod schema
      const validatedData = SignupFormSchema.parse(formData);
      console.log(validatedData);

      // Create a FormData object to send the data via multipart/form-data
      formDataToSend.append("first_name", validatedData.first_name);
      formDataToSend.append("last_name", validatedData.last_name);
      formDataToSend.append("email", validatedData.email);
      if (validatedData.role !== undefined) {
        formDataToSend.append("role", validatedData.role);
      }
      if (validatedData.photo !== undefined) {
        formDataToSend.append("photo", validatedData.photo);
      }
      if (validatedData.enable !== undefined) {
        formDataToSend.append("enable", validatedData.enable.toString());
      }

      // Log formData to check its content
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      // Send validated data to the server (or perform other actions)
      axios
        .put(`/admin/edit-user/${userId}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });

      setFormErrors(null); // Clear errors if validation is successful
    } catch (error) {
      if (error instanceof ZodError) {
        // Store validation errors in state
        setFormErrors(error);
      }
    }
  };

  // gestionaire du changement des inputs 
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // gerer l'activation ou de la desactivation
  const handleToggle = () => {
    setIsDisabled(!isDisabled);
    setFormData({ ...formData, enable: !isDisabled });
  };

  // gestion du changement de  l'image
  const handleImageChange = (file: File) => {
    setFormData({ ...formData, photo: file });
  };

  // formData a envoyer
  const formDataToSend = new FormData();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-10 p-5 w-full py-5 overflow-y-scroll hide-scrollbar">
        <div className="flex flex-col justify-between gap-5 lg:w-2/4 w-full">
          <div className="w-full flex justify-center">
            <ImageInput
              initialImage={
                `http://192.168.1.136:2024/uploads/${userData.photo}` ||
                defaultphoto
              }
              onImageChange={handleImageChange}
            />
          </div>
          <div className="flex gap-2 justify-center p-2">
            <select
              id="role"
              name="role"
              value={formData.role || ""}
              className="border-4 border-primary rounded-3xl p-2 w-2/4"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPERVISOR">SUPERVISOR</option>
              <option value="EXTRACTOR">EXTRACTOR</option>
              <option value="SOURCING">Sourcing</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleToggle}
              className={`p-2 rounded-2xl ${
                isDisabled ? "bg-green-500" : "bg-red-500"
              } text-white w-2/4`}
            >
              {isDisabled ? "Activer" : "Desactiver"}
            </button>
            <input
              type="checkbox"
              checked={isDisabled}
              readOnly
              className="hidden"
            />
          </div>
        </div>
        <div className="lg:w-2/4 w-full">
          <div className="flex flex-col gap-2 justify-start p-2">
            <div className="flex justify-start">
              <label htmlFor="first_name">First Name:</label>
            </div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="border-4 border-primary rounded-3xl p-2"
              value={formData.first_name}
              onChange={handleInputChange}
            />
         {/* afficher les erreurs  */}
            {isSubmit &&
              formErrors?.errors
                .filter((err) => err.path[0] === "first_name")
                .map((err, index) => (
                  <div key={index} className="text-red-500">
                    {err.message}
                  </div>
                ))}
          </div>
          <div className="flex flex-col gap-2 justify-start p-2">
            <div className="flex justify-start">
              <label htmlFor="last_name">Last Name:</label>
            </div>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="border-4 border-primary rounded-3xl p-2"
              value={formData.last_name}
              onChange={handleInputChange}
            />
            {/* afficher les erreur  */}
            {isSubmit &&
              formErrors?.errors
                .filter((err) => err.path[0] === "last_name")
                .map((err, index) => (
                  <div key={index} className="text-red-500">
                    {err.message}
                  </div>
                ))}
          </div>
          <div className="flex flex-col gap-2 justify-start p-2">
            <div className="flex justify-start">
              <label htmlFor="email">Email:</label>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="border-4 border-primary rounded-3xl p-2"
              value={formData.email}
              onChange={handleInputChange}
            />
            {/* Validation de l'email */}
            {isSubmit &&
              formErrors?.errors
                .filter((err) => err.path[0] === "email")
                .map((err, index) => (
                  <div key={index} className="text-red-500">
                    {err.message}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary w-2/4 py-2 text-muted rounded-3xl"
      >
        Submit
      </button>
    </form>
  );
};

export default EditUserForm;
