import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { STATUS } from '@/views/SignUpPage/constants/requestStatus';

export interface inputDataType {
  data: string;
  verifyStatus: boolean;
}

interface verificationDataType {
  data: string;
  status: number;
}

export interface preferRegionDataType {
  data: boolean[];
  verifyStatus: boolean;
}

export interface selectDateType {
  data: string[];
}

export interface searchAddressType {
  data: string;
}

export interface inputImgType {
  data: string;
  file: File;
}

const { persistAtom } = recoilPersist({
  key: '사용자 타입',
  storage: sessionStorage,
});

export const userTypeState = atom({
  key: 'userType',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const tempUserTypeState = atom<string>({
  key: 'tempUserType',
  default: '',
});

export const marketingState = atom<boolean>({
  key: 'marketing',
  default: false,
});

export const nameState = atom<inputDataType>({
  key: 'name',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const birthYearState = atom<inputDataType>({
  key: 'birthYear',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const genderState = atom<inputDataType>({
  key: 'gender',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const preferRegionState = atom<preferRegionDataType>({
  key: 'preferRegion',
  default: {
    data: [],
    verifyStatus: false,
  },
});

export const regionState = atom<{ id: number; name: string }[]>({
  key: 'region',
  default: [],
});

export const phoneNumberState = atom<verificationDataType>({
  key: 'phoneNumber',
  default: {
    data: '',
    status: STATUS.NOT_AVAILABLE,
  },
});

export const verifyCodeState = atom<verificationDataType>({
  key: 'verityCode',
  default: {
    data: '',
    status: STATUS.NOT_AVAILABLE,
  },
});

export const shopInfoState = atom<inputDataType>({
  key: 'shopInfo',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const addressState = atom<searchAddressType>({
  key: 'addressInfo',
  default: { data: '' },
});

export const detailShopInfoState = atom<inputDataType>({
  key: 'detailShopInfo',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const dateState = atom<selectDateType>({
  key: 'dateInfo',
  default: {
    data: ['', '', '', '', '', '', ''],
  },
});

export const profileImgState = atom<inputImgType>({
  key: 'profilePictureInfo',
  default: {
    data: '',
    file: new File([], 'empty.txt'),
  },
});

export const instagramLinkState = atom<inputDataType>({
  key: 'instagramLinkInfo',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const naverPlaceState = atom<inputDataType>({
  key: 'naverPlaceInfo',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const designerInfoState = atom<inputDataType>({
  key: 'deisgnerInfo',
  default: {
    data: '',
    verifyStatus: false,
  },
});

export const openLinkState = atom<inputDataType>({
  key: 'openLinkInfo',
  default: {
    data: '',
    verifyStatus: false,
  },
});