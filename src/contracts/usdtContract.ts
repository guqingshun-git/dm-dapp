import { Address } from 'viem';

export interface ContractConfig {
  address: Address;
  abi: any[];
}

export const USDT_CONTRACT: ContractConfig = {
  address: '0x55d398326f99059fF775485246999027B3197955' as Address,
  abi: [
  {
    "constant": false,
    "inputs": [
      {"name": "_spender", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {"name": "_owner", "type": "address"},
      {"name": "_spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  }
] as const,
};