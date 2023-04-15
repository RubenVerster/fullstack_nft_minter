import { useEffect, useState } from 'react';
import { Pages } from '../types';

import Dashboard from '../components/Dashboard';
import Minter from '../components/Minter';
import Sidemenu from '../components/Sidemenu';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { Nft } from '../types';
import Modal from '../components/Modal';

import { DummNfts } from '../dummyData';
import { Network, Alchemy } from 'alchemy-sdk';

const MainLayout = () => {
  const [page, setPage] = useState(Pages.DASHBOARD);
  const [sidemenuVisibility, setSidemenuVisibility] = useState(false);

  const [modalVisibility, setModalVisibility] = useState(false);

  const [nfts, setNfts] = useState<Nft[]>(DummNfts);

  const [nft, setNft] = useState<Nft>({
    name: 'test 1',
    description: 'test 1',
    imageSrc: '1.jpeg',
  });

  const toggleSideMenu = () => {
    setSidemenuVisibility(!sidemenuVisibility);
  };

  return (
    <div className='h-screen w-screen relative px-20 app'>
      <Header {...{ toggleSideMenu }} />
      {page === Pages.DASHBOARD && <Dashboard {...{ nfts, setNft, setModalVisibility }} />}
      {page === Pages.MINTER && <Minter />}
      <Sidemenu {...{ setPage, toggleSideMenu, sidemenuVisibility }} />

      <Modal {...{ modalVisibility, setModalVisibility, nft }} />
      <Footer />
    </div>
  );
};

export default MainLayout;
