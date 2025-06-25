import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/providers/AuthProvider";
import { useTokenBalance } from "@/contracts/calls/tokens";
import Decimal from 'decimal.js';

// import { Card, CardBody, CardHeader } from "@heroui/card";
// import { Image } from "@heroui/image";
// import { Button } from "@heroui/button";
// import {
//   ChevronDown,
//   Activity
// } from "lucide-react";




  

  export default function WalletPage() {
    const { session } = useAuth();
    const dmRaw = useTokenBalance(session?.address as `0x${string}`);
    const dmBalance = new Decimal((dmRaw ?? 0).toString()).div(1e18).toFixed(2);
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center min-h-screen bg-[#000040]">
          <div className="px-6 pt-12 flex flex-col items-start w-full">
            <h4 className="font-bold text-large text-default-500">DM余额：</h4>
            <span className={title({ color: "violet" })}>{dmBalance}&nbsp;</span>
          </div>
          

          <div className=""></div>
        <div className="px-6 pt-24 flex flex-col items-start w-full">
            <span className={title({ color: "violet" })}>商城建设中....</span>
          </div>

        



        </section>
      </DefaultLayout>
    );
  }
