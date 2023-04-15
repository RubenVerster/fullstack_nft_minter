import BrandedName from './BrandedName';

const Footer = () => {
  return (
    <div className='absolute w-100 h-24 w-screen bottom-0 left-0 bg-black flex flex-row items-center px-20'>
      <BrandedName />
      <p className='text-white text-center w-100'>NFT Sea 2022 &copy; All right reserved </p>
    </div>
  );
};
export default Footer;
