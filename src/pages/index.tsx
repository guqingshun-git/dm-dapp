import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
// import { Chip } from "@heroui/chip";
import {
  SunMoon, Languages
} from "lucide-react";
export const orders = [
  {
    id: 1,
    status: "active",
    logo: "",
    orderAmount: "$200",    // 200 USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日1%线性释放
    compoundDailyRate: "1.2%",   // 日复利1.2%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 2,
    status: "active",
    logo: "",
    orderAmount: "$200",    // 200 USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日1%线性释放
    compoundDailyRate: "1.2%",   // 日复利1.2%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 3,
    status: "active",
    logo: "",
    orderAmount: "$200",    // 200 USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日1%线性释放
    compoundDailyRate: "1.2%",   // 日复利1.2%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 4,
    status: "active",
    logo: "",
    orderAmount: "$200",    // 200 USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日1%线性释放
    compoundDailyRate: "1.2%",   // 日复利1.2%
    compoundCondition: "N/A"   // 无条件
  },
  {
    id: 5,
    status: "active",
    logo: "",
    orderAmount: "$200",    // 200 USDT
    rewardMultiplier: 1.4,
    dailyReleaseRate: "1%",     // 每日1%线性释放
    compoundDailyRate: "1.2%",   // 日复利1.2%
    compoundCondition: "N/A"   // 无条件
  },
];
// 状态到颜色的映射
// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center min-h-screen bg-[#000040]">
        <Card className="rounded-t-none rounded-b-[24px] max-w-[400px] border-none"
          style={{
            background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
          }}
        >
          <CardHeader className="flex gap-3 bg-black bg-opacity-20 p-4">
            <Image
              alt="heroui logo"
              height={40}
              radius="sm"
              src="/vite.svg"
              width={40}
            />
            <span className={title({ color: "violet" })}>TF-RWA&nbsp;</span>
            {/* 右侧按钮组 */}
            <div className="flex gap-3 ml-auto">
            {/* <AuthButton></AuthButton> */}
            {/* <ConnectButton chainStatus="icon" label="Sign in"/> */}
            
              <Button isIconOnly aria-label="Like" color="danger">
                <SunMoon />
              </Button>
              <Button isIconOnly aria-label="Take a photo" color="warning" variant="faded">
                <Languages />
              </Button>
            </div>
          </CardHeader>

          <Divider className="bg-purple-600 opacity-30" />

          <CardBody className="p-8">
            <span className={title({ color: "violet" })}>$172736.883&nbsp;</span>
          </CardBody>

          <Divider className="bg-purple-600 opacity-30" />

          <CardFooter className="bg-black bg-opacity-10 py-3 pb-8 px-4">
            <Link
              isExternal
              showAnchorIcon
              href="https://bscscan.com/tokentxns?a=0x61207338F4602a315e1105189F1082903Cda475d&p=1"
              className="text-purple-200 hover:text-purple-100 transition-colors"
            >0x61207338F4602a315e110F1082903Cda475d
            </Link>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-6xl p-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between bg-purple-600 dark:bg-gray-800 rounded-xl shadow-md p-4"
            >
              {/* 左侧：只保留User组件不变 */}
              <div>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: "/usdt.svg",
                    className: "flex-shrink-0"
                  }}
                  description={order.rewardMultiplier}
                  name={order.orderAmount}
                  className="text-white"
                />
              </div>

              {/* 中间：两个百分比垂直排列 */}
              <div className="flex flex-col">
                <div className="text-center">
                  <p className="font-bold text-sm text-white">{order.dailyReleaseRate}</p>
                  <p className="text-xs text-gray-300">每日释放</p>
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold text-sm text-white">{order.compoundDailyRate}</p>
                  <p className="text-xs text-gray-300">每日复利</p>
                </div>
              </div>

              {/* 右侧：只调整状态标签位置 */}
              <Button color="warning" size="sm" variant="shadow">buy</Button>
            </div>
          ))}
        </div>

      </section>
    </DefaultLayout>
  );
}
