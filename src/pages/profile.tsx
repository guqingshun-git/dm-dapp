import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from '@/providers/AuthProvider';
import { useUserInfo } from '@/hooks/useUserInfo';

import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { Image } from "@heroui/image";

import InviteModal from '@/components/modals/InviteModal';
import UsdtWithdrawModal from '@/components/modals/UsdtWithdrawModal';
import DmWithdrawModal from '@/components/modals/DmWithdrawModal';
import DmTransferModal from '@/components/modals/DmTransferModal';
import AccountTransferModal from "@/components/modals/AccountTransferModal";
import NodeValidatorModal from "@/components/modals/NodeValidatorModal";
import LiquidationModal from "@/components/modals/LiquidationModal";
import DmDepositModal from "@/components/modals/DmDepositModal";

import { Decimal } from 'decimal.js';

import {
  // ShoppingBag as ShoppingBagIcon,
  Headphones as HeadphonesIcon,
  // Key as KeyIcon,
  // ShoppingCart as OrderIcon,
  Ticket as TicketIcon,
  // Shield as ShieldIcon,
  LogOut as LogOutIcon,
  Wallet as WalletIcon,
  MapPinned as NodeIcon,
  Share as InviteIcon,
  Send as TransferIcon,
  ArrowRightLeft as SwapIcon,
  TruckIcon
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

export default function ProfilePage() {
  const { session, userInfo, setUserInfo, signOut } = useAuth();
  const { data: detaildInfo, refetch } = useUserInfo(session?.address);
  // const navigate = useNavigate();

  // 弹窗显示状态
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUsdtWithdrawModal, setShowUsdtWithdrawModal] = useState(false);
  const [showDmWithdrawModal, setShowDmWithdrawModal] = useState(false);
  const [showDmTransferModal, setShowDmTransferModal] = useState(false);
  const [showAccountTransferModal, setShowAccountTransferModal] = useState(false);
  const [showNodeValidatorModal, setShowNodeValidatorModal] = useState(false);
  const [showLiquidationModal, setShowLiquidationModal] = useState(false);
  const [showDmDepositModal, setShowDmDepositModal] = useState(false);

  // 全局提示状态
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 处理成功回
  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    refetch(); // 立即刷新用户信息
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // 2. 在组件内部定义 stats 状态
  const [stats, setStats] = useState([
    { title: "DM币", key: "DmWithdraw", value: "0", color: "primary" },
    { title: "USDT", key: "UsdtWithdraw", value: "0", color: "success" },
    { title: "DM币", key: "Recharge", value: "充值复利", color: "warning" },
    { title: "待释放收益", key: "$", value: "0", color: "secondary" },
  ]);
  const location = useLocation();
  // 同步最新数据到Context
  useEffect(() => {
    detaildInfo && setUserInfo(detaildInfo);
    if (detaildInfo) {
      setStats([
        {
          title: "DM币",
          key: "dmWithdraw",
          value: new Decimal(detaildInfo.dmAccount?.balance || 0).div(1e18).toFixed(2),
          color: "primary"
        },
        {
          title: "USDT",
          key: "usdtWithdraw",
          value: new Decimal(detaildInfo.usdtAccount?.balance || 0).div(1e18).toFixed(2),
          color: "success"
        },
        {
          title: "DM币",
          key: "Recharge",
          value: "充值复利",
          color: "warning"
        },
        {
          title: "待释放收益",
          key: "$",
          value: new Decimal(detaildInfo.rewardAccount?.pending || 0).div(1e18).toFixed(2),
          color: "secondary"
        }
      ]);
    }

  }, [detaildInfo]);
  // 添加 useEffect 执行数据获取
  useEffect(() => {
    console.log("路由变化检测自动登录检测", location.pathname);
    refetch(); // 每次路由变化时重新获取用户信息
  }, [location]);

  // 点击
  const itemAction = async (key: React.Key) => {
    key = key.toString()
    console.log(key)
    if (key === "dmWithdraw") {
      setShowDmWithdrawModal(true)
    }
    if (key === "usdtWithdraw") {
      setShowUsdtWithdrawModal(true);
    }
    if (key === "Recharge") {
      setShowDmDepositModal(true);
    }
    if (key === "transferDm") {
      setShowDmTransferModal(true);
    }
    if (key === "accountTransfer") {
      setShowAccountTransferModal(true);
    }
    if (key === "directInviter" && !userInfo?.directInviter) {
      setShowInviteModal(true)
    }

    if (key === "nodeValidator") {
      if (userInfo?.isNode) {
        addToast({
          title: '已是节点',
          description: '您已完成节点认证',
          color: 'success',
          timeout: 4000
        });
        return;
      }
      setShowNodeValidatorModal(true)
    }
    if (key === "transferDmrwa") {
      setShowLiquidationModal(true)
    }


    if (key === "logout") {
      signOut();
      return;
    }


    try {

      console.log('后端创建请求已发送');
    } catch (error) {
      addToast({
        title: ``,
        description: '请稍后重试或联系客服',
        color: 'warning'
      });
    }
  };
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-2 bg-[#000040]">
        {/* 全局成功提示 */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {successMessage}
          </div>
        )}
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
            {/* <Button isIconOnly aria-label="节点" color={userInfo?.isNode ? "success" : "default"} isDisabled={!userInfo?.isNode}>
              <NodeIcon className={userInfo?.isNode ? "text-white" : ""} />
            </Button> */}
            {userInfo?.isNode && (
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="node.jpeg"
                width={38}
                height={38}
              />
            )}
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <Slider
              className="max-w-md"
              value={(() => {
                const level = Number(userInfo?.level ?? 0);
                if (isNaN(level) || level < 1) return 0;
                if (level > 5) return 1;
                return level * 0.2;
              })()}
              formatOptions={{ style: "percent" }}
              label={`LV${userInfo?.level ?? 0}`}
              marks={[
                { value: 0, label: "" },
                { value: 0.2, label: "LV1" },
                { value: 0.4, label: "LV2" },
                { value: 0.6, label: "LV3" },
                { value: 0.8, label: "LV4" },
                { value: 1, label: "LV5" }
              ]}
              minValue={0}
              maxValue={1}
              showTooltip={true}
              step={0.2}
            />
            <span className="pt-2">
              <span aria-label="wallet" className="py-2" role="img">
                <WalletIcon />#{session?.address}
              </span>
            </span>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{new Decimal(userInfo?.dmAccount?.balance || 0).div(1e18).toFixed(2)}</p>
              <p className="text-default-400 text-small">DM Token</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                ${new Decimal(userInfo?.performance?.payment || 0).div(1e18).toFixed(2)} {/* 使用可选链访问 */}
              </p>
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
                <div className="flex justify-between items-center">
                  <p className="text-slate-300 text-sm w-full">{stat.title}</p>
                  {stat.key !== "$" && stat.key !== "Recharge" && ( // 条件渲染：仅当 stat.key 非空时显示按钮
                    <Button color="secondary" variant="shadow" size="sm" onClick={() => itemAction(stat.key)} >提现</Button>
                  )}
                  {stat.key === "Recharge" && ( // 条件渲染：仅当 stat.key 非空时显示按钮
                    <Button color="secondary" variant="shadow" size="sm" onClick={() => itemAction(stat.key)} >充值</Button>
                  )}
                  {stat.key === "$" && ( // 条件渲染：仅当 stat.key 非空时显示按钮
                    <Button color="warning" variant="shadow" size="sm" isIconOnly onClick={() => itemAction(stat.key)} >$</Button>
                  )}
                </div>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
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
            onAction={(key) => itemAction(key)}
          >
            {/* 更新按钮和状态提示 */}
            <ListboxItem
              key="directInviter"
              startContent={
                <IconWrapper className="bg-primary/10 text-primary">
                  <InviteIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={<span className="text-small text-default-400">{userInfo?.directInviter ? userInfo?.directInviter?.slice(0, 18) + "..." : "填写邀请人"}</span>}
            >
              邀请人
            </ListboxItem>
            <ListboxItem
              key="transferDm"
              startContent={
                <IconWrapper className="bg-primary/10 text-primary">
                  <TransferIcon className="text-lg" />
                </IconWrapper>
              }
            >
              DM转账
            </ListboxItem>
            <ListboxItem
              key="accountTransfer"
              startContent={
                <IconWrapper className="bg-primary/10 text-primary">
                  <SwapIcon className="text-lg" />
                </IconWrapper>
              }
            >
              DM划转
            </ListboxItem>
            {/* 我的订单 */}
            {/* <ListboxItem
              key="orders"
              startContent={
                <IconWrapper className="bg-primary/10 text-primary">
                  <ShoppingBagIcon className="text-lg" />
                </IconWrapper>
              }
            >
              我的订单
            </ListboxItem> */}

            {/* 修改密码 */}
            {/* <ListboxItem
              key="change_password"
              startContent={
                <IconWrapper className="bg-warning/10 text-warning">
                  <KeyIcon className="text-lg" />
                </IconWrapper>
              }
            >
              修改密码
            </ListboxItem> */}

            {/* 节点认证 */}
            <ListboxItem
              key="nodeValidator"
              startContent={
                <IconWrapper className="bg-secondary/10 text-secondary">
                  <NodeIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={userInfo?.isNode ? (
                <span className="text-small text-green-500 flex items-center items-end">已认证</span>
              ) : (
                <span className="text-small text-default-400 flex items-center items-end">去认证</span>
              )}
            >
              节点认证
            </ListboxItem>

            <ListboxItem
              key="transferDmrwa"
              startContent={
                <IconWrapper className="bg-pink-500/10 text-pink-500">
                  <TruckIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={<span className="text-small text-default-400">去平仓</span>}
            >
              平仓建单
            </ListboxItem>

            {/* 优惠券 */}
            <ListboxItem
              key="coupons"
              startContent={
                <IconWrapper className="bg-purple-500/10 text-purple-500">
                  <TicketIcon className="text-lg" />
                </IconWrapper>
              }
              endContent={<ItemCounter number={0} />}
            >
              优惠券
            </ListboxItem>

            {/* 账户安全 */}
            {/* <ListboxItem
              key="security"
              startContent={
                <IconWrapper className="bg-red-500/10 text-red-500">
                  <ShieldIcon className="text-lg" />
                </IconWrapper>
              }
            >
              账户安全
            </ListboxItem> */}
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


        {/* 弹窗组件 */}
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onSuccess={handleSuccess}
        />

        <UsdtWithdrawModal
          isOpen={showUsdtWithdrawModal}
          onClose={() => setShowUsdtWithdrawModal(false)}
          onSuccess={handleSuccess}
        />

        <DmWithdrawModal
          isOpen={showDmWithdrawModal}
          onClose={() => setShowDmWithdrawModal(false)}
          onSuccess={handleSuccess}
        />

        <DmTransferModal
          isOpen={showDmTransferModal}
          onClose={() => setShowDmTransferModal(false)}
          onSuccess={handleSuccess}
        />

        <AccountTransferModal
          isOpen={showAccountTransferModal}
          onClose={() => setShowAccountTransferModal(false)}
          onSuccess={handleSuccess}
        />

        <NodeValidatorModal
          isOpen={showNodeValidatorModal}
          onClose={() => setShowNodeValidatorModal(false)}
          onSuccess={handleSuccess}
        />

        <LiquidationModal
          isOpen={showLiquidationModal}
          onClose={() => setShowLiquidationModal(false)}
          onSuccess={handleSuccess}
        />

        <DmDepositModal
          isOpen={showDmDepositModal}
          onClose={() => setShowDmDepositModal(false)}
          onSuccess={handleSuccess}
        />
      </section>
    </DefaultLayout>
  );
}
