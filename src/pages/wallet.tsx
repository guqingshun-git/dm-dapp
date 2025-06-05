import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
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

  

  export default function WalletPage() {
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
          label: function(this: any, tooltipItem: TooltipItem<'line'>) {
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



    return (
      <DefaultLayout>
        <section className="flex flex-col items-center min-h-screen bg-[#000040]">
          <div className="px-6 pt-12 flex flex-col items-start w-full">
            <h4 className="font-bold text-large text-default-500">余额：</h4>
            <span className={title({ color: "violet" })}>$923892372.23&nbsp;</span>
          </div>
          

          <div className=""></div>
          <Card className="w-full border-none bg-gradient-to-br bg-transparent px-2">
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


        </section>
      </DefaultLayout>
    );
  }
