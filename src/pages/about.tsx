import { useState } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useRenounceOwnership, useUpdateSigner } from "@/contracts/calls/tokens";
import { Address } from "viem";

export default function DocsPage() {
  const [newSignerAddress, setNewSignerAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const renounceOwnership = useRenounceOwnership();
  const updateSigner = useUpdateSigner();

  // 放弃管理权
  const handleRenounceOwnership = async () => {
    try {
      setIsLoading(true);
      await renounceOwnership();
      alert("成功放弃管理权！此操作不可逆转。");
    } catch (error) {
      console.error("放弃管理权失败:", error);
      alert("放弃管理权失败，请查看控制台错误信息");
    } finally {
      setIsLoading(false);
    }
  };

  // 更新签名钱包
  const handleUpdateSigner = async () => {
    if (!newSignerAddress) {
      alert("请输入新的签名钱包地址");
      return;
    }
    
    try {
      setIsLoading(true);
      await updateSigner(newSignerAddress as Address);
      alert("成功更新签名钱包地址！");
      setNewSignerAddress("");
    } catch (error) {
      console.error("更新签名钱包失败:", error);
      alert("更新签名钱包失败，请查看控制台错误信息");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>管理员控制面板</h1>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {/* 更新签名钱包卡片 */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">更新签名钱包</h3>
            </CardHeader>
            <CardBody className="gap-4">
              <Input
                type="text"
                label="新签名钱包地址"
                placeholder="0x..."
                value={newSignerAddress}
                onChange={(e) => setNewSignerAddress(e.target.value)}
                description="输入新的签名钱包地址"
              />
              <Button
                color="primary"
                onPress={handleUpdateSigner}
                isLoading={isLoading}
                isDisabled={!newSignerAddress || isLoading}
              >
                更新签名钱包
              </Button>
            </CardBody>
          </Card>

          {/* 放弃管理权卡片 */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-danger">危险操作</h3>
            </CardHeader>
            <CardBody className="gap-4">
              <p className="text-sm text-default-500">
                ⚠️ 警告：放弃管理权是不可逆转的操作，请谨慎考虑！
              </p>
              <Button
                color="danger"
                variant="solid"
                onPress={handleRenounceOwnership}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                放弃管理权
              </Button>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
