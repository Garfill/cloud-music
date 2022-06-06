import { atom } from "recoil";

export const bannerState = atom({
  key: 'BannerState',
  default: []
})

export const recommendState = atom({
  key: 'RecommendState',
  default: []
})