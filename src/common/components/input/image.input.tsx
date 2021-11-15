import React from 'react';

interface ImageInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageRef: any;
}

const ImageInput: React.FC<ImageInputProps> = ({ handleChange, imageRef }) => {
  return <input type='file' accept='image/*' onChange={handleChange} className='d-none' ref={imageRef} />;
};

export default ImageInput;
