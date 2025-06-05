import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/providers/AuthProvider'; // 改为使用useAuth钩子
import { useAccount } from 'wagmi';

export function AuthButton() {
  // 使用useAuth钩子获取认证状态
  const { session, signIn, signOut } = useAuth();
  const { isConnected } = useAccount();

  return (
    <div className="flex gap-2 items-center">
      <ConnectButton />
      
      {/* 钱包已连接但未认证时显示SIWE按钮 */}
      {isConnected && !session?.address && (
        <button 
          onClick={signIn}
          className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
        >
          SIWE 登录
        </button>
      )}
      
      {/* 已认证状态显示登出按钮 */}
      {session?.address && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {session.address.slice(0, 6)}...{session.address.slice(-4)}
          </span>
          <button 
            onClick={signOut}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
          >
            登出
          </button>
        </div>
      )}
    </div>
  );
}