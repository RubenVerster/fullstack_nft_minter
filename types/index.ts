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
  nfts: Nft[];
  setNft: React.Dispatch<React.SetStateAction<Nft>>;
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