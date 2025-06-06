import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { createSiweMessage } from "viem/siwe";

interface AuthContextType {
  session: { address?: string };
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [session, setSession] = useState<{ address?: string }>({});

  // 在TP钱包中自动连接并验证
  useEffect(() => {
    // 检测到钱包连接且尚未验证时自动触发
    if (isConnected && address && !session.address) {
      signIn();
    }
  }, [isConnected, address, session.address]);

  const signIn = async () => {
    if (!address) return;

    try {
      const nonceResponse = await fetch('/api/nonce');
      const { nonce } = await nonceResponse.json();

      const message = createSiweMessage({
        address,
        statement: "登录 HeroUI 应用",
        chainId: 1,
        domain: window.location.host,
        nonce,
        uri: window.location.origin,
        version: "1"
      });

      const signature = await signMessageAsync({ message });

      // 直接验证签名，无需额外登录流程
      const authResponse = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature })
      });

      if (authResponse.ok) {
        setSession({ address });
      }
    } catch (error) {
      console.error("验证流程出错:", error);
    }
  };

  const signOut = () => {
    setSession({});
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth必须在AuthProvider内使用");
  return context;
};

// 简化的钱包连接状态展示组件
export const WalletConnectStatus = () => {
  const { session } = useAuth();
  
  return (
    <div className="px-4 py-2 rounded-lg bg-gray-100">
      {session.address ? (
        <div className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="font-mono text-sm">
            {`${session.address.slice(0, 6)}...${session.address.slice(-4)}`}
          </span>
        </div>
      ) : (
        <span className="text-gray-500">未连接钱包</span>
      )}
    </div>
  );
};