import React from 'react';
import { INftThumbnailProps } from '../types';

const NftThumbnail: React.FC<INftThumbnailProps> = ({
  nft: { name, description, imageSrc },
  setNft,
  setModalVisibility,
}) => {
  const handleNftClick = () => {
    setModalVisibility(true);
    setNft({ name, description, imageSrc });
  };

  return (
    <div
      onClick={() => handleNftClick()}
      className='bg-black cursor-pointer hover:border-b-2 text-white p-2 m-2 bg-slate-500/50 rounded-sm items-center h-96'
    >
      <div
        className='w-full h-72 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(/assets/nfts/${imageSrc})` }}
      />
      <p className='my-2 text-2xl'>{name}</p>
    </div>
  );
};

export default NftThumbnail;
