// src/components/modals/UsdtWithdrawModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useAuth } from '@/providers/AuthProvider';
import { withdrawUsdtRequest, withdrawUsdtOnchain } from '@/api/api';
import Decimal from 'decimal.js'; // 统一使用Decimal.js进行精度计算
import { useWriteContract } from 'wagmi';
import { DM_CONTRACT } from '@/contracts/dmContract';
import { Address } from 'viem';

interface UsdtWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const UsdtWithdrawModal: React.FC<UsdtWithdrawModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess
}) => {
  const { session, userInfo } = useAuth();
  const { writeContractAsync } = useWriteContract();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  const usdtBalance = new Decimal(userInfo?.usdtAccount?.balance || 0);

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('opacity-0 scale-95');
      setTimeout(() => {
        setAnimationClass('opacity-100 scale-100 transition-all duration-300');
      }, 10);
    } else {
      setAnimationClass('opacity-0 scale-95 transition-all duration-300');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!session?.address) {
      setError('用户未登录');
      return;
    }

    // 直接将用户输入金额转为带精度的Decimal
    const amountDecimal = new Decimal(amount).times(1e18);
    if (amountDecimal.isNaN() || amountDecimal.lte(0)) {
      setError('请输入有效的提现金额');
      return;
    }
    if (amountDecimal.gt(usdtBalance)) {
      setError(`提现金额不能超过可用余额 (${usdtBalance.div(1e18).toFixed(2)} USDT)`);
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      // 第一步：请求签名和记录ID
      const { withdrawId, signature, deadline, fee } = await withdrawUsdtRequest(
        session.address,
        BigInt(amountDecimal.toFixed(0))
      );
      if (!withdrawId || !signature || !deadline || !fee) {
        throw new Error('请求提现信息失败，请稍后重试');
      }
      // 第二步：链上合约操作
      const txHash = await writeContractAsync({
        address: DM_CONTRACT.address,
        abi: DM_CONTRACT.abi,
        functionName: 'withdrawUSDT',
        args: [BigInt(amountDecimal.toFixed(0)), BigInt(fee), BigInt(deadline), signature],
        account: session.address as Address
      });
      if (!txHash) {
        throw new Error('链上提现操作失败，请稍后重试');
      }
      await withdrawUsdtOnchain(session.address, withdrawId, txHash);
      onSuccess('USDT提现申请已提交！');
      onClose();
      setAmount('');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || '提现失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-green-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">USDT提现</h3>
        </div>
        
        <div className="text-gray-300 mb-4">
          <p>可用余额: <span className="text-white font-bold">{usdtBalance.div(1e18).toFixed(2)} USDT</span></p>
        </div>
        
        <Input
          label="提现金额"
          placeholder="请输入提现金额"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          variant="bordered"
          className="mb-4 bg-gray-800 border-gray-700 text-white"
        />
      
        <div className="text-xs text-gray-400 mb-4">
          <p>提示：</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>提现手续费为1 USDT</li>
            <li>提现到账时间区块链确认即到账</li>
            <li>请确保钱包地址正确，错误地址将导致资产损失</li>
          </ul>
        </div>
        
        {error && (
          <div className="text-red-400 text-sm mb-4">{error}</div>
        )}
        
        <div className="flex justify-end gap-3">
          <Button 
            variant="flat" 
            color="default"
            onClick={onClose}
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button 
            color="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "处理中..." : "确认提现"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsdtWithdrawModal;