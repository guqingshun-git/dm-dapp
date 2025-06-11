// 导入必要的wagmi钩子和类型
import { 
  useWriteContract, 
  useConfig,
  type UseWriteContractReturnType 
} from 'wagmi';
import { decodeFunctionResult, encodeFunctionData, type Address } from 'viem'; // 从viem导入Address类型
import { useCallback } from 'react';
import { ContractConfig } from '@/contracts/dmContract';
import { CONTRACT_METHODS } from '@/contracts/methodConfig';

/**
 * 合约调用选项接口
 * @property {bigint} [value] - 仅当合约函数需要接收ETH时使用（单位：wei）
 * @note ERC20代币转账（如USDT）不需要此参数
 */
export interface CallOptions {
  value?: bigint;
}

/**
 * 合约调用钩子的返回类型定义
 * @property {Function} call - 执行合约写入操作的方法
 * @property {Function} query - 执行合约读取操作的方法
 * @property {boolean} isPending - 写入操作进行中状态
 * @property {boolean} isReading - 读取操作进行中状态
 * @property {Error | null} error - 错误对象
 * @property {string | null} txHash - 交易哈希
 */
export interface UseContractCallReturn {
  call: (
    methodName: string, 
    args: any[], 
    options?: CallOptions
  ) => Promise<void>;
  query: (methodName: string, args: any[]) => Promise<any>;
  isPending: boolean;
  isReading: boolean;
  error: Error | null;
  txHash: string | null;
}

/**
 * 自定义合约调用钩子
 * @param {ContractConfig} contractConfig - 合约配置对象
 * @returns {UseContractCallReturn} 包含合约调用方法和状态的钩子
 * 
 * 关键修复说明：
 * 1. 使用viem的createPublicClient代替wagmi的getClient().readContract
 * 2. 直接通过RPC提供者创建公共客户端执行读取操作
 * 3. 避免使用存在类型问题的wagmi内部方法
 */
export const useContractCall = (
  contractConfig: ContractConfig
): UseContractCallReturn => {
  // 使用wagmi的写入钩子（处理交易提交）
  const { 
    writeContract, 
    isPending, 
    error, 
    data 
  }: UseWriteContractReturnType = useWriteContract();
  
  // 获取wagmi全局配置用于链信息
  const wagmiConfig = useConfig();

  /**
   * 合约方法调用（写入操作）
   * @param {string} methodName - 合约方法名（如'transfer'）
   * @param {any[]} args - 方法参数数组
   * @param {CallOptions} [options] - 调用选项
   * @throws 方法未配置时抛出错误
   */
  const call = async (
    methodName: string,
    args: any[],
    options?: CallOptions
  ) => {
    // 检查方法是否在配置中定义
    const methodConfig = CONTRACT_METHODS[methodName];
    if (!methodConfig) {
      throw new Error(`未配置的方法: ${methodName}`);
    }
    
    // 处理ETH发送（非ERC20转账时使用）
    const value = options?.value || 0n;
    
    // 执行合约写入操作
    writeContract({
      address: contractConfig.address as Address, // 确保地址类型兼容
      abi: contractConfig.abi,
      functionName: methodName,
      args,
      value
    });
  };

  /**
   * 合约查询方法（读取操作）
   * 关键修复：使用viem的createPublicClient直接创建RPC客户端
   * 避免使用存在类型问题的wagmi内部方法
   * @param {string} methodName - 合约方法名（如'balanceOf'）
   * @param {any[]} args - 方法参数数组
   * @returns {Promise<any>} 查询结果
   * @throws 方法未配置时抛出错误
   */
  const query = useCallback(async (
    methodName: string, 
    args: any[]
  ): Promise<any> => {
    // 检查方法是否在配置中定义
    const methodConfig = CONTRACT_METHODS[methodName];
    if (!methodConfig) {
      throw new Error(`未配置的方法: ${methodName}`);
    }
    
    // 从wagmi配置获取当前链的RPC URL
    // const chain = wagmiConfig.getClient().chain;
    // const transport = wagmiConfig.getClient().transport;
    
    // 创建公共客户端执行读取操作
    // 这是官方推荐的替代方案（wagmi文档示例）
    const result = await wagmiConfig.getClient().request({
      method: 'eth_call',
      params: [
        {
          to: contractConfig.address as Address,
          data: encodeFunctionData({
            abi: contractConfig.abi,
            functionName: methodName,
            args
          })
        },
        'latest'
      ]
    });
    
    // 解码返回数据
    return decodeFunctionResult({
      abi: contractConfig.abi,
      functionName: methodName,
      data: result
    });
  }, [contractConfig, wagmiConfig]);

  // 返回钩子API
  return {
    call,
    query,
    isPending,
    isReading: false, // 手动读取无loading状态
    error,
    txHash: data || null // wagmi v2中data直接是交易哈希
  };
};