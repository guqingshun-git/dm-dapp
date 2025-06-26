// src/api/api.ts
import apiClient from '@/api'; // 已实现的axios实例
import { UserInfo } from '@/types/user';
// 定义节点认证的响应类型
interface Response {
  // 根据实际返回的字段定义
  success: boolean;
  message?: string;
  // 或者其他字段
}

// 用户信息请求
export const fetchUserInfo = (address: string): Promise<UserInfo> =>
  apiClient.get(`user/${address}`).then(response => response.data);

// 修改用户信息
export const updateUserInfo = (
  address: string,
  data: Partial<UserInfo> // 明确需更新的字段
): Promise<UserInfo> =>
  apiClient.put(`user/${address}`, { ...data, walletAddress: address }); // 修改这里，加入walletAddress

// 提交邀请码
export const submitInviteCode = (
  address: string,
  directInviter: string // 现在只接收邀请人地址
): Promise<UserInfo> =>
  apiClient.put(`user/submitInviteCode/${address}`, { walletAddress: address, directInviter }); // 修改这里，传递包含walletAddress和directInviter的对象

// DM代币提现-第一步：请求签名和记录ID
export const withdrawDmRequest = (
  address: string,
  amount: BigInt
): Promise<{
  withdrawId: string;
  signature: string;
  deadline: string;
  fee: string;
}> =>
  apiClient.post(`user/withdrawDmRequest/${address}`, {
    amount: amount.toString(),
    walletAddress: address
  }).then(response => response.data);

// DM代币提现-第二步：链上操作后回调
export const withdrawDmOnchain = (
  address: string,
  withdrawId: string,
  txHash: string
): Promise<any> =>
  apiClient.post(`user/withdrawDmOnchain/${address}`, {
    withdrawId,
    txHash,
    walletAddress: address
  }).then(response => response.data);

// USDT提现-第一步：请求签名和记录ID
export const withdrawUsdtRequest = (
  address: string,
  amount: BigInt
): Promise<{
  withdrawId: string;
  signature: string;
  deadline: string;
  fee: string;
}> =>
  apiClient.post(`user/withdrawUsdtRequest/${address}`, {
    amount: amount.toString(),
    walletAddress: address
  }).then(response => response.data);

// USDT提现-第二步：链上操作后回调
export const withdrawUsdtOnchain = (
  address: string,
  withdrawId: string,
  txHash: string
): Promise<any> =>
  apiClient.post(`user/withdrawUsdtOnchain/${address}`, {
    withdrawId,
    txHash,
    walletAddress: address
  }).then(response => response.data);

// DM代币转账
export const transferDm = (
  address: string,
  toAddress: string,
  amount: BigInt // 现在只接收提现金额
): Promise<UserInfo> =>
  apiClient.put(`user/transferDm/${address}`, { toAddress, amount: amount.toString() }); // 注意：amount需要转换成字符串，因为BigInt不能直接序列化
// DM代币内部划转
export const accountTransfer = (
  address: string,
  fromAccount: string,
  toAccount: string,
  amount: BigInt // 现在只接收提现金额
): Promise<UserInfo> =>
  apiClient.put(`user/accountTransfer/${address}`, { fromAccount, toAccount, amount: amount.toString() }); // 注意：amount需要转换成字符串，因为BigInt不能直接序列化

  // DM代币充值
export const depositDm = (
  address: string,
  txHash: string,
  amount: BigInt
): Promise<Response> =>
  apiClient.put(`user/depositDm/${address}`, { txHash, amount: amount.toString() }); // 注意：amount需要转换成字符串，因为BigInt不能直接序列化

// 节点认证
export const nodeValidator = (
  address: string,
  txHash: string,
  amount: BigInt
): Promise<Response> =>
  apiClient.put(`user/nodeValidator/${address}`, { txHash, amount: amount.toString() }); // 注意：amount需要转换成字符串，因为BigInt不能直接序列化

// 平仓
export const transferDmrwa = (
  address: string,
  txHash: string,
  amount: BigInt
): Promise<Response> =>
  apiClient.post(`user/transferDmrwa/${address}`, { txHash, amount: amount.toString() }); // 注意：amount需要转换成字符串，因为BigInt不能直接序列化

  // 其他接口示例
export const fetchPosts = () => apiClient.get('/posts');