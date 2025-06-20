import { getWalletClient } from '@wagmi/core';
import { writeContract } from '@wagmi/core';
import { type Address } from 'viem';
import { DM_CONTRACT } from '../dmContract';

// ✅ 创建订单（适配 viem@2.30.6 参数格式）
export const createSignedOrder = async (usdtAmount: bigint) => {
  const client = await getWalletClient();
  if (!client?.account) throw new Error('钱包未连接');

  const { signature, deadline } = await fetchOrderSignature(
    client.account.address,
    usdtAmount.toString()
  );

  return writeContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'createOrder',
    args: [usdtAmount, BigInt(deadline), signature], // 顺序：金额/期限/签名
    account: client.account.address
  });
};

// ✅ 销毁代币（适配 wagmi@2.15.5 调用方式）
export const buyAndBurnDM = async (
  usdtAmount: bigint,
  minDMReceived: bigint
) => {
  const client = await getWalletClient();
  if (!client?.account) throw new Error('钱包未连接');

  const { signature, deadline } = await fetchBurnSignature(
    usdtAmount.toString(),
    minDMReceived.toString()
  );

  return writeContract({
    address: DM_CONTRACT.address as Address,
    abi: DM_CONTRACT.abi,
    functionName: 'buyAndBurnDM',
    args: [usdtAmount, minDMReceived, BigInt(deadline), signature], // 顺序严格匹配
    account: client.account.address,
    gas: 800000n // ⛽ 明确指定Gas防止失败
  });
};