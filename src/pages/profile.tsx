import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "@/api";
import { useAccount } from 'wagmi'
import { useContractCall } from "@/hooks/useContractCall";;
import { DM_CONTRACT } from "@/contracts/dmContract";

// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
// import { Link } from "@heroui/link";
// import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Switch } from "@heroui/switch";
import { Slider } from "@heroui/slider";
import {
  ShoppingBag as ShoppingBagIcon,
  Headphones as HeadphonesIcon,
  Key as KeyIcon,
  Network as NodeIcon,
  ShoppingCart as OrderIcon,
  ChevronRight as RightIcon,
  Ticket as TicketIcon,
  Shield as ShieldIcon,
  LogOut as LogOutIcon,
  Wallet as WalletIcon
} from "lucide-react";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}
interface ItemCounterProps {
  number: number;
}
// 自定义图标包裹组件
const IconWrapper = ({ children, className = "" }: IconWrapperProps) => (
  <div className={`rounded-full p-3 ${className}`}>
    {children}
  </div>
);
// 计数器组件
const ItemCounter = ({ number }: ItemCounterProps) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
  </div>
);

// 添加用户信息接口
interface UserInfo {
  id?: string;
  walletAddress?: string;
  performance?: {
    payment?: number;
  };
  usdtAccount?: {
    balance?: number;
    pending?: number;
  };
  dmAccount?: {
    balance?: number;
    pending?: number;
  };
  compAccount?: {
    balance?: number;
    pending?: number;
  };
  reward?: {
    total?: number;
  };
  // 可添加其他属性如：
  // name?: string;
  // email?: string;
}
export default function ProfilePage() {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  // 2. 在组件内部定义 stats 状态
  const [stats, setStats] = useState([
    { title: "DM币", value: "0", change: "+0", color: "primary" },
    { title: "USDT", value: "0", change: "+0", color: "success" },
    { title: "DM复利", value: "0", change: "+0", color: "warning" },
    { title: "总收益", value: "0", change: "+0", color: "secondary" },
  ]);
  const location = useLocation();
  // 在组件中使用
  const { query } = useContractCall(DM_CONTRACT); // 传入具体配置对象
  
  // 添加 useEffect 执行数据获取
  useEffect(() => {
    console.log("路由变化检测自动登录检测", location.pathname);
    const fetchData = async () => {
      try {
        const balance = await query('balanceOf', [address]);
        setBalance(balance.toString()); // 转换为字符串
        console.log('用户余额:' + address, balance);
      } catch (err) {
        console.error('查询失败:', err);
      }
    };
    const getUserInfo = async () => {
      // 1. 添加地址存在性检查
      if (!address) {
        console.warn("钱包地址未定义");
        return;
      }

      try {
        // 2. 正确使用params传递参数
        const userInfoResponse = await apiClient.get<UserInfo>(`user/${address}`);
        console.log(userInfoResponse);
        setUserInfo(userInfoResponse.data);
        setStats([
          { 
            title: "DM币", 
            value: userInfo.dmAccount?.balance?.toString() || "0", 
            change: `+0`, 
            color: "primary" 
          },
          { 
            title: "USDT", 
            value: userInfo.usdtAccount?.balance?.toString() || "0", 
            change: `+0`, 
            color: "success" 
          },
          { 
            title: "DM复利", 
            value: userInfo.compAccount?.balance?.toString() || "0", 
            change: `+0`, 
            color: "warning" 
          },
          { 
            title: "总收益", 
            value: userInfo.reward?.total?.toString() || "0", 
            change: `+0`, 
            color: "secondary" 
          }
        ]);
      } catch (error) {
        setUserInfo({});
        // 3. 添加错误处理
        console.error("获取用户信息失败:", error);
      }
    };
    
    fetchData();
    getUserInfo();


    
  }, [location, address]); // 4. 添加address依赖

  

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-2 bg-[#000040]">
        <Card className="rounded-t-none rounded-b-[24px] w-full"
          style={{
            background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
          }}
        >
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/logo.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">DM Token</h4>
                <h5 className="text-small tracking-tight text-default-400">@BSCScan Address</h5>
              </div>
            </div>
            <Switch defaultSelected color="success">
            </Switch>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <Slider
              className="max-w-md"
              defaultValue={0}
              formatOptions={{ style: "percent" }}
              label="LV0"
              marks={[
                {
                  value: 0,
                  label: "",
                },
                {
                  value: 0.2,
                  label: "LV1",
                },
                {
                  value: 0.4,
                  label: "LV2",
                },
                {
                  value: 0.6,
                  label: "LV3",
                },
                {
                  value: 0.8,
                  label: "LV4",
                },
                {
                  value: 1,
                  label: "LV5",
                }
              ]}
              maxValue={1}
              minValue={0}
              showTooltip={true}
              step={0.2}
            />
            <span className="pt-2">
              <span aria-label="wallet" className="py-2" role="img">
                <WalletIcon />#{address}
              </span>
            </span>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{balance}</p>
              <p className=" text-default-400 text-small">DM Token</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{userInfo.performance?.payment ?? 0}</p>
              <p className="text-default-400 text-small">Performance</p>
            </div>
          </CardFooter>
        </Card>

        {/* 统计数据卡片 - 应用深色半透明背景 */}
        <div className="w-full grid grid-cols-2 gap-4 p-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
              style={{
                backgroundImage: "url('/bg.jpeg')", // 确保图片在public目录
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat"
              }}
            >
              <CardBody className="p-4">
                <p className="text-slate-300 text-sm">{stat.title}</p>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <Chip
                    size="sm"
                    className="ml-2 bg-slate-700 text-slate-200"
                  >
                    {stat.change}
                  </Chip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="w-full px-4">
          <Listbox
            aria-label="User Menu"
            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium bg-[#000040] text-white"
            itemClasses={{
              base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-14 data-[hover=true]:bg-default-100/80",
            }}
            onAction={(key) => alert(key)}
          >
            {/* 我的订单 */}
            <ListboxItem
              key="orders"
              startContent={
                <IconWrapper className="bg-primary/10 text-primary">
                  <ShoppingBagIcon className="text-lg" />
                </IconWrapper>
              }
            >
              我的订单
            </ListboxItem>

            {/* 客服中心 */}
            <ListboxItem
              key="customer_service"
              startContent={
                <IconWrapper className="bg-success/10 text-success">
                  <HeadphonesIcon className="text-lg" />
                </IconWrapper>
              }
            >
              客服中心
            </ListboxItem>

            {/* 修改密码 */}
            <ListboxItem
              key="change_password"
              startContent={
                <IconWrapper className="bg-warning/10 text-warning">
                  <KeyIcon className="text-lg" />
                </IconWrapper>
              }
            >
              修改密码
            </ListboxItem>

            {/* 节点认证 */}
            <ListboxItem
              key="node"
              startContent={
                <IconWrapper className="bg-secondary/10 text-secondary">
                  <NodeIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={<span className="text-small text-default-400 flex items-center items-end">去认证<RightIcon className="" /></span>}
            >
              节点认证
            </ListboxItem>

            {/* 平移建单 */}
            <ListboxItem
              key="DMRWA"
              startContent={
                <IconWrapper className="bg-pink-500/10 text-pink-500">
                  <OrderIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={<span className="text-small text-default-400">去平移</span>}
            >
              平移建单
            </ListboxItem>

            {/* 优惠券 */}
            <ListboxItem
              key="coupons"
              startContent={
                <IconWrapper className="bg-purple-500/10 text-purple-500">
                  <TicketIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={<ItemCounter number={82} />}
            >
              优惠券
            </ListboxItem>

            {/* 账户安全 */}
            <ListboxItem
              key="security"
              startContent={
                <IconWrapper className="bg-red-500/10 text-red-500">
                  <ShieldIcon className="text-lg" />
                </IconWrapper>
              }
            >
              账户安全
            </ListboxItem>

            {/* 退出登录 */}
            <ListboxItem
              key="logout"
              startContent={
                <IconWrapper className="bg-gray-500/10 text-gray-500">
                  <LogOutIcon className="text-lg" />
                </IconWrapper>
              }
            >
              退出登录
            </ListboxItem>
          </Listbox>
        </div>
        <div className="text-center text-sm text-slate-400">
          <p>© 2025 用户中心 | 当前版本 v1.2.4</p>
        </div>
      </section>
    </DefaultLayout>
  );
}
