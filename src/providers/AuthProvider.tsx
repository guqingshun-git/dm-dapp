import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { SiweMessage } from 'siwe';
import apiClient from '@/api';
import { fetchUserInfo } from '@/api/api';
import { UserInfo } from '@/types/user';
interface AuthContextType {
  session: { address?: string };
  signIn: () => Promise<void>;
  signOut: () => void;
  userInfo: UserInfo | null; // 用户基础信息字段
  setUserInfo: (info: UserInfo) => void; // 更新方法
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient(); // 直接获取全局实例
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const location = useLocation();

  const [session, setSession] = useState<{ address?: string }>({});
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // 新增状态

  // ✅ 核心登录逻辑
  const signIn = async (): Promise<void> => {
    // console.log('开始登录')
    if (!address) return;

    try {
      // 1. 获取nonce
      const nonceRes = await apiClient.get('/nonce');
      const nonce = nonceRes.data?.nonce;
      if (!nonce) throw new Error("无法获取登录凭证");

      // 2. 构建签名消息
      const siweMessage = new SiweMessage({
        scheme: window.location.protocol.replace(':', ''),
        domain: window.location.host,
        address,
        statement: "Sign in to DMAPP",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id || 56,
        nonce,
        issuedAt: new Date().toISOString()
      });

      const message = siweMessage.prepareMessage();

      // 3. 触发钱包签名
      const signature = await signMessageAsync({ message });

      // 4. 验证签名
      const verifyRes = await apiClient.post('/verify', {
        message: JSON.parse(JSON.stringify(siweMessage)),
        signature
      });

      if (!verifyRes.data?.success) {
        throw new Error(verifyRes.data?.error || '验证失败');
      }

      // 5. 设置会话状态
      localStorage.setItem('jwt', verifyRes.data.token);
      setSession({ address });
      console.log("✅ 登录成功，已设置会话");
    } catch (error: any) {
      console.error("登录失败:", error.message);
      setSession({});
      setUserInfo(null);
    }
  };

  // ✅ 自动登录检测
  useEffect(() => {
    console.log("路由变化检测自动登录检测", location.pathname);
    const handleAutoLogin = async () => {
      if (isConnected && address) {
        console.log("钱包连接状态变化: connected");

        // 检查是否已有JWT
        const hasJWT = !!localStorage.getItem('jwt');

        if (!hasJWT) {
          console.log("检测到钱包连接，触发自动登录");
          await signIn();
        } else {
          console.log("检测到JWT，恢复会话");
          // ✅ 恢复会话时同步获取用户信息
          try {
            const userResponse = await fetchUserInfo(address);
            setUserInfo(userResponse.data);
          } catch (error) {
            console.error('用户信息获取失败', error);
            // 失败时保持基础信息
            setUserInfo({ _id: "", balance: "0", walletAddress: address });
          }
          setSession({ address });
        }
      } else if (!isConnected) {
        console.log("钱包连接状态变化: disconnected");
        setSession({});
      }
    };

    handleAutoLogin();
  }, [isConnected, address, location]);

  const signOut = () => {
    localStorage.removeItem('jwt');
    setSession({});
    setUserInfo(null);
    disconnect();
    queryClient.clear();
    console.log("✅ 已退出登录");
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth必须在AuthProvider内使用");

  // 封装认证状态检查
  return {
    ...context,
    isAuthenticated: !!context.session.address
  };
};

// ✅ 简化的钱包状态展示组件
export const WalletConnectStatus = () => {
  const { session, signOut, isAuthenticated } = useAuth();
  return (
    <div className="px-4 py-2 rounded-lg bg-gray-100 flex items-center">
      {isAuthenticated ? (
        <div className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="font-mono text-sm">
            {`${session.address?.slice(0, 6)}...${session.address?.slice(-4)}`}
          </span>
          <button
            onClick={signOut}
            className="ml-4 text-sm text-red-500 hover:underline"
          >
            断开
          </button>
        </div>
      ) : (
        <span className="text-gray-500">未连接钱包</span>
      )}
    </div>
  );
};
