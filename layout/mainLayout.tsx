import { useState } from 'react';
import { Pages } from '../types';

import Head from 'next/head';

import Dashboard from '../components/Dashboard';
import Minter from '../components/Minter';
import Sidemenu from '../components/Sidemenu';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { Nft } from '../types';
import Modal from '../components/Modal';

import { DAppProvider } from '@usedapp/core';
import { config } from '../types';

const MainLayout = () => {
  const [page, setPage] = useState(Pages.DASHBOARD);
  const [sidemenuVisibility, setSidemenuVisibility] = useState(false);

  const [modalVisibility, setModalVisibility] = useState(false);

  const [nft, setNft] = useState<Nft>({
    name: 'test 1',
    description: 'test 1',
    imageSrc: '1.jpeg',
  });

  const toggleSideMenu = () => {
    setSidemenuVisibility(!sidemenuVisibility);
  };

  return (
    <DAppProvider config={config}>
      <div className='h-screen w-full relative px-20 app overflow-hidden'>
        <Head>
          <title>NFT Minter THA</title>
          <meta name='description' content='NFT Minter THA' />
          <link rel='icon' href='/favicon.png' />
        </Head>

        <Header {...{ toggleSideMenu }} />
        {page === Pages.DASHBOARD && <Dashboard {...{ setNft, setModalVisibility }} />}
        {page === Pages.MINTER && <Minter />}
        <Sidemenu {...{ setPage, toggleSideMenu, sidemenuVisibility }} />

        <Modal {...{ modalVisibility, setModalVisibility, nft }} />
        <Footer />
      </div>
    </DAppProvider>
  );
};

export default MainLayout;
