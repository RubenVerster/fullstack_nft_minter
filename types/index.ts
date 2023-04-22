export enum Pages {
  DASHBOARD = 'dashboard',
  MINTER = 'minter',
}

export interface Nft {
  name: string;
  description: string;
  imageSrc: string;
}

export interface IDashboardProps {
  setNft: React.Dispatch<React.SetStateAction<Nft>>;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  setSidemenuVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModalProps {
  nft: Nft;
  modalVisibility: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface INftThumbnailProps {
  nft: Nft;
  setNft: (nft: Nft) => void;
  setModalVisibility: (visibility: boolean) => void;
}

export interface ISidemenuProps {
  sidemenuVisibility: boolean;
  toggleSideMenu: () => void;
  setPage: (page: Pages) => void;
}

export interface IButtonProps {
  text: string;
  onClick: () => void;
  variant?: ButtonVariants;
  className?: string;
}

export enum ButtonVariants {
  PRIMARY = 'primary',
  ERROR = 'error',
}

import { ChainId, Config, Goerli } from '@usedapp/core';

const getAlchemyEndpoint = () => {
  return process.env.NEXT_PUBLIC_ALCHEMY_ENDPOINT || '';
};

export const config: Config = {
  readOnlyChainId: ChainId.Goerli,
  readOnlyUrls: {
    [Goerli.chainId]: getAlchemyEndpoint(),
  },
};
