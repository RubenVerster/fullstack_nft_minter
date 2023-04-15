import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { ISidemenuProps, Pages } from '../types';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';

const Sidemenu: React.FC<ISidemenuProps> = ({ sidemenuVisibility, toggleSideMenu, setPage }) => {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  function handleToggleClick() {
    toggleSideMenu();
  }

  const userBalance = useEtherBalance(account);
  const handleWalletConnection = async () => {
    if (!account) {
      await activateBrowserWallet();
    } else {
      deactivate();
    }
  };

  return (
    <div
      className={`p-4 fixed z-10 h-full top-0 ${
        sidemenuVisibility ? 'right-0' : '-right-1/4'
      } w-1/4 sm:w-full lg:w-1/4 bg-black border-l-2 border-white transition-all duration-400 ease-in-out`}
    >
      <div className='relative h-full'>
        <div className='flex flex-col justify-center text-center'>
          <div className=' text-white flex justify-between'>
            <h2 className=' mb-4 text-xl'>Menu</h2>
            <button className='' onClick={() => handleToggleClick()}>
              <VscClose />
            </button>
          </div>
          <button className='bg-green-600 w-full p-2 my-2' onClick={() => setPage(Pages.DASHBOARD)}>
            Dashboard
          </button>
          <button className='bg-green-600 w-full p-2 my-2' onClick={() => setPage(Pages.MINTER)}>
            Minter
          </button>

          <button onClick={handleWalletConnection}>{account ? 'Disconnect Wallet' : 'Connect Wallet'}</button>

          {account && (
            <div>
              <p>Account: {account}</p>
              <p>Balance: {userBalance && formatEther(userBalance)} ETH</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
