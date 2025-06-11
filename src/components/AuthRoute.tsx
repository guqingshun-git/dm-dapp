// src/components/AuthRoute.tsx
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const AuthRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated 
    ? <Outlet /> 
    : (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">需要登录</h2>
        <p className="text-gray-600 mb-8">
          请连接钱包并登录以访问此页面
        </p>
        <ConnectButton/>
      </div>
    );
};

export default AuthRoute;