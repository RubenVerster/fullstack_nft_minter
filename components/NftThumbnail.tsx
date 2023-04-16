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
      className='bg-black cursor-pointer hover:border-b-2 text-white p-2 m-2 bg-slate-500/50 text-center rounded-sm flex flex-col'
    >
      <img src={`/assets/nfts/${imageSrc}`} alt='nft' />
      <p className='my-2'>{name}</p>
    </div>
  );
};
export default NftThumbnail;
