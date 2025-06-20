import apiClient from '@/api';

export interface SignatureData {
  signature: `0x${string}`;
  deadline: number;
}

// 1. 订单签名（CreateOrder）—— 未删减
export const fetchOrderSignature = async (
  userAddress: `0x${string}`,
  usdtAmount: bigint
): Promise<SignatureData> => {
  const response = await apiClient.post('/sign/order', {
    userAddress,               // 字段名与后端一致
    usdtAmount: usdtAmount.toString() // 转换为字符串
  });
  
  return {
    signature: response.data.signature as `0x${string}`,
    deadline: Number(response.data.deadline)
  };
};

// 2. 销毁签名（Burn）—— 未删减
export const fetchBurnSignature = async (
  userAddress: `0x${string}`,
  usdtAmount: bigint
): Promise<SignatureData> => {
  const response = await apiClient.post('/sign/burn', {
    userAddress,
    usdtAmount: usdtAmount.toString()
  });
  
  return {
    signature: response.data.signature as `0x${string}`,
    deadline: Number(response.data.deadline)
  };
};

// 3. 提现签名（Withdraw）—— 完整保留
export const fetchWithdrawalSignature = async (
  userAddress: `0x${string}`,
  amount: bigint,
  fee: bigint
): Promise<SignatureData> => {
  const response = await apiClient.post('/sign/withdrawal', {
    userAddress,
    amount: amount.toString(),
    fee: fee.toString()
  });
  
  return {
    signature: response.data.signature as `0x${string}`,
    deadline: Number(response.data.deadline)
  };
};