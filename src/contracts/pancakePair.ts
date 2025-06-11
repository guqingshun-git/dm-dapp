// src/contracts/pancakePair.ts
export const USDT_DM_PAIR = {
  address: '0xYOUR_PAIR_ADDRESS' as `0x${string}`, // 替换实际交易对地址
  abi: [
    {
      name: 'getReserves',
      type: 'function',
      stateMutability: 'view',
      outputs: [
        { name: 'reserve0', type: 'uint112' },
        { name: 'reserve1', type: 'uint112' }
      ]
    },
    {
      name: 'token0',
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'address' }]
    }
  ] as const
}