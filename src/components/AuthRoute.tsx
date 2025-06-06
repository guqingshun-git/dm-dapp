// src/components/AuthRoute.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { session } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!session.address) {
      // 记录用户试图访问的路径
      localStorage.setItem("redirectPath", location.pathname);
    }
  }, [session, location]);

  // 在 TP 钱包环境下直接显示加载状态
  if (!session.address) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">钱包连接中，请稍候...</p>
      </div>
    );
  }

  return children;
};

export default AuthRoute;