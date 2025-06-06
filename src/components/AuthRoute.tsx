// src/components/AuthRoute.tsx
import { useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

interface AuthRouteProps {
  children?: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const location = useLocation();
  const { session } = useAuth();

  // TP钱包环境检测
  const isInTPWallet = () => {
    return typeof window.ethereum !== 'undefined' && 
           window.ethereum.isTrust; // TP钱包的特殊标识
  };

  // TP钱包未登录/未授权处理
  if (!session.address && isInTPWallet()) {
    localStorage.setItem("redirectPath", location.pathname);
    
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
        {/* TP钱包专属提示 */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center">
          <div className="text-xl font-bold text-purple-400 mb-2">TP钱包授权提示</div>
          <p className="text-gray-300">
            请在TP钱包中完成身份授权
            <br />
            或返回首页重新连接
          </p>
        </div>
        
        {/* 简洁操作按钮 */}
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.reload()} // TP钱包刷新方案
            className="px-5 py-2 bg-purple-600 text-white rounded-md"
          >
            刷新授权状态
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-5 py-2 bg-gray-700 text-white rounded-md"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // 标准网页环境处理
  if (!session.address) {
    localStorage.setItem("redirectPath", location.pathname);
    
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"/>
        <p className="text-white mb-6">正在验证钱包权限...</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-purple-600 text-white rounded-md"
        >
          返回首页
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRoute;