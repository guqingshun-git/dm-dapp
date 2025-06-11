import { useContractCall } from './useContractCall';
import { USDT_CONTRACT, DM_CONTRACT } from '@/contracts/dmContract';
import { parseUnits } from 'viem';
import { UseContractCallReturn } from './useContractCall'; // 导入定义的类型

// 自定义Hook：封装银行业务操作
export const useBankOperations = () => {
  // 1. 解构并重命名状态属性（关键修复点）
  const { 
    call: usdtCall, 
    query: usdtQuery, // 重命名query方法
    isPending,        // 交易等待状态
    isReading,        // 数据读取状态
    error,            // 错误对象
    txHash            // 交易哈希
  } = useContractCall(USDT_CONTRACT) as UseContractCallReturn; // 类型断言确保类型安全

  // 2. USDT转账到合约方法
  const transferUSDTToContract = async (_address: string | undefined, amount: string) => {
    // 转换金额为USDT最小单位（1 USDT = 1,000,000 wei）
    const amountInWei = parseUnits(amount, 6);
    
    // 调用USDT合约的transfer方法
    await usdtCall('transfer', [DM_CONTRACT.address, amountInWei]);
  };

  // 3. 查询用户USDT余额
  const getUSDTBalance = async (userAddress: string) => {
    const balance = await usdtQuery('balanceOf', [userAddress]);
    return Number(balance) / 1e6; // 转换回USDT单位
  };

  // 4. 返回业务方法和状态
  return {
    transferUSDTToContract, // USDT转账方法
    getUSDTBalance,          // 余额查询方法
    isPending,               // 交易进行中状态（替代isLoading）
    isReading,               // 数据读取状态
    error,                   // 错误信息
    txHash                   // 交易哈希
  };
};