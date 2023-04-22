import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineUpload } from 'react-icons/ai';
import { IImageUploaderProps } from '../types';

const ImageUploader: React.FC<IImageUploaderProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileChange(file);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      const file = target!.files![0];
      setFileName(file.name);
      onFileChange(file);
    });
    fileInput.click();
  };

  return (
    <div
      {...getRootProps()}
      onClick={handleClick}
      className='border-2 border-dashed bg-gray-600 rounded border-gray-300 p-5 text-center cursor-pointer text-white'
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>
          {fileName ? (
            `Selected file: ${fileName}`
          ) : (
            <div className='flex items-center justify-center'>
              <AiOutlineUpload size={33} />
              <p>Drag and drop an image, or click to select a file.</p>
            </div>
          )}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
