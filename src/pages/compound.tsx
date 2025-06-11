import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DM_CONTRACT } from "@/contracts/dmContract";
import { useContractCall } from "@/hooks/useContractCall";
import { useAccount } from "wagmi";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TooltipItem,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  ChevronDown,
  Activity
} from "lucide-react";
import apiClient from "@/api";
import { useAuth } from "@/providers/AuthProvider";



const cardList = [
  {
    title: "DM-TOKEN",
    name: "余额",
    img: "/images/fruit-1.jpeg",
    price: "$5.50",
  },
  {
    title: "DM-TOKEN",
    name: "质押",
    img: "/images/fruit-2.jpeg",
    price: "$3.0000000",
  }
];
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





// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
export default function CompoundPage() {
  // 图表数据
  const data = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: '收益',
        data: [4100, 3800, 4200, 3900, 4600],
        borderColor: 'rgba(139, 92, 246, 1)', // 紫色
        backgroundColor: (context: { chart: { ctx: any; }; }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)');
          return gradient;
        },
        pointBackgroundColor: 'rgba(236, 72, 153, 1)', // 粉色
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // 图表配置
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const, // 关键修复点
        intersect: false,
        callbacks: {
          label: function (this: any, tooltipItem: TooltipItem<'line'>) {
            // 使用标准 TooltipItem 类型
            return `$ ${tooltipItem.parsed.y}`;
          }
        },
        displayColors: false,
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        padding: 10,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 16,
          weight: 700
        },
        cornerRadius: 4
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11
          }
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        },
        min: 3000,
        max: 5000
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6
      }
    }
  };

  const { session, signIn } = useAuth();
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const [pendingOrder, setPendingOrder] = useState<number | null>(null);
  // const [balance, setBalance] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const location = useLocation();
  // 在组件中使用
  const { query } = useContractCall(DM_CONTRACT); // 传入具体配置对象

  // 添加 useEffect 执行数据获取
  useEffect(() => {
    console.log("路由变化检测自动登录检测", location.pathname);
    const fetchData = async () => {
      try {
        const balance = await query('balanceOf', [address]);
        // setBalance(balance.toString()); // 转换为字符串
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
      } catch (error) {
        setUserInfo({});
        // 3. 添加错误处理
        console.error("获取用户信息失败:", error);
      }
    };

    fetchData();
    getUserInfo();
  }, [location, address]); // 4. 添加address依赖




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
        <div className="px-6 pt-4 flex flex-col items-start w-full">
          <h4 className="font-bold text-large text-default-500">余额：</h4>
          <span className={title({ color: "violet" })}>{userInfo.performance?.payment ?? 0}&nbsp;</span>
        </div>


        <div className="w-full p-4">
          <Card className="w-full border-none bg-gradient-to-br bg-[#000040]">
            <CardHeader className="flex justify-between items-center py-3 px-4">
              <div className="flex items-center gap-2">
                <Activity className="text-purple-400 w-5 h-5" />
                <h4 className="text-sm font-bold text-purple-100">收益趋势</h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-purple-200">Oct - Feb</span>
                <Button isIconOnly size="sm" variant="light" className="bg-purple-800/50 text-purple-200">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardBody className="p-4 pt-0">
              <div className="mb-2">
                <span className="text-2xl font-bold text-purple-50">$4,600</span>
                <span className="ml-2 text-xs text-green-400 bg-green-800/30 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>

              <div className="h-48 mt-2">
                <Line data={data} options={options} />
              </div>

              <div className="flex justify-between pt-3 border-t border-purple-700/50">
                {data.labels.map((label, index) => (
                  <span
                    key={index}
                    className="text-xs text-purple-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="gap-4 grid grid-cols-2 px-4">
          {cardList.map((item, index) => (
            <Card className="py-4 text-white w-full" key={index} isPressable shadow="sm"
              style={{
                background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
                fontFamily: 'system-ui, sans-serif',
                boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
              }}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start w-full">
                <p className="text-tiny uppercase font-bold">{item.title}</p>
                <small className="text-default-500">{item.name}</small>
                <h4 className="font-bold text-large">10000000</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={170}
                />
              </CardBody>
            </Card>


          ))}
        </div>


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
