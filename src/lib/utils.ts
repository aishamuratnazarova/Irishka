import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const POSTIMG_MAPPING: Record<string, string> = {
  'ygmsKzST': 'https://i.postimg.cc/G2N2kLL6/925211b5bebd761767383fa9eaaa4ac9-jpg.webp',
  'nj4pxtQG': 'https://i.postimg.cc/nz5zvFFg/optimize-(2).webp',
  '4Y232Zzg': 'https://i.postimg.cc/1zsNt3Xf/9611375913.webp',
  'v42m2MWM': 'https://i.postimg.cc/SKkzsxRX/35-1-kopia.png',
  'qNvRGgCM': 'https://i.postimg.cc/sgphshjS/7050284310.webp',
  'K1pYpFnX': 'https://i.postimg.cc/k5qt4gG5/7391835352.webp',
  '5X20mjFx': 'https://i.postimg.cc/L8z1219Z/1floor.jpg',
  'mPprpRQB': 'https://i.postimg.cc/CKSf1x5B/optimize-(1).webp',
  'hXZGZgVk': 'https://i.postimg.cc/6QtG3pqp/9a349c2a38271146388c7df97fa7add4-png.webp',
  'PCVqVhmd': 'https://i.postimg.cc/9fCqMQ0w/optimize.webp'
};

export function getDirectImageUrl(url: string): string {
  if (!url) return '';
  
  const matches = url.match(/https?:\/\/(?:www\.)?postimg\.cc\/([A-Za-z0-9]+)/);
  if (matches && matches[1]) {
    const id = matches[1];
    if (POSTIMG_MAPPING[id]) {
      return POSTIMG_MAPPING[id];
    }
  }

  if (url.includes('postimg.cc') && !url.includes('i.postimg.cc')) {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    return cleanUrl.replace('postimg.cc', 'i.postimg.cc') + '/image.png';
  }
  return url;
}
