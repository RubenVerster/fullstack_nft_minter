import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { ISidemenuProps, Pages } from '../types';
import { formatEther } from 'ethers/lib/utils';

import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core';

import { config } from '../types';
const Sidemenu: React.FC<ISidemenuProps> = ({ sidemenuVisibility, toggleSideMenu, setPage }) => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  if (chainId && !config.readOnlyUrls![chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>;
  }

  function handleToggleClick() {
    toggleSideMenu();
  }

  const { deactivate, activateBrowserWallet } = useEthers();
  const ConnectButton = () => {
    // 'account' being undefined means that we are not connected.
    if (account) return <button onClick={() => deactivate()}>Disconnect</button>;
    else return <button onClick={() => activateBrowserWallet()}>Connect</button>;
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

          <div className='bg-white text-black'>
            <ConnectButton />
            {etherBalance && (
              <div>
                <br />
                Address:
                <p className='bold'>{account}</p>
                <br />
                Balance:
                <p className='bold'>{formatEther(etherBalance)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
