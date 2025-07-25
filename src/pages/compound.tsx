import { useEffect, useState } from "react";
import { fetchTokenPrice } from "@/api/api";
import { useAuth } from "@/providers/AuthProvider";
import { Decimal } from 'decimal.js';

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




let cardList = [
  {
    title: "DM-TOKEN",
    name: "复利余额",
    img: "/images/fruit-1.jpeg",
    value: "0",
  },
  {
    title: "compoundDailyRate",
    name: "复利倍数",
    img: "/images/fruit-2.jpeg",
    value: 0,
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

export default function CompoundPage() {
  const [tokenPrice, setTokenPrice] = useState<number>(4100); // 默认价格
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  
  // 获取代币价格
  const getTokenPrice = async () => {
    try {
      setIsLoadingPrice(true);
      console.log('开始获取代币价格...');
      const response = await fetchTokenPrice();
      console.log('API响应数据:', response);
      
      // 检查响应数据结构
      if (response && typeof response === 'object') {
        let price: number;
        
        // 尝试不同的数据结构
        if (response.tokenPrice) {
          price = parseFloat(response.tokenPrice);
        } else if (typeof response === 'string') {
          price = parseFloat(response);
        } else {
          console.error('未知的响应格式:', response);
          return;
        }
        
        console.log('解析出的价格:', price);
        if (!isNaN(price) && price > 0) {
          setTokenPrice(price);
        } else {
          console.error('价格解析失败或价格无效:', price);
        }
      } else {
        console.error('响应数据为空或格式错误:', response);
      }
    } catch (error) {
      console.error('获取代币价格失败:', error);
      // 网络错误时使用默认价格
      setTokenPrice(0);
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // 图表数据 - 使用动态价格
  const data = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: '收益',
        data: [
          tokenPrice * 0.9,  // 前4个月相对当前价格的波动
          tokenPrice * 0.85,
          tokenPrice * 0.95,
          tokenPrice * 0.88,
          tokenPrice // 当前价格
        ],
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
        min: tokenPrice * 0.8,  // 动态调整Y轴范围
        max: tokenPrice * 1.1
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6
      }
    }
  };
  // const location = useLocation();
  const { session, userInfo } = useAuth();

  // 页面加载时获取代币价格
  useEffect(() => {
    getTokenPrice();
  }, []);

  useEffect(() => {
    let compoundDailyRate = new Decimal(userInfo?.compAccount?.dailyRate ?? 0);
    cardList = [
      {
        title: "DM-TOKEN",
        name: "复利余额",
        img: "/images/fruit-1.jpeg",
        value: new Decimal(userInfo?.compAccount?.balance || 0).div(1e18).toFixed(2),
      },
      {
        title: "compoundDailyRate",
        name: "复利倍数",
        img: "/images/fruit-2.jpeg",
        value: compoundDailyRate.dividedBy(10000).toNumber()
      }
    ];

  }, [session.address,userInfo]);


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
          <h4 className="font-bold text-large text-default-500">复利余额：</h4>
          <span className={title({ color: "violet" })}>
            {new Decimal(userInfo?.compAccount?.balance || 0).div(1e18).toFixed(2)}&nbsp;
          </span>
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
                <span className="text-2xl font-bold text-purple-50">
                  ${isLoadingPrice ? '加载中...' : tokenPrice.toFixed(6)}
                </span>
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


    


      </section>
    </DefaultLayout>
  );
}
