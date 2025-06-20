// src/contracts/calls/tokens.ts
import { DM_CONTRACT } from '../dmContract';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import { fetchWithdrawalSignature } from '../api/signature';
import { 
  useReadContract, 
  useWriteContract,
  useWalletClient 
} from 'wagmi';

// ====================== 类型安全的合约读取方法 ======================
/** 获取域分隔符 (返回 string) */
export const useDomainSeparator = () => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'DOMAIN_SEPARATOR'
  });
  return data as string | undefined;
};

/** 获取代币名称 (返回 string) */
export const useTokenName = () => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'name'
  });
  return data as string | undefined;
};

/** 获取账户余额 (返回 bigint) */
export const useTokenBalance = (account: Address) => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'balanceOf',
    args: [account]
  });
  return data as bigint | undefined;
};

export const useTotalSupply = () => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'totalSupply',
    args: []
  });
  return data as bigint | undefined;
};
/** 获取流动性池地址 (返回 Address) */
export const useLiquidityPool = () => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'getLiquidityPool'
  });
  return data as Address | undefined;
};

/** 检查角色权限 (返回 boolean) */
export const useHasRole = (role: string, account: Address) => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'hasRole',
    args: [role, account]
  });
  return data as boolean | undefined;
};

/** 获取总销毁量 (返回 bigint) */
export const useTotalBurned = () => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'getTotalBurned'
  });
  return data as bigint | undefined;
};

/** 获取签名者地址 (返回 Address) */
export const useSignerAddress = () => {
  const { data } = useReadContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'getSigner'
  });
  return data as Address | undefined;
};

// ====================== 提现方法 ======================
/** 提现通用逻辑 */
const useWithdrawToken = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { writeContractAsync } = useWriteContract();

  return async (
    functionName: 'withdrawDM' | 'withdrawUSDT',
    amount: bigint,
    fee: bigint
  ) => {
    if (!address || !walletClient) throw new Error('钱包未连接');
    
    const { signature, deadline } = await fetchWithdrawalSignature(address, amount, fee);
    
    return writeContractAsync({
      address: DM_CONTRACT.address as Address,
      abi: DM_CONTRACT.abi,
      functionName,
      args: [amount, fee, BigInt(deadline), signature],
      account: address
    });
  };
};

/** 提现 DM */
export const useWithdrawDM = () => {
  const withdraw = useWithdrawToken();
  return (amount: bigint, fee: bigint) => withdraw('withdrawDM', amount, fee);
};

/** 提现 USDT */
export const useWithdrawUSDT = () => {
  const withdraw = useWithdrawToken();
  return (amount: bigint, fee: bigint) => withdraw('withdrawUSDT', amount, fee);
};