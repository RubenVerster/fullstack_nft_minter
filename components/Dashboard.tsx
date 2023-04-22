import { IDashboardProps } from '../types';
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

import NftThumbnail from './NftThumbnail';
import { Nft } from '../types';

import { createNftContract } from '../contracts/nftContract';
const Dashboard: React.FC<IDashboardProps> = ({ setNft, setModalVisibility }) => {
  const { account, library } = useEthers();
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (account && library && library instanceof Web3Provider) {
        const nftContract = createNftContract(library);
        try {
          const userNFTCount = await nftContract.balanceOf(account);

          // Iterate through the user's NFTs and fetch their data
          const userNFTs = [];
          for (let i = 0; i < userNFTCount.toNumber(); i++) {
            const tokenId = await nftContract.tokenOfOwnerByIndex(account, i);
            const tokenURI = await nftContract.tokenURI(tokenId);
            const metadata = await fetch(tokenURI).then((res) => res.json());
            const nft: Nft = {
              name: metadata.name,
              description: metadata.description,
              imageSrc: metadata.image,
            };
            userNFTs.push(nft);
          }

          setNfts(userNFTs);
        } catch (error) {
          alert('error');
          console.error('Error fetching user NFTs:', error);
        }
      }
    };

    fetchUserNFTs();
  }, [account, library]);
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
