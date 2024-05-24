import React, { useState } from "react";
import { z, ZodError } from "zod";
import ImageInput from "../../../Others/ImageInput/ImageInput";
import defaultAvatar from "../../../../assets/images/765-default-avatar.png";

// Définir le schéma de validation avec Zod
const SignupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le prénom est requis" }),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  accountType: z.enum(["basic", "premium"]).optional(),
});

// Interface pour les données du formulaire
interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  accountType?: "basic" | "premium";
  avatar: File | undefined;
}

const EditUserForm: React.FC = () => {
  // État pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState<SignupFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    accountType: undefined,
    avatar: undefined,
  });

  // État pour stocker les erreurs de validation
  const [formErrors, setFormErrors] = useState<ZodError | null>(null);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Valider les données du formulaire avec le schéma Zod
      const validatedData = SignupFormSchema.parse(formData);

      // Envoyer les données validées au serveur (ou effectuer d'autres actions)
      console.log("Données validées :", validatedData);
    } catch (error) {
      if (error instanceof ZodError) {
        // Stocker les erreurs de validation dans l'état
        setFormErrors(error);
      }
    }
  };

  // Gestionnaire de changement de champ du formulaire
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestionnaire de changement d'image de l'avatar
  const handleImageChange = (file: File) => {
    setFormData({ ...formData, avatar: file });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-10 p-5">
        <div className=" flex flex-col justify-between gap-5 w-1/4">
            <div className="w-full flex justify-center">

          <ImageInput
            initialImage={defaultAvatar}
            onImageChange={handleImageChange}
          />
            </div>
          <button className="w-full bg-secondary p-2 text-muted rounded-2xl">
            Disable
          </button>
        </div>
        <div className="w-3/4">
          <div className="flex flex-col gap-2 justify-start p-2">
            <div className="flex justify-start">
              <label htmlFor="firstName">First Name:</label>
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border-4 border-primary rounded-3xl p-2"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {/* Afficher les erreurs de validation pour le champ firstName */}
            {formErrors?.errors
              .filter((err) => err.path[0] === "firstName")
              .map((err, index) => (
                <div key={index} className="text-red-500">
                  {err.message}
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 justify-start p-2">
            <div className="flex justify-start">
              <label htmlFor="lastName">Last Name:</label>
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border-4 border-primary rounded-3xl p-2"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {/* Afficher les erreurs de validation pour le champ lastName */}
            {formErrors?.errors
              .filter((err) => err.path[0] === "lastName")
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
            {/* Afficher les erreurs de validation pour le champ email */}
            {formErrors?.errors
              .filter((err) => err.path[0] === "email")
              .map((err, index) => (
                <div key={index} className="text-red-500">
                  {err.message}
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 justify-start p-2">
            <div className="flex justify-start">
              <label htmlFor="accountType">Account Type:</label>
            </div>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType || ""}
              className="border-4 border-primary rounded-3xl p-2"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditUserForm;
