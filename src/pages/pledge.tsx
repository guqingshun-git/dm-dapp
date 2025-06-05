import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
// import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";
// import { Divider } from "@heroui/divider";
import { 
  ChevronDown,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  ShoppingCart,
  Youtube,
  RefreshCw
} from "lucide-react";

export default function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-white p-4">
      {/* 顶部标题和时间选择器 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analyze</h1>
        <Chip 
          variant="bordered" 
          className="border-slate-600 bg-slate-800/50"
          endContent={<ChevronDown className="w-4 h-4 ml-1" />}
        >
          Oct - Feb
        </Chip>
      </div>
      
      {/* 资金趋势图表卡片 */}
      <Card className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-5 mb-6">
        {/* 峰值标注 */}
        <div className="text-right mb-2">
          <span className="bg-white/10 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-medium">$4,600</span>
        </div>
        
        {/* 图表区域 */}
        <div className="relative h-40">
          {/* 图表曲线 */}
          <div className="absolute bottom-0 left-0 right-0 h-full">
            {/* 网格线 */}
            <div className="absolute top-1/4 left-0 right-0 border-b border-white/10"></div>
            <div className="absolute top-2/4 left-0 right-0 border-b border-white/10"></div>
            <div className="absolute top-3/4 left-0 right-0 border-b border-white/10"></div>
            
            {/* 图表数据点 */}
            <div className="absolute bottom-0 left-1/6 h-3 w-1 bg-white/30 rounded-t-full"></div>
            <div className="absolute bottom-0 left-2/6 h-1/4 w-1 bg-white/30 rounded-t-full"></div>
            <div className="absolute bottom-0 left-3/6 h-1/2 w-1 bg-white/30 rounded-t-full"></div>
            <div className="absolute bottom-0 left-4/6 h-3/4 w-1 bg-white/30 rounded-t-full"></div>
            <div className="absolute bottom-0 left-5/6 h-full w-2 bg-white rounded-t-full">
              <div className="absolute -top-5 w-0.5 h-5 bg-white/50"></div>
            </div>
            
            {/* 连接线 */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path 
                d="M16,38 L32,30 L48,20 L64,10 L82,0" 
                stroke="white" 
                strokeWidth="2" 
                fill="none"
                strokeOpacity="0.6"
              />
            </svg>
          </div>
          
          {/* 时间轴标签 */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pt-1 text-xs text-white/70">
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
          </div>
        </div>

        {/* 总余额区域 */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/30">
          <div>
            <p className="text-sm text-white/80">Total balance</p>
            <p className="text-2xl font-bold">$1,924.35</p>
          </div>
          <div className="flex gap-2">
            <Button 
              isIconOnly 
              variant="light" 
              className="text-white/80 bg-white/10 backdrop-blur-md"
              aria-label="Send"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Button>
            <Button 
              isIconOnly 
              variant="light" 
              className="text-white/80 bg-white/10 backdrop-blur-md"
              aria-label="Receive"
            >
              <ArrowDownLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* 交易详情卡片 */}
      <Card className="bg-slate-800/70 backdrop-blur-xl border border-slate-700">
        <CardHeader className="border-b border-slate-700 px-4 py-3">
          <h2 className="text-lg font-semibold">Transaction details</h2>
        </CardHeader>
        
        <CardBody className="p-0">
          {/* Dribbble 交易记录 */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-rose-500/20">
                  <CreditCard className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="font-medium">Dribbble</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm text-slate-400">13 Jan 22</span>
                    <span className="text-sm text-slate-400">3:24 PM</span>
                  </div>
                </div>
              </div>
              <p className="text-rose-400 font-medium">-$102.24</p>
            </div>
          </div>
          
          {/* Amazon Shopping 交易记录 */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-500/20">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">Amazon Shopping</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm text-slate-400">12 Jan 22</span>
                    <span className="text-sm text-slate-400">2:35 PM</span>
                  </div>
                </div>
              </div>
              <p className="text-rose-400 font-medium">-$32.24</p>
            </div>
          </div>
          
          {/* YouTube TV 交易记录 */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-500/20">
                  <Youtube className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">YouTube TV</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm text-slate-400">9 Jan 22</span>
                    <span className="text-sm text-slate-400">6:10 PM</span>
                  </div>
                </div>
              </div>
              <p className="text-rose-400 font-medium">-$20.00</p>
            </div>
          </div>
          
          {/* Paypal 交易记录 */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Paypal</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm text-slate-400">7 Jan 22</span>
                    <span className="text-sm text-slate-400">7:00 PM</span>
                  </div>
                </div>
              </div>
              <p className="text-rose-400 font-medium">-$80.00</p>
            </div>
          </div>
          
          {/* View All 按钮 */}
          <Button 
            variant="light" 
            className="w-full rounded-none p-5 text-blue-400"
          >
            View All
          </Button>
        </CardBody>
      </Card>
      
      {/* 右下角添加按钮 */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button 
          isIconOnly 
          color="primary" 
          className="w-14 h-14 rounded-full shadow-xl"
          aria-label="Add transaction"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}