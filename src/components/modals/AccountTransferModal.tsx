import React, { useState, useEffect, useMemo } from 'react';
import { Button, ButtonGroup } from '@heroui/button';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/dropdown";
import { Input } from '@heroui/input';
import { Tooltip } from '@heroui/tooltip';
import { useAuth } from '@/providers/AuthProvider';
import { accountTransfer } from '@/api/api';
import Decimal from "decimal.js";

interface AccountTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const AccountTransferModal: React.FC<AccountTransferModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess
}) => {
  const { session, userInfo } = useAuth();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');
  
  // 账户类型状态管理
  const [transferType, setTransferType] = useState<'dmToComp' | 'compToDm'>('dmToComp');
  
  // 定义区块链精度单位 (1e18)
  const ONE_UNIT = useMemo(() => new Decimal('1000000000000000000'), []);
  
  // 使用 Decimal 处理余额 [3,6](@ref)
  const fromBalance = useMemo(() => {
    const balanceStr = transferType === 'dmToComp' 
      ? userInfo?.dmAccount?.balance || '0' 
      : userInfo?.compAccount?.balance || '0';
    return new Decimal(balanceStr);
  }, [transferType, userInfo]);
  
  const toBalance = useMemo(() => {
    const balanceStr = transferType === 'dmToComp' 
      ? userInfo?.compAccount?.balance || '0' 
      : userInfo?.dmAccount?.balance || '0';
    return new Decimal(balanceStr);
  }, [transferType, userInfo]);

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

  // 账户类型描述映射
  const descriptionsMap = {
    dmToComp: "将DM账户资金转入复利账户",
    compToDm: "将复利账户资金转回DM账户",
  };

  const labelsMap = {
    dmToComp: "DM账户 → 复利账户",
    compToDm: "复利账户 → DM账户",
  };

  const handleSubmit = async () => {
    if (!session?.address) {
      setError('用户未登录');
      return;
    }

    // 使用 Decimal 处理金额输入 [1,6](@ref)
    let amountDecimal;
    try {
      amountDecimal = new Decimal(amount);
    } catch (e) {
      setError('请输入有效的数字');
      return;
    }
    
    if (amountDecimal.isNaN() || amountDecimal.lte(0)) {
      setError('请输入有效的划转金额');
      return;
    }
    
    // 最低金额限制
    if (amountDecimal.lt(10)) {
      setError('单笔划转金额不能低于10 DM');
      return;
    }
    
    // 转换为区块链精度单位 [3,5](@ref)
    const transferAmount = amountDecimal.times(ONE_UNIT);
    
    // 使用 Decimal 进行精确比较 [7](@ref)
    if (transferAmount.gt(fromBalance)) {
      setError(`划转金额不能超过可用余额 (${fromBalance.div(ONE_UNIT).toFixed(2)} DM)`);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Decimal 先转整数字符串，再转 BigInt，避免科学计数法
      const transferAmountStr = transferAmount.toFixed(0); // 转为普通整数字符串
      await accountTransfer(
        session.address,
        transferType === 'dmToComp' ? 'dmAccount' : 'compAccount',
        transferType === 'dmToComp' ? 'compAccount' : 'dmAccount',
        BigInt(transferAmountStr) // 这样不会报错
      );
      onSuccess('DM账户划转成功！');
      onClose();
      setAmount('');
    } catch (err: any) {
      // console.error('划转异常:', err);
      // 提取错误信息，优先使用后端返回的消息
      setError(err.response?.data?.message || '划转失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        {/* 标题部分 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-purple-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">DM账户互转</h3>
        </div>
        
        {/* 账户切换控件 */}
        <div className="mb-6">
          <ButtonGroup variant="flat" className="w-full">
            <Button className="flex-1 justify-between">
              <span>{labelsMap[transferType]}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="账户划转选项"
                className="max-w-[300px]"
                onAction={(key) => setTransferType(key as 'dmToComp' | 'compToDm')}
              >
                <DropdownItem key="dmToComp" description={descriptionsMap["dmToComp"]}>
                  {labelsMap["dmToComp"]}
                </DropdownItem>
                <DropdownItem key="compToDm" description={descriptionsMap["compToDm"]}>
                  {labelsMap["compToDm"]}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>

          {/* 余额显示区域 - 使用 Decimal 格式化显示 */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-gray-300">
            <Tooltip content="转出账户可用余额" placement="top">
              <div className="p-3 rounded-lg bg-gray-800/50">
                <p className="text-sm">转出账户</p>
                <p className="text-white font-mono">
                  {fromBalance.div(ONE_UNIT).toFixed(2)} DM
                </p>
              </div>
            </Tooltip>
            <Tooltip content="转入账户当前余额" placement="top">
              <div className="p-3 rounded-lg bg-gray-800/50">
                <p className="text-sm">转入账户</p>
                <p className="text-white font-mono">
                  {toBalance.div(ONE_UNIT).toFixed(2)} DM
                </p>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* 金额输入 */}
        <Input
          label="划转金额"
          placeholder="请输入金额"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
          variant="bordered"
          className="mb-4 bg-gray-800 border-gray-700 text-white"
          endContent={
            <button 
              className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
              onClick={() => setAmount(fromBalance.div(ONE_UNIT).toFixed(2))}
            >
              全部转入
            </button>
          }
        />
        
        {/* 操作提示 */}
        <div className="text-xs text-gray-400 mb-4">
          <p className="mb-2">📌 操作须知：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>单笔划转最低 10 DM</li>
            <li>每日最多可操作 3 次账户互转</li>
            <li>复利账户资金自动参与收益计算</li>
          </ul>
        </div>
        
        {/* 错误提示 */}
        {error && (
          <div className="text-red-400 text-sm mb-4">{error}</div>
        )}
        
        {/* 操作按钮 */}
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
            color="secondary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting || !amount}
            className="shadow-lg shadow-purple-500/20"
          >
            {isSubmitting ? "划转中..." : "确认划转"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountTransferModal;