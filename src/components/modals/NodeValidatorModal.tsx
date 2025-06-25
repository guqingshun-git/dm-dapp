import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import {Progress} from "@heroui/progress";
import { useAuth } from '@/providers/AuthProvider';
import { useWriteContract } from 'wagmi';
import { type Address } from 'viem';
import { DMTF_CONTRACT } from '@/contracts/dmtfContract';
import { nodeValidator } from '@/api/api';
import Decimal from 'decimal.js';
import { FUND_WALLET } from '@/config/env';

interface NodeValidatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const NodeValidatorModal: React.FC<NodeValidatorModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess
}) => {
  const { session } = useAuth();
  const [isApproving, setIsApproving] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  // 区块链精度处理
  const UNIT = new Decimal('1e18');
  const REQUIRED_AMOUNT = new Decimal('2000').times(UNIT);

  // 请将fundWallet地址替换为实际资金钱包地址
  const fundWallet: Address = FUND_WALLET as Address;

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

  const handleAuth = async () => {
    if (!session?.address) {
      setError('用户未登录');
      return;
    }
    try {
      setError(null);
      setIsApproving(true);
      // 直接转账到资金钱包
      const txHash = await writeContractAsync({
        address: DMTF_CONTRACT.address as Address,
        abi: DMTF_CONTRACT.abi,
        functionName: 'transfer',
        args: [fundWallet, REQUIRED_AMOUNT.toFixed(0)],
        gas: 80000n
      });
      if (!txHash) {
        throw new Error('交易未成功');
      }
      setTxHash(txHash);
      // 提交后端验证
      await nodeValidator(
        session.address,
        txHash,
        BigInt(REQUIRED_AMOUNT.toFixed(0))
      );
      onSuccess('节点认证成功！');
      onClose();
    } catch (err: any) {
      setError(err.shortMessage?.includes('User rejected')
        ? '用户取消交易'
        : err.message || '交易失败'
      );
    } finally {
      setIsApproving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        {/* 头部图标与标题 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-blue-500/10">
            <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24">
              <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">验证节点认证</h3>
        </div>

        {/* 认证流程指示器 */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Progress 
              value={isApproving ? 33 : 66} 
              className="h-2 bg-gray-700"
              color="secondary"
              aria-label="节点认证进度"
            />
            <span className="text-gray-400">
              {isApproving ? '授权中...' : '交易确认中...'}
            </span>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-800/50">
            <p className="text-sm text-gray-400">需要质押</p>
            <p className="text-2xl font-bold text-white">2,000 DMTF</p>
            <p className="text-xs text-gray-400 mt-2">质押代币将在解除节点身份后返还</p>
          </div>
        </div>

        {/* 交易哈希显示 */}
        {txHash && (
          <div className="mb-4 text-sm break-all">
            <span className="text-gray-400">交易哈希：</span>
            <a 
              href={`tx/${txHash}`}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener"
            >
              {txHash.slice(0, 12)}...{txHash.slice(-6)}
            </a>
          </div>
        )}

        {/* 错误提示 */}
        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

        {/* 操作按钮 */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="flat" 
            onClick={onClose}
            disabled={isApproving}
          >
            取消
          </Button>
          <Button
            color="secondary"
            onClick={handleAuth}
            isLoading={isApproving}
            disabled={isApproving || !session}
          >
            {isApproving ? '处理中...' : '确认质押'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeValidatorModal;