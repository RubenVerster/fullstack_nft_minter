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
        className={`fixed text-white card w-3/4 h-3/4 mx-auto rounded-xl border-gray-500 shadow-lg p-2 
        transition-all duration-500 ease-in-out
        ${
          modalVisibility
            ? 'top-1/2 left-1/2 visible transform -translate-x-1/2 -translate-y-1/2'
            : 'top-1/2 left-1/2 invisible transform -translate-x-1/2 -translate-y-0 opacity-0'
        }`}
      >
        <div className='flex bg-slate-800 h-full rounded-xl overflow-hidden '>
          <div className='w-full flex justify-center align-center p-4'>
            <img className='w-full' src={`/assets/nfts/${nft.imageSrc}`} alt={nft.name} />
          </div>
          <div className='flex flex-col p-4 pt-8'>
            <h2 className='text-2xl font-bold mb-4'>{nft.name}</h2>
            <h3 className='uppercase font-bold text-lg'>Description</h3>
            <p className='pt-2 pb-6 border-b-2'>{nft.description}</p>
          </div>
        </div>
        <button className='absolute right-6 top-6 z-50 ' onClick={() => setModalVisibility(false)}>
          <VscClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
