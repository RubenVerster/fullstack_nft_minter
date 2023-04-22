import { ButtonVariants, IDashboardProps, Pages } from '../types';
import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

import NftThumbnail from './NftThumbnail';
import { Nft } from '../types';

import Button from './Button';

import { DummNfts } from '../dummyData';

import { createNftContract } from '../contracts/nftContract';
import { CircleLoader } from 'react-spinners';
const Dashboard: React.FC<IDashboardProps> = ({
  setNft,
  setModalVisibility,
  setPage,
  setSidemenuVisibility,
}) => {
  const { account, library } = useEthers();
  const [nfts, setNfts] = useState<Nft[]>([]);

  const [loadingNfts, setLoadingNfts] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const fetchUserNFTs = async () => {
    setLoadingNfts(true);
    setLoadError(false);

    if (!account) {
      setLoadingNfts(false);
      return;
    }

    if (account && library && library instanceof Web3Provider) {
      const nftContract = createNftContract(library);
      try {
        const userNFTCount = await nftContract.balanceOf(account);

        if (userNFTCount.toNumber() === 0) {
          setNfts([]);
          return;
        }

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
        setLoadError(true);
        console.error('Error fetching user NFTs:', error);
      } finally {
        setLoadingNfts(false);
      }
    } else {
      console.log('No account or library found.');
    }
  };

  useEffect(() => {
    fetchUserNFTs();
  }, [account, library]);
  return (
    <>
      <div className='my-6 p-6 justify-center border-2 bg-white/10 text-center border-white rounded-xl'>
        <h2 className='dashboard_title'>Listing Owned NFTs</h2>
      </div>

      {loadingNfts ? (
        <>
          <CircleLoader color='#fff' loading size={200} speedMultiplier={0.3} />
        </>
      ) : (
        <>
          <div className='flex mb-4'>
            <Button text='Use Dummy Data' onClick={() => setNfts(DummNfts)} />
            <Button className='mx-2' text='Clear' variant={ButtonVariants.ERROR} onClick={() => setNfts([])} />
            <Button text='Refresh' onClick={() => fetchUserNFTs()} />
          </div>
          {!account && nfts.length <= 0 ? (
            <div className='bg-white p-4 rounded border-2 border-blue-200 w-1/2'>
              <h3 className='text-2xl'>
                To view your minted NFTs, please{' '}
                <span
                  className='cursor-pointer text-blue-300 hover:text-blue-800'
                  onClick={() => setSidemenuVisibility(true)}
                >
                  connect your wallet
                </span>
              </h3>
            </div>
          ) : (
            <>
              {nfts.length <= 0 ? (
                <div className='bg-white p-4 rounded border-2 border-blue-200 w-1/2'>
                  <h3 className='text-2xl'>There are currently no minted NFTs associated with your account</h3>
                  <button
                    className='bg-blue-400 hover:bg-blue-700 transition-all ease-in-out duration-200 hover:scale-105 hover:text-white p-2 my-2 rounded'
                    onClick={() => setPage(Pages.MINTER)}
                  >
                    Let's Get Minting!
                  </button>{' '}
                </div>
              ) : (
                <div className='grid grid-cols-4 gap-2 w-full h-1/2 overflow-y-scroll pb-52 dashboard'>
                  {nfts.map((nft, index) => (
                    <NftThumbnail key={index} {...{ nft, setNft, setModalVisibility }} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
