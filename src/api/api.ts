// src/api/api.ts
import apiClient from '@/api'; // 已实现的axios实例
import { UserInfo } from '@/types/user';

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

// DM代币提现
export const withdrawDm = (
  address: string,
  amount: BigInt // 现在只接收提现金额
): Promise<UserInfo> => 
  apiClient.put(`user/${address}`, { walletAddress: address, amount: amount.toString() }); // 注意：amount需要转换成字符串，因为BigInt不能直接序列化

// USDT提现
export const withdrawUsdt = (
  address: string,
  amount: BigInt // 现在只接收提现金额
): Promise<UserInfo> => 
  apiClient.put(`user/${address}`, { walletAddress: address, amount: amount.toString() });

// 其他接口示例
export const fetchPosts = () => apiClient.get('/posts');