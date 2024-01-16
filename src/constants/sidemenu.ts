import { Home, Coins, Network, CandlestickChart, LucideIcon } from 'lucide-react';

export interface MenuList {
  icon: LucideIcon;
  name: string;
  url: string;
}

export const section1: MenuList[] = [
  { icon: Home, name: 'Overview', url: '' },
  { icon: Coins, name: 'Trade Tokens', url: '' },
  { icon: CandlestickChart, name: 'Top Exchanges', url: '' },
  { icon: Network, name: 'Networks', url: '' }
];

