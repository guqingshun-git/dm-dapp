import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
function WalletStatusListener() {
  const { 
    address, 
    isConnected, 
    // isConnecting, 
    isDisconnected,
    // isReconnecting,
    status  // 连接状态：'disconnected' | 'connecting' | 'connected' | 'reconnecting'
  } = useAccount();

  useEffect(() => {
    console.log(`钱包连接状态变化: ${status}`);
    
    if (isConnected) {
      console.log(`已连接钱包: ${address}`);
      console.log(`已连接钱包: ${address}`);
      // 执行连接成功后的操作，如获取用户信息
    }
    
    if (isDisconnected) {
      console.log('钱包已断开');
      // 执行断开连接后的清理操作
    }
  }, [status, address, isConnected, isDisconnected]);

  return null; // 纯监听组件，无需渲染UI
}

import { 
  HomeIcon, 
  UserGroupIcon, // 团队图标（替换MusicalNoteIcon）
  WalletIcon,    // 钱包图标（替换Squares2X2Icon）
  UserCircleIcon 
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavbarPaths = ["/","/team","/wallet","/profile"];
  
  // 简化后的选项卡配置
  const tabs = [
    { 
      path: "/", 
      label: "首页", 
      icon: <HomeIcon className="w-6 h-6" />,
      activeIcon: (
        <HomeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      )
    },
    { 
      path: "/team", 
      label: "团队", 
      icon: <UserGroupIcon className="w-6 h-6" />, // 修正为团队图标
      activeIcon: (
        <UserGroupIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      )
    },
    { 
      path: "/wallet", 
      label: "钱包",  // 建议统一为中文
      icon: <WalletIcon className="w-6 h-6" />, // 修正为钱包图标
      activeIcon: (
        <WalletIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      )
    },
    { 
      path: "/profile", 
      label: "我的", 
      icon: <UserCircleIcon className="w-6 h-6" />,
      activeIcon: (
        <UserCircleIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      )
    }
  ];

  const activeTab = location.pathname;

  return (
    <div className="relative flex flex-col h-screen bg-[#000040] dark:bg-gray-100">
       <WalletStatusListener /> {/* 添加监听器 */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      
      <main className="container mx-auto max-w-7xl flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-gray-900 dark:text-gray-100"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* 优化后的底部TabBar */}
      <footer className="sticky bottom-0 left-0 right-0 bg-[#000040] dark:bg-gray-800 border-t border-gray-800 dark:border-gray-700 z-10 shadow-lg">
        <div className="flex justify-between items-center px-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex-1 flex flex-col items-center justify-center py-4 transition-all ${
                  isActive 
                    ? "text-purple-600 dark:text-purple-400 font-bold" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <motion.div
                  className="relative mb-1"
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                >
                  {isActive ? (
                    <motion.div
                      className="p-2 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(139, 92, 246, 0.4)",
                          "0 0 8px 4px rgba(139, 92, 246, 0.6)",
                          "0 0 0 0 rgba(139, 92, 246, 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    >
                      {tab.activeIcon}
                    </motion.div>
                  ) : tab.icon}
                </motion.div>
                
                {/* <motion.span
                  className="text-xs"
                  animate={{
                    fontWeight: isActive ? 700 : 400
                  }}
                >
                  {tab.label}
                </motion.span> */}
              </Link>
            );
          })}
        </div>
      </footer>
    </div>
  );
}