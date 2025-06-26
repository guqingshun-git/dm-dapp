import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/providers/AuthProvider";
// import { useTokenBalance } from "@/contracts/calls/tokens";
import Decimal from 'decimal.js';
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

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
  }
];

export default function WalletPage() {
  const { session, userInfo } = useAuth();
  const { data: detaildInfo } = useUserInfo(session?.address);
  // const dmRaw = useTokenBalance(session?.address as `0x${string}`);
  // const dmBalance = new Decimal((dmRaw ?? 0).toString()).div(1e18).toFixed(2);

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
      }
    ];

  }, [session.address, detaildInfo, userInfo]);
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
        <div className="px-6 pt-12 flex flex-col items-start w-full">
          <h4 className="font-bold text-large text-default-500">可用红包：</h4>
          <span className={title({ color: "violet" })}>${new Decimal(userInfo?.redAccount?.balance || 0).div(1e18).toFixed(2)}&nbsp;</span>
        </div>

        <div className="gap-4 grid grid-cols-2 px-4 pt-6">
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
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={170}
                />
              </CardBody>
            </Card>


          ))}
        </div>
        {/* <div className=""></div>
        <div className="px-6 pt-24 flex flex-col items-start w-full">
            <span className={title({ color: "violet" })}>商城建设中....</span>
          </div> */}





      </section>
    </DefaultLayout>
  );
}
