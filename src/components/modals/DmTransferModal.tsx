// src/components/modals/DmTransferModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useAuth } from '@/providers/AuthProvider';
import { transferDm } from '@/api/api';
import Decimal from 'decimal.js'; // 统一使用Decimal.js进行精度计算

interface DmTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const DmTransferModal: React.FC<DmTransferModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess
}) => {
  const { session, userInfo } = useAuth();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  // 使用Decimal处理余额显示和计算
  const dmBalance = new Decimal(userInfo?.dmAccount?.balance || 0);

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
    
    if (!amount) {
      setError('请输入有效的转账金额');
      return;
    }
    if (!address.trim()) {
      setError('请输入钱包地址');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // 使用Decimal处理金额计算，避免精度丢失
      const amountDecimal = new Decimal(amount);
      if (amountDecimal.isNaN() || amountDecimal.lte(0)) {
        setError('请输入有效的转账金额');
        return;
      }
      if (amountDecimal.times(1e18).gt(dmBalance)) {
        setError(`转账金额不能超过可用余额 (${dmBalance.div(1e18).toFixed(2)} DM)`);
        return;
      }
      const amountWithPrecision = amountDecimal.times(1e18).toFixed(0);
      // 直接调用API执行转账
      await transferDm(
        session.address,
        address,
        BigInt(amountWithPrecision)
      );
      onSuccess('DM转账申请已提交！');
      onClose();
      setAmount('');
      setAddress('');
    } catch (err: any) {
      setError(err.response?.data?.message || '转账失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-purple-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">DM代币转账</h3>
        </div>
        
        <div className="text-gray-300 mb-4">
          <p>可用余额: <span className="text-white font-bold">{dmBalance.div(1e18).toFixed(2)} DM</span></p>
        </div>
        
        <Input
          label="转账金额"
          placeholder="请输入转账金额"
          type="text" // 改为text类型，避免number类型的自动转换
          value={amount}
          onChange={(e) => {
            // 只允许输入数字和小数点
            const value = e.target.value.replace(/[^0-9.]/g, '');
            setAmount(value);
          }}
          variant="bordered"
          className="mb-4 bg-gray-800 border-gray-700 text-white"
        />
        
        <Input
          label="钱包地址"
          placeholder="请输入接收DM代币的钱包地址"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="bordered"
          className="mb-4 bg-gray-800 border-gray-700 text-white"
        />
        
        <div className="text-xs text-gray-400 mb-4">
          <p>提示：</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>转账到账时间区块链确认即到账</li>
            <li>请确保钱包支持BSC链上的DM代币</li>
            <li>代币精度：18位小数</li>
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
            {isSubmitting ? "处理中..." : "确认转账"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DmTransferModal;