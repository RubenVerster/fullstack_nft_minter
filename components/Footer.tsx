import React from 'react';
import BrandedName from './BrandedName';

const Footer = () => {
  return (
    <div className='fixed left-0 bottom-0 h-24 w-full bg-black flex items-center justify-between px-20'>
      <p>
        <BrandedName />
      </p>
      <p className='text-white text-center absolute left-1/2 transform -translate-x-1/2'>
        NFT Sea 2022 &copy; All right reserved
      </p>
    </div>
  );
};

export default Footer;
