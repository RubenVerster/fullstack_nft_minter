This repository requires several environment variables to be set before it can be properly used. These environment variables are used to access different APIs and services that this project relies on. Please make sure that you have the following environment variables set before running the project.

# Required Environment Variables

## Alchemy API Keys

### https://www.alchemy.com/

### ALCHEMY_API_KEY

Required to access the Alchemy API, which is used to query blockchain data.

### NEXT_PUBLIC_ALCHEMY_ENDPOINT

The endpoint generated in your Alchemy app

---

### NEXT_PUBLIC_DEFAULT_CHAIN

Public environment variable used by Next.js to set the default blockchain network to use.
'goerli' is the default network for the app

### NEXT_PUBLIC_CHAIN_ID

The NEXT_PUBLIC_CHAIN_ID is a public environment variable used by Next.js to specify the chain ID for the blockchain network.

You can use '5' as a good placeholder

---

### You can use Infure as your IPFS for this app

### https://app.infura.io/dashboard

### NEXT_PUBLIC_IPFS_API_ENDPOINT

This is the IPFS API endpoint for the Infura IPFS node

'https://ipfs.infura.io:5001' should be good as well

### NEXT_PUBLIC_IPFS_KEY

This is the API KEY value displayed in your Infura Dashboard

### NEXT_PUBLIC_IPFS_SECRET_KEY

This is the API SECRET KEY value displayed in your Infura Dashboard

---

### NEXT_PUBLIC_CONTRACT_ADDRESS

This is the contract address for the NFT contract

## Wrap Up

These environment variables are required for this repository to function properly. Please ensure that they are set before running the project

Check this URL for ABI information as well and the contract address
https://hackmd.io/@saksijas/BkVzZcRTF
