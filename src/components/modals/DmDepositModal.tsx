import React, { useState } from 'react';
import { Button } from '@heroui/button';
import { Progress } from '@heroui/progress';
import { useAuth } from '@/providers/AuthProvider';
import { useWriteContract } from 'wagmi';
import { type Address } from 'viem';
import { DM_CONTRACT } from '@/contracts/dmContract';
import { useTokenBalance } from '@/contracts/calls/tokens';
import Decimal from 'decimal.js';
// import { addToast } from '@heroui/toast';
import { depositDm } from '@/api/api'; // 假设后台充值验证接口类似

interface DmDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const DmDepositModal: React.FC<DmDepositModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { session } = useAuth();
  const [amount, setAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  // 区块链精度处理
  const UNIT = new Decimal('1e18');
  const userAddress = session?.address as Address;
  const balance: bigint | undefined = useTokenBalance(userAddress);

  React.useEffect(() => {
    if (isOpen) {
      setAnimationClass('opacity-0 scale-95');
      setTimeout(() => setAnimationClass('opacity-100 scale-100 transition-all duration-300'), 10);
    } else {
      setAnimationClass('opacity-0 scale-95 transition-all duration-300');
    }
  }, [isOpen]);

  const { writeContractAsync } = useWriteContract();

  const handleDeposit = async () => {
    if (!userAddress) {
      setError('用户未登录');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('请输入正确的充值数量');
      return;
    }
    const depositAmount = new Decimal(amount).times(UNIT);
    if (!balance || new Decimal(balance.toString()).lt(depositAmount)) {
      setError('余额不足');
      return;
    }
    try {
      setError(null);
      setIsDepositing(true);
      // 转账到合约地址
      const txHash = await writeContractAsync({
        address: DM_CONTRACT.address as Address,
        abi: DM_CONTRACT.abi,
        functionName: 'transfer',
        args: [DM_CONTRACT.address, depositAmount.toFixed(0)],
        gas: 80000n
      });
      if (!txHash) {
        throw new Error('交易未成功');
      }
      setTxHash(txHash);
      // 提交后端验证（假设接口为 depositDm，可根据实际更换）
      await depositDm(userAddress, txHash, BigInt(depositAmount.toFixed(0)));
      onSuccess('充值成功！');
      onClose();
    } catch (err: any) {
      setError(err.shortMessage?.includes('User rejected')
        ? '用户取消交易'
        : err.message || '充值失败'
      );
    } finally {
      setIsDepositing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-green-500/10">
            <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24">
              <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">DM代币充值</h3>
        </div>
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Progress 
              value={isDepositing ? 33 : 66} 
              className="h-2 bg-gray-700"
              color="secondary"
              aria-label="充值进度"
            />
            <span className="text-gray-400">
              {isDepositing ? '充值中...' : '等待确认...'}
            </span>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/50">
            <p className="text-sm text-gray-400">充值数量</p>
            <input
              type="number"
              min="0"
              step="0.0001"
              className="w-full mt-2 p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none"
              placeholder="请输入充值数量"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={isDepositing}
            />
            <p className="text-xs text-gray-400 mt-2">钱包余额：{balance ? new Decimal(balance.toString()).div(UNIT).toFixed(4) : '--'} DM</p>
          </div>
        </div>
        {txHash && (
          <div className="mb-4 text-sm break-all">
            <span className="text-gray-400">交易哈希：</span>
            <a 
              href={`tx/${txHash}`}
              className="text-green-400 hover:underline"
              target="_blank"
              rel="noopener"
            >
              {txHash.slice(0, 12)}...{txHash.slice(-6)}
            </a>
          </div>
        )}
        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
        <div className="flex justify-end gap-3">
          <Button 
            variant="flat" 
            onClick={onClose}
            disabled={isDepositing}
          >
            取消
          </Button>
          <Button
            color="secondary"
            onClick={handleDeposit}
            isLoading={isDepositing}
            disabled={isDepositing || !session}
          >
            {isDepositing ? '充值中...' : '确认充值'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DmDepositModal;
