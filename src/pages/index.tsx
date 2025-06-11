import apiClient from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useAccount } from 'wagmi';
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
// import { useBankOperations } from '@/hooks/useBankOperations';
import { useContractCall } from "@/hooks/useContractCall";
import { DM_CONTRACT } from '@/contracts/dmContract'; // 导入具体配置对象
// import { ConnectButton } from '@rainbow-me/rainbowkit';


export const orders = [
  {
    id: 1,
    status: "active",
    logo: "",
    orderAmount: 200,    // USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日%线性释放
    compoundDailyRate: "1.2%",   // 日复利%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 2,
    status: "active",
    logo: "",
    orderAmount: 500,    // USDT
    rewardMultiplier: 1.6,
    dailyReleaseRate: "1.2%",     // 每日%线性释放
    compoundDailyRate: "1.4%",   // 日复利%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 3,
    status: "active",
    logo: "",
    orderAmount: 1000,    // USDT
    rewardMultiplier: 1.8,
    dailyReleaseRate: "1.4%",     // 每日%线性释放
    compoundDailyRate: "1.6%",   // 日复利%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 4,
    status: "active",
    logo: "",
    orderAmount: 2000,    // USDT
    rewardMultiplier: 2,
    dailyReleaseRate: "1.6%",     // 每日%线性释放
    compoundDailyRate: "1.8%",   // 日复利%
    compoundCondition: "1000000"   // 无条件
  },
  {
    id: 5,
    status: "active",
    logo: "",
    orderAmount: 5000,    // USDT
    rewardMultiplier: 2.2,
    dailyReleaseRate: "1.8%",     // 每日%线性释放
    compoundDailyRate: "2%",   // 日复利%
    compoundCondition: "2000000"   // 无条件
  },
  {
    id: 6,
    status: "active",
    logo: "",
    orderAmount: 10000,    // USDT
    rewardMultiplier: 2.4,
    dailyReleaseRate: "2%",     // 每日%线性释放
    compoundDailyRate: "2.5%",   // 日复利%
    compoundCondition: "5000000"   // 无条件
  },
  {
    id: 7,
    status: "active",
    logo: "",
    orderAmount: 20000,    // USDT
    rewardMultiplier: 2.6,
    dailyReleaseRate: "2.5%",     // 每日%线性释放
    compoundDailyRate: "3%",   // 日复利%
    compoundCondition: "7000000"   // 无条件
  },
  {
    id: 8,
    status: "active",
    logo: "",
    orderAmount: 50000,    // USDT
    rewardMultiplier: 3,
    dailyReleaseRate: "3%",     // 每日%线性释放
    compoundDailyRate: "4%",   // 日复利%
    compoundCondition: "10000000"   // 无条件
  }
];
// 状态到颜色的映射
// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

export default function IndexPage() {
  const { session, signIn } = useAuth();
  const { isConnected } = useAccount();
  const [pendingOrder, setPendingOrder] = useState<number | null>(null);
  // const [balance, setBalance] = useState<string | null>(null);
  // const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const { address } = useAccount();
  // 在组件中使用
  const { query } = useContractCall(DM_CONTRACT); // 传入具体配置对象



// 添加 useEffect 执行数据获取
useEffect(() => {
  const fetchData = async () => {
    try {
      const balance = await query('balanceOf', [address]);
      // setBalance(balance.toString()); // 转换为字符串
      console.log('用户余额:'+address, balance);
      
      const totalSupply = await query('totalSupply', []);
      // setTotalSupply(totalSupply.toString());
      console.log('总供应量:', totalSupply);
    } catch (err) {
      console.error('查询失败:', err);
    }
  };

  if (address) {
    fetchData();
  }
}, [address, query]); // 依赖项：当 address 或 query 变化时重新执行

  // 安全购买处理函数
  const handleSecureBuy = async (orderId: number) => {
    console.log(orderId)
    // 场景1: 已认证用户直接购买
    if (session.address) {
      executeOrder(orderId);
      return;
    }

    // 场景2: 未认证但已连接钱包
    if (isConnected) {
      setPendingOrder(orderId);
      await signIn(); // 触发SIWE认证
      return;
    }

    // 场景3: 完全未连接状态
    alert('请先连接钱包并完成身份认证');
  };

  // 认证成功后执行待处理订单
  useEffect(() => {
    if (session.address && pendingOrder) {
      executeOrder(pendingOrder);
      setPendingOrder(null);
    }
  }, [session.address, pendingOrder]);

  // 实际购买逻辑
  const executeOrder = async (orderAmount: number) => {
    // 这里添加与智能合约的交互逻辑
    // const [amount, setAmount] = useState("10"); // 用户下单10 USDT
    // const { transferUSDTToContract, isLoading, error } = useBankOperations();
     
  



    console.log(`执行安全购买订单: ${orderAmount}`);
    const addRes = await apiClient.post('/order/add', {
      orderAmount: orderAmount
    });

    console.log(`结果: ${addRes}`);
    // 示例: 调用智能合约的购买函数
    // contract.methods.purchase(orderId).send({ from: session.address })
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
        {/* <ConnectButton/> */}
        <Card className="rounded-t-none rounded-b-[24px] w-full"
          style={{
            background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start text-white pt-4">
            <p className="text-tiny uppercase font-bold">DM Token</p>
            <small className="text-default-500">500,0000,0000​​ DM</small>
            <Link
              isExternal
              showAnchorIcon
              href="https://bscscan.com/tokentxns?a=0x61207338F4602a315e1105189F1082903Cda475d&p=1"
              className="text-purple-200 hover:text-purple-100 transition-colors"
            ><h4 className="font-bold text-large">BSCScan Address</h4>
            </Link>

          </CardHeader>
          <CardBody className="overflow-visible py-2 pb-4">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={400}
              height={100}
            />
          </CardBody>
        </Card>


        

        <div className="grid grid-cols-1 gap-4 w-full p-4">
          {orders.map((order) => (
            <Card className="py-4 bg-transparent border border-purple-500" key={order.id}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <span className={title({ color: "violet" })}>{order.orderAmount}&nbsp;USDT</span>
                {/* <h4 className="font-bold text-large">{order.orderAmount} USDT</h4> */}
              </CardHeader>
              <CardBody className="overflow-visible py-2 mt-4">
                <Button color="secondary" className="font-bold" size="md" variant="shadow" onClick={() => handleSecureBuy(order.orderAmount)}>购买
                </Button>
                {/* {error && <p>错误: {error.message}</p>} */}
              </CardBody>
            </Card>

          ))}
        </div>

      </section>
    </DefaultLayout>
  );
}
