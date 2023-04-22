// contracts/nftContract.ts

import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

// Import the contract ABI
import nftContractABI from '../contractABI.json';

// Replace with your NFT contract address
const nftContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export function createNftContract(library: Web3Provider): Contract {
  return new Contract(nftContractAddress!, nftContractABI.abi, library.getSigner());
}
