import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
// import { 
//   HomeIcon, 
//   UserGroupIcon, // 团队图标（替换MusicalNoteIcon）
//   WalletIcon,    // 钱包图标（替换Squares2X2Icon）
//   UserCircleIcon,
//   ChartBarIcon
// } from "@heroicons/react/24/solid";
import {
  House,
  CircleUserRound,
  Crown,
  ChartPie,
  Orbit
} from "lucide-react";




import { motion, AnimatePresence } from "framer-motion";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate(); // 添加导航钩子
  // const hideNavbarPaths = ["/","/team","/wallet","/profile"];
  const hideNavbarPaths = [""];
  // 处理标签点击
  const handleTabClick = (path: string) => {
    navigate(path);
  };
  // 简化后的选项卡配置
  const tabs = [
    { 
      path: "/", 
      label: "首页", 
      icon: <House className="w-8 h-8 font-bold" />,
      activeIcon: (
        <House className="w-8 h-8 text-purple-600 dark:text-purple-400 font-bold" />
      )
    },
    { 
      path: "/compound", 
      label: "复利", 
      icon: <Orbit className="w-8 h-8" />,
      activeIcon: (
        <Orbit className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      )
    },
    { 
      path: "/team", 
      label: "团队", 
      icon: <Crown className="w-8 h-8" />, // 修正为团队图标
      activeIcon: (
        <Crown className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      )
    },
    { 
      path: "/wallet", 
      label: "平仓",  // 建议统一为中文
      icon: <ChartPie className="w-8 h-8" />, // 修正为钱包图标
      activeIcon: (
        <ChartPie className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      )
    },
    { 
      path: "/profile", 
      label: "我的", 
      icon: <CircleUserRound className="w-8 h-8" />,
      activeIcon: (
        <CircleUserRound className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      )
    }
  ];

  const activeTab = location.pathname;

  return (
    <div className="relative flex flex-col h-screen bg-[#000040] dark:bg-gray-100"
    style={{
      backgroundImage: "url('/bg.jpeg')", // 确保图片在public目录
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat"
    }}
    >
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
              <div
                onClick={() => handleTabClick(tab.path)}
                key={tab.path}
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
              </div>
            );
          })}
        </div>
      </footer>
    </div>
  );
}