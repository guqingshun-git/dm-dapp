import { useWriteContract } from 'wagmi'
import { parseEther, type Address } from 'viem'
import { DM_CONTRACT } from '@/contracts/dmContract'

export const useDeposit = (amount: string) => {
  // 使用最新 useWriteContract API
  const {
    writeContract,
    data: txHash,
    isPending: isLoading,
    error
  } = useWriteContract({
    mutation: {
      onSuccess: (hash) => console.log('交易已提交:', hash),
      onError: (err) => console.error('交易错误:', err)
    }
  })

//   const { data: receipt } = useWaitForTransactionReceipt({ 
//     hash: txHash,
//     confirmations: 2 // 等待2个区块确认
//   })
  // 封装存款方法
  const deposit = () => {
    if (!amount || parseFloat(amount) <= 0) return
    
    writeContract({
      address: DM_CONTRACT.address as Address,
      abi: DM_CONTRACT.abi,
      functionName: 'deposit',
      args: [parseEther(amount)],
      value: parseEther(amount)  // 发送等值ETH
    })
  }

  return {
    deposit,      // 触发充值的函数
    txHash,       // 交易哈希 (data.hash 已改为直接返回hash)
    isLoading,    // 加载状态
    error         // 错误信息
  }
}