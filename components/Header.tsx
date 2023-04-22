import { VscMenu } from 'react-icons/vsc';
import BrandedName from './BrandedName';

type HeaderProps = {
  toggleSideMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
  return (
    <div className='flex justify-between p-2 pt-8'>
      <BrandedName />
      <button className=' top-8 right-8' onClick={() => toggleSideMenu()}>
        <VscMenu className='text-white' size={24} />
      </button>
    </div>
  );
};
export default Header;
