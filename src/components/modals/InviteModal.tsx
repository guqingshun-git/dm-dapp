// src/components/modals/InviteModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useAuth } from '@/providers/AuthProvider';
import { submitInviteCode } from '@/api/api'; // 引入提交邀请码的API

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void; // 成功回调
}

const InviteModal: React.FC<InviteModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const { session } = useAuth();
  const [directInviter, setDirectInviter] = useState(''); // 更名为directInviter
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('');

  // 动画效果处理
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
    if (!directInviter.trim()) {
      setError('钱包地址不能为空');
      return;
    }

    // 简单验证钱包地址格式（42字符的十六进制字符串）
    if (!/^0x[a-fA-F0-9]{40}$/.test(directInviter)) {
      setError('请输入有效的钱包地址');
      return;
    }

    if (!session?.address) {
      setError('用户未登录');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // 调用API提交邀请码，使用directInviter字段 [6,7](@ref)
      await submitInviteCode(session.address, directInviter);
      
      // 调用成功回调
      onSuccess('邀请码提交成功！');
      
      // 关闭弹窗
      onClose();
      setDirectInviter('');
    } catch (err: any) {
      setError(err.response?.data?.message || '提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 ${animationClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-blue-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">填写邀请人钱包地址</h3>
        </div>
        
        <Input
          label="邀请人钱包地址"
          placeholder="请输入邀请人的钱包地址"
          value={directInviter}
          onChange={(e) => setDirectInviter(e.target.value)}
          variant="bordered"
          className="mb-4 bg-gray-800 border-gray-700 text-white"
        />
        
        <div className="text-xs text-gray-400 mb-4">
          <p>提示：</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>请输入邀请人的完整钱包地址</li>
            <li>钱包地址应为0x开头的42位十六进制字符串</li>
            <li>提交后不可更改</li>
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
            color="secondary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "提交中..." : "确定"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;