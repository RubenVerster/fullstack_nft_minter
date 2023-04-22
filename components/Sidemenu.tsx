import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { ISidemenuProps, Pages } from '../types';
import { formatEther } from 'ethers/lib/utils';

import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core';
import { GiFoxHead } from 'react-icons/gi';

import { config } from '../types';
const Sidemenu: React.FC<ISidemenuProps> = ({ sidemenuVisibility, toggleSideMenu, setPage }) => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  if (chainId && !config.readOnlyUrls![chainId]) {
    return <p>Please use Goerli testnet.</p>;
  }

  function handleToggleClick() {
    toggleSideMenu();
  }

  const { deactivate, activateBrowserWallet } = useEthers();

  return (
    <div
      className={`p-4 fixed z-10 h-full top-0 ${
        sidemenuVisibility ? 'right-0' : '-right-1/4'
      } w-1/4 sm:w-full lg:w-1/4 bg-black border-l-2 border-white transition-all duration-400 ease-in-out`}
    >
      <div className='relative h-full'>
        <div className='flex flex-col justify-center text-center'>
          <div className='mb-4 text-white flex justify-between'>
            <h2 className='text-xl'>Menu</h2>
            <button onClick={() => handleToggleClick()}>
              <VscClose size={24} />
            </button>
          </div>
          <button
            className='bg-blue-400 hover:bg-blue-700 transition-all ease-in-out duration-200 hover:scale-105 hover:text-white w-full p-2 my-2 rounded'
            onClick={() => setPage(Pages.DASHBOARD)}
          >
            Dashboard
          </button>
          <button
            className='bg-blue-400 hover:bg-blue-700 transition-all ease-in-out duration-200 hover:scale-105 hover:text-white w-full p-2 my-2 rounded'
            onClick={() => setPage(Pages.MINTER)}
          >
            Minter
          </button>

          <div className='absolute bottom-2 w-full'>
            {etherBalance && (
              <div className='bg-white text-black p-2'>
                <br />
                Address:
                <p className='bold'>{account}</p>
                <br />
                Balance:
                <p className='bold'>{formatEther(etherBalance)} ETH</p>
              </div>
            )}

            <div className='mt-2 '>
              {account ? (
                <button className='text-white p-1 bg-red-700 w-full rounded' onClick={() => deactivate()}>
                  Disconnect Wallet
                </button>
              ) : (
                <button
                  className='flex text-center align-middle justify-center bg-white w-full rounded p-2'
                  onClick={() => activateBrowserWallet()}
                >
                  <GiFoxHead className='mr-2' size={24} /> Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
