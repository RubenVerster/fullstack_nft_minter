import React, { useState } from 'react';

const Minter = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null!);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage((prevImage: File | null) => file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className='bg-white/10 p-4 w-1/2'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input type='text' id='title' value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input type='text' id='description' value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label htmlFor='image'>Image:</label>
          <input type='file' id='image' accept='image/*' onChange={handleImageChange} />
        </div>
        <button className='bg-green-500 p-2 rounded' type='submit'>
          Mint NFT
        </button>
      </form>
    </div>
  );
};

export default Minter;
