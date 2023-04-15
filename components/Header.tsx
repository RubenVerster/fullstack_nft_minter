import { VscMenu } from 'react-icons/vsc';
import BrandedName from './BrandedName';

type HeaderProps = {
  toggleSideMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
  return (
    <div className='flex space-between p-2'>
      <BrandedName />
      <button className='absolute top-4 right-4' onClick={() => toggleSideMenu()}>
        <VscMenu className='text-white' size={24} />
      </button>
    </div>
  );
};
export default Header;
