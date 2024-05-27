import React from "react";

interface ModalTypes {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  animation: "fade" | "slide-up" | "slide-down";
}

const Modal: React.FC<ModalTypes & React.HTMLProps<HTMLDivElement>> = ({
  isOpen,
  title,
  children,
  onClose,
  animation,
}) => {
  if (!isOpen) return null;

  const animationClasses = {
    fade: "transition-opacity duration-800",
    "slide-up": "transition-transform duration-300 transform translate-y-full",
    "slide-down":
      "transition-transform duration-300 transform translate-y-full",
  };

  const animationClass = animationClasses[animation] || "";

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800  bg-opacity-50 ${animationClass}`}
    >
         <div className="bg-white rounded-lg shadow-lg sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1500px] max-h-[800px] overflow-scroll">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  title: "Modal Title",
};

export default Modal;
