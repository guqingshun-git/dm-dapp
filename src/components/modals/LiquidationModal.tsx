import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useAuth } from '@/providers/AuthProvider';
import { useWriteContract } from 'wagmi';
import { type Address } from 'viem';
import { DMRWA_CONTRACT } from '@/contracts/dmrwaContract';
import { transferDmrwa } from '@/api/api';
import Decimal from 'decimal.js';
import { FUND_WALLET } from '@/config/env';

interface LiquidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const LiquidationModal: React.FC<LiquidationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { session } = useAuth();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  // 区块链精度处理
  const UNIT = new Decimal('1e18');

  // 合约写入方法
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('opacity-0 scale-95');
      setTimeout(() => setAnimationClass('opacity-100 scale-100 transition-all duration-300'), 10);
    } else {
      setAnimationClass('opacity-0 scale-95 transition-all duration-300');
    }
  }, [isOpen]);

  const handleLiquidate = async () => {
    setError(null);
    if (!session?.address) {
      setError('用户未登录');
      return;
    }
    try {
      const amountDec = new Decimal(amount);
      if (amountDec.isNaN() || amountDec.lte(0)) {
        setError('输入有效金额');
        return;
      }
      if (amountDec.gt(500)) {
        setError('平仓数量不能超过500');
        return;
      }
      setIsSubmitting(true);
      // 直接链上调用，无授权
      const bigIntAmount = BigInt(amountDec.times(UNIT).toFixed(0));
      const txHash = await writeContractAsync({
        address: DMRWA_CONTRACT.address as Address,
        abi: DMRWA_CONTRACT.abi,
        functionName: 'transfer',
        args: [FUND_WALLET as Address, bigIntAmount],
        gas: 80000n,
      });
      if (!txHash) {
        throw new Error('交易未成功');
      }
      setTxHash(txHash);
      // 回调后端
      await transferDmrwa(session.address, txHash, bigIntAmount);
      onSuccess('平仓操作已提交！');
      onClose();
      setAmount('');
    } catch (err: any) {
      setError(err.shortMessage?.includes('User rejected') ? '用户取消交易' : '合约调用失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-red-500/10">
            <svg className="h-6 w-6 text-red-400" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">平仓操作</h3>
        </div>
        <div className="mb-6 space-y-4">
          <Input
            label="平仓数量 (DMRWA)"
            placeholder="输入要平仓的数量"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            variant="bordered"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        {/* 交易哈希显示 */}
        {txHash && (
          <div className="mb-4 text-sm break-all">
            <span className="text-gray-400">交易哈希：</span>
            <a
              href={`${import.meta.env.VITE_BLOCK_EXPLORER}/tx/${txHash}`}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener"
            >
              {txHash.slice(0, 12)}...{txHash.slice(-6)}
            </a>
          </div>
        )}
        {/* 错误处理 */}
        {error && (
          <div className="text-red-400 text-sm mb-4 break-words p-2 bg-red-900/20 rounded">{error}</div>
        )}
        <div className="flex justify-end gap-3">
          <Button
            variant="flat"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-300 hover:bg-gray-700"
          >
            取消
          </Button>
          <Button
            color="danger"
            onClick={handleLiquidate}
            isLoading={isSubmitting}
            disabled={!amount || isSubmitting}
          >
            {isSubmitting ? '提交中...' : '确认平仓'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiquidationModal;