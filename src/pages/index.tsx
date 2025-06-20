import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useAuth } from '@/providers/AuthProvider';
import { useUserInfo } from '@/hooks/useUserInfo';
import apiClient from "@/api";
import { useWriteContract, useReadContract } from 'wagmi';
import { type Address } from 'viem';
import { DM_CONTRACT } from '@/contracts/dmContract';
import { USDT_CONTRACT } from '@/contracts/usdtContract';
import { fetchOrderSignature } from "@/contracts/api/signature";


import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";

export const orders = [
  {
    id: 1,
    status: "active",
    logo: "",
    orderAmount: 2,    // USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日%线性释放
    compoundDailyRate: "1.2%",   // 日复利%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 2,
    status: "active",
    logo: "",
    orderAmount: 5,    // USDT
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

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<number | null>(null);
  const [currentTxHash, setCurrentTxHash] = useState<string | null>(null);
  const [orderStatusPolling, setOrderStatusPolling] = useState(false);
  const { session, signIn, userInfo, setUserInfo } = useAuth();
  const { data: detaildInfo } = useUserInfo(session?.address);
  
  useEffect(() => {
    detaildInfo && setUserInfo(detaildInfo);
    console.log(userInfo)
  }, [detaildInfo]);
  useEffect(() => {
    return () => setCurrentTxHash(null);
  }, []);
  useEffect(() => {
    // console.log('提交订单测试')
    // const usdtAmount = BigInt(2 * 1e18);
    // createBackendOrder("0x0d3e561792c66ac2dc1e8727b0a58792c56c83747b33100512d42d134bcea280", usdtAmount);
  }, [session.address]);

  // 读取当前授权额度
  const { data: currentAllowance } = useReadContract({
    address: USDT_CONTRACT.address,
    abi: USDT_CONTRACT.abi,
    functionName: 'allowance',
    args: [session?.address as Address, DM_CONTRACT.address],
  }) as { data: bigint | undefined };

  // 合约写入方法
  const { writeContractAsync } = useWriteContract();
  // 轮询检查订单状态
  useEffect(() => {
    if (!currentTxHash) return;

    setOrderStatusPolling(true);
    let interval: ReturnType<typeof setInterval> | null = null; // 修正类型定义
    let attempts = 0;
    const MAX_ATTEMPTS = 10;
    const INTERVAL_TIME = 3000; // 3秒

    const checkOrderStatus = async () => {
      attempts++;
      try {
        if (!currentTxHash) return;

        const response = await apiClient.get(`order/status/${currentTxHash}`);
        const orderStatus = response.data.status;

        console.log(`检查订单状态 (${attempts}/${MAX_ATTEMPTS}):`, orderStatus);

        if (orderStatus === 'completed') {
          if (interval) clearInterval(interval); // 修正清理逻辑
          setOrderStatusPolling(false);

          addToast({
            title: '订单创建成功！',
            description: '订单已成功记录到我们的系统',
            color: 'success',
            timeout: 5000
          });

          // 重置状态
          setIsLoading(false);
          setPendingOrder(null);
          setCurrentTxHash(null);
        } else if (orderStatus === 'failed') {
          if (interval) clearInterval(interval); // 修正清理逻辑
          setOrderStatusPolling(false);

          addToast({
            title: '订单创建失败',
            description: '请查看订单详情或联系客服',
            color: 'warning',
            timeout: 5000
          });

          // 重置状态
          setIsLoading(false);
          setPendingOrder(null);
          setCurrentTxHash(null);
        } else if (attempts >= MAX_ATTEMPTS) {
          if (interval) clearInterval(interval); // 修正清理逻辑
          setOrderStatusPolling(false);

          addToast({
            title: '订单状态检查超时',
            description: '请手动检查订单状态',
            color: 'warning',
            timeout: 5000
          });
        }
      } catch (error) {
        console.error('检查订单状态失败:', error);
        if (attempts >= MAX_ATTEMPTS) {
          if (interval) clearInterval(interval); // 修正清理逻辑
          setOrderStatusPolling(false);

          addToast({
            title: '订单状态检查失败',
            description: '请稍后重试或联系客服',
            color: 'warning',
            timeout: 5000
          });
        }
      }
    };

    // 立即检查一次，然后设置轮询
    checkOrderStatus();
    interval = setInterval(checkOrderStatus, INTERVAL_TIME);

    // 清理
    return () => {
      if (interval) clearInterval(interval); // 修正清理逻辑
      setOrderStatusPolling(false);
    };
  }, [currentTxHash]);

  // 创建后端订单的函数（现在直接调用，不依赖事件监听）
  const createBackendOrder = async (txHash: string, amount: bigint) => {
    try {
      await apiClient.post('order', {
        txHash,
        amount: amount.toString(),
        userAddress: session?.address
      });
      console.log('后端订单创建请求已发送');
    } catch (error) {
      console.error('后端订单创建请求失败:', error);
      addToast({
        title: '订单同步请求失败',
        description: '请稍后重试或联系客服',
        color: 'warning',
        timeout: 5000
      });
    }
  };

  

  // 安全购买处理函数
  const handleSecureBuy = async (orderId: number) => {
    setPendingOrder(orderId);
    // 场景1: 已连接但未认证
    if (!session.address) {
      await signIn();
      return;
    }
    if (userInfo?.directInviter === null) {
      addToast({
      title: '请先绑定邀请人',
      description: '请到个人中心页面操作',
      color: 'default',
      timeout: 5000
    });
      return;
    }
    // 场景3: 已认证，执行订单
    addToast({
      title: '订单处理中',
      description: '请保持钱包连接，不要离开页面',
      color: 'default',
      timeout: 5000
    });
    executeOrder(orderId);
  };
  // 授权函数
  const approveUSDT = async (amount: bigint) => {
    setIsApproving(true);
    console.log(isApproving)
    try {
      await writeContractAsync({
        address: USDT_CONTRACT.address,
        abi: USDT_CONTRACT.abi,
        functionName: 'approve',
        args: [DM_CONTRACT.address, amount]
      });
      return true;
    } catch (error) {
      setIsApproving(false);
      console.error('授权失败:', error);
      return false;
    } finally {
      setIsApproving(false);
    }
  };
  // 认证成功后执行待处理订单
  useEffect(() => {
    if (session.address && pendingOrder !== null) {
      // executeOrder(pendingOrder);
    }
  }, [session.address, pendingOrder]);

  // 实际购买逻辑：调用智能合约创建订单
  const executeOrder = async (orderId: number) => {
    setIsLoading(true);
    try {
      // 获取订单金额
      const order = orders.find(o => o.id === orderId);
      if (!order) throw new Error('无效的订单ID');

      // 转换为BigInt（18位小数）
      const usdtAmount = BigInt(order.orderAmount * 1e18);

      // 步骤1: 检查并授权（如果需要）
      const requiredAllowance = usdtAmount;

      // 检查当前授权是否足够
      if (!currentAllowance || currentAllowance < requiredAllowance) {
        addToast({
          title: '授权处理中',
          description: '请确认钱包中的授权交易',
          color: 'default',
          timeout: 3000
        });

        const success = await approveUSDT(requiredAllowance);
        if (!success) {
          addToast({
            title: '授权失败',
            description: '请重试或联系客服',
            color: 'warning',
            timeout: 5000
          });
          setIsLoading(false);
          return;
        }
      }

      addToast({
        title: '订单处理中',
        description: '正在准备交易，请稍候...',
        color: 'default',
        timeout: 3000
      });

      // 步骤2: 获取签名
      setIsSigning(true);
      console.log(isSigning)
      addToast({
        title: '签名请求',
        description: '请检查钱包中的签名请求',
        color: 'default',
        timeout: 3000
      });

      const { signature, deadline } = await fetchOrderSignature(
        session?.address as `0x${string}`,
        usdtAmount
      );
      setIsSigning(false);

      // 步骤3: 发送交易
      addToast({
        title: '交易发送中',
        description: '请确认钱包中的交易',
        color: 'default',
        timeout: 5000
      });

      const txHash = await writeContractAsync({
        address: DM_CONTRACT.address as Address,
        abi: DM_CONTRACT.abi,
        functionName: 'createOrder',
        args: [usdtAmount, deadline, signature],
      });

      // 保存交易哈希用于轮询检查
      setCurrentTxHash(txHash);

      // 立即发送创建订单请求到后端
      createBackendOrder(txHash, usdtAmount);

      addToast({
        title: '交易已发送',
        description: `等待区块链确认...\n交易哈希: ${txHash.slice(0, 12)}...`,
        color: 'success',
        timeout: 8000
      });

      console.log('交易哈希:', txHash);

    } catch (error: any) {
      let message = '交易失败';
      if (error.message.includes('User rejected')) message = '用户取消操作';
      if (error.message.includes('insufficient funds')) message = '余额不足';

      addToast({
        title: message,
        description: error.message,
        color: 'warning',
        timeout: 5000
      });

      // 重置状态
      setIsLoading(false);
      setPendingOrder(null);
      setCurrentTxHash(null);
    }
  };

  // 渲染订单卡片
  const renderOrderCard = (order: typeof orders[0]) => (
    <Card className="py-4 bg-transparent border border-purple-500" key={order.id}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <span className={title({ color: "violet" })}>{order.orderAmount}&nbsp;USDT</span>
      </CardHeader>
      <CardBody className="overflow-visible py-2 mt-4">
        {isLoading && pendingOrder === order.id ? (
          <Button
            color="secondary"
            className="font-bold"
            size="md"
            variant="shadow"
            disabled
          >
            <Spinner size="sm" className="mr-2" />
            处理中...
          </Button>
        ) : (
          <Button
            color="secondary"
            className="font-bold"
            size="md"
            variant="shadow"
            onClick={() => handleSecureBuy(order.id)}
          >
            购买
          </Button>
        )}
      </CardBody>
    </Card>
  );

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center min-h-screen"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* 顶部卡片 */}
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
          {orders.map(renderOrderCard)}
        </div>

        {/* 显示订单状态轮询中 */}
        {orderStatusPolling && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            <Spinner size="sm" className="mr-2 inline-block" />
            正在检查订单状态...
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}