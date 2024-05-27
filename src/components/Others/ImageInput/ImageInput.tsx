import React, { useRef, useState } from 'react';

interface ImageInputProps {
  initialImage: string;
  onImageChange: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ initialImage, onImageChange }) => {
  const [image, setImage] = useState(initialImage);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img
        src={image}
        alt="Avatar"
        className=" w-80 h-80 rounded-full cursor-pointer object-contain bg-primary"
        onClick={handleImageClick}
        crossOrigin='anonymous'
      />
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageInput;

