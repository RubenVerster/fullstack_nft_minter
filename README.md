This repository requires several environment variables to be set before it can be properly used. These environment variables are used to access different APIs and services that this project relies on. Please make sure that you have the following environment variables set before running the project.

Required Environment Variables
ALCHEMY_API_KEY
The ALCHEMY_API_KEY is required to access the Alchemy API, which is used to query blockchain data.

ALCHEMY_NETWORK
The ALCHEMY_NETWORK is the name of the network you want to connect to using Alchemy.

NEXT_PUBLIC_ALCHEMY_NETWORK
The NEXT_PUBLIC_ALCHEMY_NETWORK is a public environment variable used by Next.js to access Alchemy's network.

NEXT_PUBLIC_DEFAULT_CHAIN
The NEXT_PUBLIC_DEFAULT_CHAIN is a public environment variable used by Next.js to set the default blockchain network to use.
goerli is the default network for thesting the Web3 app

NEXT_PUBLIC_CHAIN_ID
The NEXT_PUBLIC_CHAIN_ID is a public environment variable used by Next.js to specify the chain ID for the blockchain network.

NEXT_PUBLIC_ALCHEMY_ENDPOINT
The NEXT_PUBLIC_ALCHEMY_ENDPOINT is a public environment variable used by Next.js to access Alchemy's endpoint.
You can use '5' as a good placeholder

### You can use Infure as your IPFS for this account

NEXT_PUBLIC_IPFS_API_ENDPOINT
The NEXT_PUBLIC_IPFS_API_ENDPOINT is a public environment variable used by Next.js to access the IPFS API endpoint.

NEXT_PUBLIC_IPFS_KEY
The NEXT_PUBLIC_IPFS_KEY is a public environment variable used by Next.js to access the IPFS key.

NEXT_PUBLIC_IPFS_SECRET_KEY
The NEXT_PUBLIC_IPFS_SECRET_KEY is a public environment variable used by Next.js to access the IPFS secret key.

NEXT_PUBLIC_CONTRACT_ADDRESS
The NEXT_PUBLIC_CONTRACT_ADDRESS is a public environment variable used by Next.js to set the contract address for the project.

How to set Environment Variables
The way to set these environment variables may vary depending on your operating system and development environment. Here's how to set them using the command line:

Please reference the env file for the correct values

## Conclusion

These environment variables are required for this repository to function properly. Please ensure that they are set before running the project. If you have any questions or concerns, feel free to contact us.
Check this URL for ABI information as well
https://hackmd.io/@saksijas/BkVzZcRTF
