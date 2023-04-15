import { VscClose } from 'react-icons/vsc';
import { IModalProps } from '../types';

const Modal: React.FC<IModalProps> = ({ nft, modalVisibility, setModalVisibility }) => {
  function handleClickOutside(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      setModalVisibility(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      setModalVisibility(false);
    }
  }

  return (
    <div
      className={`${
        modalVisibility ? 'visible' : 'invisible opacity-0'
      } fixed z-20 inset-0 bg-gray-800 bg-opacity-50 transition-all duration-300 ease-in-out`}
      onClick={handleClickOutside}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role='dialog'
      aria-modal='true'
    >
      <div
        className={`fixed  w-3/4 h-3/4 mx-auto bg-slate-800 rounded-lg border-2 border-gray-500 shadow-lg p-6 pr-6 
        transition-all duration-500 ease-in-out
        ${
          modalVisibility
            ? 'top-1/2 left-1/2 visible transform -translate-x-1/2 -translate-y-1/2'
            : 'top-1/2 left-1/2 invisible transform -translate-x-1/2 -translate-y-0 opacity-0'
        }`}
      >
        <div className='flex'>
          <img src={`./src/assets/nfts/${nft.imageSrc}`} alt='nft' />
          <div className='flex flex-col justify-center p-4'>
            <h2 className='text-xl font-bold mb-4'>{nft.name}</h2>

            <p className='text-gray-600 mb-4'>{nft.description}</p>
          </div>
        </div>
        <button className='absolute right-4 top-4 text-white' onClick={() => setModalVisibility(false)}>
          <VscClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
