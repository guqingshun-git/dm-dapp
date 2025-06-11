// src/components/AuthRoute.tsx
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

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
        <button
          onClick={() => window.location.reload()} // 简化登录触发
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          立即登录
        </button>
      </div>
    );
};

export default AuthRoute;