import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useContractFunction, useEthers } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import ContractAbi from '../contractABI.json';
import { ethers } from 'ethers';
import ImageUploader from '../components/ImageUploader';

const projectId = process.env.NEXT_PUBLIC_IPFS_KEY;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_SECRET_KEY;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
});
import { IMinterProps } from '../types';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const Minter: React.FC<IMinterProps> = ({ setSidemenuVisibility }) => {
  const { library, account } = useEthers();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (library) {
      setContract(
        new Contract(
          contractAddress!,
          ContractAbi.abi,
          (library as ethers.providers.JsonRpcProvider).getSigner()
        )
      );
    }
  }, [library]);

  const uploadDisabled = !title || !description || !image;

  const { state: mintState, send: mintNFT } = useContractFunction(contract, 'mint', {});

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleImageChange = (file: File) => {
    setImage(file);
  };

  const handleNftMint = async (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert('Please fill out all fields');
      return;
    }

    try {
      //@ts-ignore
      const uploadedImage = await ipfs.add(await image.arrayBuffer());
      const metadata = {
        title,
        description,
        image: `https://ipfs.infura.io/ipfs/${uploadedImage.path}`,
      };

      const uploadedMetadata = await ipfs.add(JSON.stringify(metadata));

      const tokenURI = `https://ipfs.infura.io/ipfs/${uploadedMetadata.path}`;
      mintNFT(account, tokenURI);
    } catch (error) {
      console.error('Error uploading and minting NFT:', error);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col my-6 p-6 border-2 bg-white/10 text-center border-white rounded-xl'>
        <h2 className='dashboard_title'>Mint New NFT</h2>
        <p className='text-white'>Mint your NFT and make it yours!</p>
      </div>
      {!account ? (
        <div className='bg-white p-4 rounded border-2 border-blue-200 w-1/2'>
          <h3 className='text-2xl'>
            To start minting your NFTs, please{' '}
            <span
              className='cursor-pointer text-blue-300 hover:text-blue-800'
              onClick={() => setSidemenuVisibility(true)}
            >
              connect your wallet
            </span>
          </h3>
        </div>
      ) : (
        <div className='w-full items-center flex flex-col'>
          <div className='w-1/2 mb-2'>
            <ImageUploader onFileChange={handleImageChange} />
          </div>
          <input
            className='w-1/2  mb-2 border-2 bg-gray-600 rounded border-gray-300 p-2 text-white'
            placeholder='NFT Title'
            type='text'
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
          <input
            className='w-1/2 mb-2 border-2 bg-gray-600 rounded border-gray-300 p-2 text-white'
            placeholder='Description'
            type='text'
            id='description'
            value={description}
            onChange={handleDescriptionChange}
          />
          <button
            disabled={uploadDisabled}
            className='bg-blue-500 px-8 py-6 transition-all ease-in-out duration-200   mt-4 rounded hover:bg-blue-700 hover:text-white'
            onClick={(e) => handleNftMint(e)}
          >
            Mint my NFT
          </button>
        </div>
      )}
    </div>
  );
};

export default Minter;
