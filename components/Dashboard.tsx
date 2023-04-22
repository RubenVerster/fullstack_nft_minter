import { IDashboardProps } from '../types';

import NftThumbnail from './NftThumbnail';

const Dashboard: React.FC<IDashboardProps> = ({ nfts, setNft, setModalVisibility }) => {
  return (
    <>
      <div className='my-6 p-6 justify-center border-2 bg-white/10 text-center border-white rounded-xl'>
        <h2 className='dashboard_title'>Listing Owned NFTs</h2>
      </div>
      <div className='grid grid-cols-4 gap-2 w-full'>
        {nfts.map((nft, index) => (
          <NftThumbnail key={index} {...{ nft, setNft, setModalVisibility }} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
