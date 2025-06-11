import { useReadContract } from 'wagmi'
import { Address } from 'viem'

const USDT_DM_PAIR = {
  address: '0xYOUR_PAIR_ADDRESS' as Address,
  abi: [
    {
      name: 'getReserves',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [
        { name: 'reserve0', type: 'uint112' },
        { name: 'reserve1', type: 'uint112' },
        { name: 'blockTimestampLast', type: 'uint32' }
      ]
    },
    {
      name: 'token0',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'address' }]
    }
  ] as const
};

const USDT_ADDRESS = '0x55d398326f99059ff775485246999027b3197955' as Address;

// 定义精确的返回类型
type ReservesType = readonly [bigint, bigint, number] | null;

export const useDmPrice = () => {
  // 1. 使用正确的类型声明
  const { data: reserves, isLoading: reservesLoading } = useReadContract({
    ...USDT_DM_PAIR,
    functionName: 'getReserves',
    query: {
      select: (data: unknown) => {
        if (!data) return null;
        
        // 安全类型转换
        return data as ReservesType;
      }
    }
  });
  
  // 2. token0查询保持不变
  const { data: token0, isLoading: token0Loading } = useReadContract({
    ...USDT_DM_PAIR,
    functionName: 'token0',
    query: {
      select: (data) => data as Address | null
    }
  });

  // 3. 修正的价格计算函数
  const calculatePrice = (): number => {
    try {
      if (!reserves || !token0) return 0;
      
      // 安全的类型处理
      const token0Str = typeof token0 === 'string' ? token0 : '';
      const isToken0USDT = token0Str.toLowerCase() === USDT_ADDRESS.toLowerCase();
      
      // 正确解构只读元组
      const [reserve0, reserve1] = reserves;
      
      const usdtReserve = isToken0USDT ? reserve0 : reserve1;
      const dmReserve = isToken0USDT ? reserve1 : reserve0;
      
      if (dmReserve === 0n) return 0;
      
      // 保持精度计算
      return Number(usdtReserve * 10n**18n / dmReserve) / 1e18;
    } catch (e) {
      console.error('价格计算错误:', e);
      return 0;
    }
  }

  return {
    price: calculatePrice(),
    isLoading: reservesLoading || token0Loading
  }
}