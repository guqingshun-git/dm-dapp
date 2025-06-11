// src/components/WalletStatusListener.tsx
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '@/providers/AuthProvider';

export default function WalletStatusListener() {
  const { address, status } = useAccount();
  const { signIn, signOut } = useAuth();

  useEffect(() => {
    console.log(`钱包连接状态变化: ${status}`);
    
    if (status === 'connected') {
      console.log(`已连接钱包: ${address}`);
      signIn(); // 钱包连接时自动触发登录
    }
    
    if (status === 'disconnected') {
      console.log('钱包已断开');
      signOut(); // 钱包断开时自动登出
    }
  }, [status, address, signIn, signOut]);

  return null;
}