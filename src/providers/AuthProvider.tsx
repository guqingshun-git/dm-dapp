import React, { ReactNode, createContext, useContext } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { createSiweMessage } from "viem/siwe";

// 1. 定义上下文类型
interface AuthContextType {
  session: { address?: string };
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 2. 修正组件签名
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [session, setSession] = React.useState<{ address?: string }>({});

  const signIn = async () => {
    console.log(address);
    if (!address) return;
    
    // 1. 从后端获取防重放nonce
    const nonceResponse = await fetch('/api/nonce');
    const { nonce } = await nonceResponse.json();
  
    // 2. 创建SIWE消息（补充nonce）
    const message = createSiweMessage({
      address,
      statement: "登录 HeroUI 应用",
      chainId: 1,
      domain: window.location.host,
      nonce, // 关键安全参数
      uri: window.location.origin,
      version: "1"
    });
    
    // 3. 获取用户签名
    const signature = await signMessageAsync({ message });
  
    // 4. 发送到后端验证
    const authResponse = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature })
    });
  
    // 5. 验证通过后设置会话
    if (authResponse.ok) {
      setSession({ address });
    } else {
      console.error("签名验证失败");
    }
  };

  const signOut = () => setSession({});

  // 3. 返回有效的JSX元素
  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. 创建使用Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider内使用");
  }
  return context;
};