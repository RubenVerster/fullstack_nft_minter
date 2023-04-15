import { IDashboardProps } from '../types';

import NftThumbnail from './NftThumbnail';
const Dashboard: React.FC<IDashboardProps> = ({ nfts, setNft, setModalVisibility }) => {
  return (
    <div className='flex flex-wrap justify-evenly w-full'>
      {nfts.map((nft, index) => (
        <NftThumbnail key={index} {...{ nft, setNft, setModalVisibility }} />
      ))}
    </div>
  );
};

export default Dashboard;
