// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/providers/AuthProvider";
// import { useTokenBalance } from "@/contracts/calls/tokens";
import Decimal from 'decimal.js';
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import AccountTransferModal from "@/components/modals/AccountTransferModal";
import DmWithdrawModal from '@/components/modals/DmWithdrawModal';
import LiquidationModal from "@/components/modals/LiquidationModal";
import { Button } from "@heroui/button";
import { useLocation } from "react-router-dom";
import { addToast } from "@heroui/toast";

let cardList = [
  {
    title: "SUCCESS",
    name: "平仓收益",
    img: "/images/fruit-1.jpeg",
    value: "0",
  },
  {
    title: "PENDING",
    name: "平仓待释放",
    img: "/images/fruit-2.jpeg",
    value: 0,
  },
  // {
  //   title: "DMToken",
  //   name: "DM收益",
  //   img: "/images/fruit-2.jpeg",
  //   value: 0,
  // },
  // {
  //   title: "AccountTransfer",
  //   name: "DM划转",
  //   img: "/images/fruit-2.jpeg",
  //   value: 0,
  // }
];

export default function WalletPage() {
  const { session, userInfo, setUserInfo } = useAuth();
  const { data: detaildInfo, refetch } = useUserInfo(session?.address);
  // const dmRaw = useTokenBalance(session?.address as `0x${string}`);
  // const dmBalance = new Decimal((dmRaw ?? 0).toString()).div(1e18).toFixed(2);
  const location = useLocation();
  // 添加 useEffect 执行数据获取
  useEffect(() => {
    console.log("路由变化检测自动登录检测", location.pathname);
    refetch(); // 每次路由变化时重新获取用户信息
  }, [location]);
  // 2. 在组件内部定义 stats 状态
  const [stats, setStats] = useState([
    { title: "DM平仓收益", key: "releaseDM", value: "0", color: "primary" },
    { title: "DM平仓划转", key: "accountTransfer", value: "0", color: "success" },
    { title: "DM平仓建单", key: "transferDmrwa", value: "0", color: "success" }
  ]);
  // 同步最新数据到Context
  useEffect(() => {
    detaildInfo && setUserInfo(detaildInfo);
    if (detaildInfo) {
      setStats([
        {
          title: "DM平仓收益",
          key: "dm",
          value: new Decimal(detaildInfo.promotedAccount?.releaseDM || 0).div(1e18).toFixed(2),
          color: "primary"
        },
        {
          title: "DM平仓划转",
          key: "accountTransfer",
          value: new Decimal(detaildInfo.dmAccount?.balance || 0).div(1e18).toFixed(2),
          color: "success"
        },
        {
          title: "DM平仓建单",
          key: "transferDmrwa",
          value: new Decimal(detaildInfo.promotedAccount?.total || 0).div(1e18).toFixed(2),
          color: "success"
        }
      ]);
    }

  }, [detaildInfo]);


  // 弹窗状态
  const [showAccountTransferModal, setShowAccountTransferModal] = useState(false);
   const [showDmWithdrawModal, setShowDmWithdrawModal] = useState(false);
  const [showLiquidationModal, setShowLiquidationModal] = useState(false);
  // 处理成功回调
  const handleSuccess = (message: string) => {
    console.log(message);
    // 可以添加其他成功处理逻辑
  };

  // 点击卡片处理函数
  const handleCardClick = (item: any) => {
    if (item.title === "Transfer") {
      setShowAccountTransferModal(true);
    }
  };

  useEffect(() => {
    cardList = [
      {
        title: "SUCCESS",
        name: "平仓收益",
        img: "/images/fruit-1.jpeg",
        value: new Decimal(userInfo?.promotedAccount?.success || 0).div(1e18).toFixed(2),
      },
      {
        title: "PENDING",
        name: "平仓待释放",
        img: "/images/fruit-2.jpeg",
        value: new Decimal(userInfo?.promotedAccount?.pending || 0).div(1e18).toFixed(2)
      },
      // {
      //   title: "releaseDM",
      //   name: "DM收益",
      //   img: "/images/fruit-2.jpeg",
      //   value: new Decimal(userInfo?.promotedAccount?.releaseDM || 0).div(1e18).toFixed(2)
      // },
      // {
      //   title: "Transfer",
      //   name: "DM划转",
      //   img: "/images/fruit-2.jpeg",
      //   value: new Decimal(userInfo?.compAccount?.balance || 0).div(1e18).toFixed(2)
      // }
    ];

  }, [session.address, detaildInfo, userInfo]);
  // 点击
  const itemAction = async (key: React.Key) => {
    key = key.toString()
    console.log(key)
    if (key === "dmWithdraw") {
      setShowDmWithdrawModal(true);
    }
    if (key === "accountTransfer") {
      setShowAccountTransferModal(true);
    }
    if (key === "transferDmrwa") {
      setShowLiquidationModal(true);
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
      <section className="flex flex-col items-center min-h-screen"
        style={{
          backgroundImage: "url('/bg.jpeg')", // 确保图片在public目录
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* <div className="px-6 pt-12 flex flex-col items-start w-full">
          <h4 className="font-bold text-large text-default-500">可用红包：</h4>
          <span className={title({ color: "violet" })}>${new Decimal(userInfo?.redAccount?.balance || 0).div(1e18).toFixed(2)}&nbsp;</span>
        </div> */}

        <div className="gap-4 grid grid-cols-2 px-4 pt-6">
          {cardList.map((item, index) => (
            <Card
              className="py-4 text-white w-full"
              key={index}
              isPressable
              shadow="sm"
              onPress={() => handleCardClick(item)}
              style={{
                background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
                fontFamily: 'system-ui, sans-serif',
                boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
              }}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start w-full">
                <p className="text-tiny uppercase font-bold">{item.title}</p>
                <small className="text-default-500">{item.name}</small>
                <h4 className="font-bold text-large">{item.value}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/hero-card-complete.jpeg"
                  width={170}
                />
              </CardBody>
            </Card>


          ))}
        </div>


        {/* 统计数据卡片 - 应用深色半透明背景 */}
        <div className="w-full grid grid-cols-1 gap-4 p-4">
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
                  {stat.key !== "dm" && stat.key !== "transferDmrwa" && ( // 条件渲染：仅当 stat.key 非空时显示按钮
                    <Button color="secondary" variant="shadow" size="sm" onClick={() => itemAction(stat.key)} >划转</Button>
                  )}
                  {stat.key === "transferDmrwa" && ( // 条件渲染：仅当 stat.key 非空时显示按钮
                    <Button color="secondary" variant="shadow" size="sm" onClick={() => itemAction(stat.key)} >建单</Button>
                  )}
                  {stat.key === "dm" && ( // 条件渲染：仅当 stat.key 非空时显示按钮
                    <Button color="warning" variant="shadow" size="sm" isIconOnly onClick={() => itemAction(stat.key)} >DM</Button>
                  )}
                </div>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>




        {/* <div className=""></div>
        <div className="px-6 pt-24 flex flex-col items-start w-full">
            <span className={title({ color: "violet" })}>商城建设中....</span>
          </div> */}

        {/* 弹窗组件 */}
        <AccountTransferModal
          isOpen={showAccountTransferModal}
          onClose={() => setShowAccountTransferModal(false)}
          onSuccess={handleSuccess}
        />

        <DmWithdrawModal
          isOpen={showDmWithdrawModal}
          onClose={() => setShowDmWithdrawModal(false)}
          onSuccess={handleSuccess}
        />

        <LiquidationModal
          isOpen={showLiquidationModal}
          onClose={() => setShowLiquidationModal(false)}
          onSuccess={handleSuccess}
        />

      </section>
    </DefaultLayout>
  );
}
