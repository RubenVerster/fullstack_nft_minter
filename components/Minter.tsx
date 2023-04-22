import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useContractFunction, useEthers } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import ContractAbi from '../contractABI.json';
import { ethers } from 'ethers';

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

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

function YourComponent() {
  const { library, account } = useEthers();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
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

  const { state: mintState, send: mintNFT } = useContractFunction(contract, 'mint', {});

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      //@ts-ignore
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!account) {
      alert('Please connect your wallet');
      return;
    }

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
    <div className='bg-white/10 p-4 w-1/2'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input type='text' id='title' value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input type='text' id='description' value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label htmlFor='image'>Image:</label>
          <input type='file' id='image' accept='image/*' onChange={handleImageChange} />
        </div>
        <button className='bg-green-500 p-2 rounded' type='submit'>
          Mint NFT
        </button>
      </form>
    </div>
  );
}

export default YourComponent;
