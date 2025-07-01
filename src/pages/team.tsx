import { useEffect, useState, useCallback } from "react";
import DefaultLayout from "@/layouts/default";
import { useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import apiClient from '@/api';
import { upgradeLevel } from "@/api/api";
import { useAuth } from "@/providers/AuthProvider";

import { Spinner } from "@heroui/spinner";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";
import { Slider } from "@heroui/slider";
// import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { User } from "@heroui/user";
import { Alert } from "@heroui/alert";
import {
  Wallet as WalletIcon,
  // MapPinned as NodeIcon,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import Decimal from "decimal.js";


// 团队成员接口
interface TeamMember {
  id: string;
  username: string;
  walletAddress: string;
  teamCount: number;
  level: string;
  avatar?: string;
}

// 团队信息接口
interface TeamInfo {
  directCount: number;
  teamCount: number;
  areaCount: number;
  totalOrderAmount?: string; // 新增属性，类型可根据实际API返回调整
  areas: {
    name: string;
    count: number;
  }[];
}

// const lvColorMap = {
//   0: "default",
//   1: "danger",
//   2: "warning",
//   3: "secondary",
//   4: "success",
//   5: "danger"
// };
export default function TeamPage() {
  const { address } = useAccount();
  const { session } = useAuth();
  // const [balance] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const location = useLocation();

  // 团队数据状态
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]); // 初始化为空数组
  const [activeArea, setActiveArea] = useState<number>(0); // 0=A区, 1=B区, 2=C区
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10; // 每页数量

  // 获取用户信息
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (address) {
          // const balance = await query('balanceOf', [address]);
          // setBalance(balance.toString());

          const userInfoResponse = await apiClient.get(`user/${address}`);
          setUserInfo(userInfoResponse.data);
        }
      } catch (err) {
        console.error('数据获取失败:', err);
      }
    };

    fetchData();
  }, [location, address]);

  // 修复点1: 使用可选链操作符安全访问API响应数据
  const fetchTeamData = useCallback(async (areaIndex: number, pageNum: number = 1) => {
    try {
      setIsLoading(true);

      // 首次加载时获取团队统计信息
      if (pageNum === 1) {
        const teamResponse = await apiClient.get(`/team/${address}`);
        setTeamInfo(teamResponse.data);
        console.log(teamResponse)
      }

      // 获取团队成员
      const response = await apiClient.get(`/team/${address}/members`, {
        params: {
          area: areaIndex,
          page: pageNum,
          limit
        }
      });

      // 安全访问members属性
      const members = response?.data?.members || []; // 使用空数组作为默认值
      console.log(members)
      const hasMoreData = response?.data?.hasMore ?? false; // 安全访问hasMore属性

      if (pageNum === 1) {
        setTeamMembers(members);
      } else {
        setTeamMembers(prev => [...prev, ...members]);
      }

      setHasMore(hasMoreData);
      setPage(pageNum);
      setIsLoading(false);
    } catch (error) {
      console.error("获取团队信息失败:", error);
      // 出错时重置当前页的成员列表为空
      if (pageNum === 1) {
        setTeamMembers([]);
      }
      setHasMore(false);
      setIsLoading(false);
    }
  }, [address]);

  // 初始化加载A区数据
  useEffect(() => {
    if (address) {
      fetchTeamData(0);
    }
  }, [address, fetchTeamData]);

  // 页面打开时自动执行 upgradeLevel，依赖 session.address。
  useEffect(() => {
    if (session?.address) {
      // 页面打开时自动执行 upgradeLevel
      upgradeLevel(session.address).catch(() => { });
    }
  }, [session?.address]);

  // 区域切换处理
  const handleAreaChange = (areaIndex: number) => {
    const areaIndexCount = (teamInfo?.areas as { count: number }[])?.[areaIndex]?.count || 0;
    if (areaIndexCount == 0) {
      throw new Error('区无人');
      <Alert title="{`区无人`}" />
    }
    setActiveArea(areaIndex);
    setPage(1);
    setTeamMembers([]);
    fetchTeamData(areaIndex);
  };

  // 无限滚动加载更多
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: () => fetchTeamData(activeArea, page + 1)
  });

  // 安全访问teamInfo属性
  // 重构 cardList 生成逻辑
  const cardList = [
    { title: "直推", value: teamInfo?.directCount || 0 },
    { title: "团队", value: teamInfo?.teamCount || 0 },
    { title: "大区", value: teamInfo?.areaCount || 0 }
  ];
  // 渲染团队成员单元格
  const renderTeamCell = useCallback((user: TeamMember & { performance?: { maxAmount?: string } }, columnKey: keyof TeamMember) => {
    switch (columnKey) {
      case "username":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: (() => {
                // 8个档位图片
                const avatarImages = [
                  "/1.png", // 0-200
                  "/2.png", // 200-500
                  "/3.png", // 500-1000
                  "/4.png", // 1000-2000
                  "/5.png", // 2000-5000
                  "/6.png", // 5000-10000
                  "/7.png", // 10000-20000
                  "/8.png", // 20000-50000+
                ];
                // 8个档位金额（18位精度）
                const amountSteps = [
                  200, 500, 1000, 2000, 5000, 10000, 20000, 50000
                ].map(v => BigInt(v) * 10n ** 18n);
                const maxAmount = user?.performance?.maxAmount
                  ? BigInt(user.performance.maxAmount)
                  : null;
                console.log("maxAmount:", maxAmount, "amountSteps:", amountSteps);
                if (!maxAmount) return "/logo.png";
                if (maxAmount == amountSteps[0]) return avatarImages[0];
                if (maxAmount == amountSteps[1]) return avatarImages[1];
                if (maxAmount == amountSteps[2]) return avatarImages[2];
                if (maxAmount == amountSteps[3]) return avatarImages[3];
                if (maxAmount == amountSteps[4]) return avatarImages[4];
                if (maxAmount == amountSteps[5]) return avatarImages[5];
                if (maxAmount == amountSteps[6]) return avatarImages[6];
                if (maxAmount == amountSteps[7]) return avatarImages[7];
                return avatarImages[7];
              })()
            }}
            name={user.username || "未知用户"}
          >
            {user.walletAddress ?
              `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(38)}` :
              "未知地址"}
          </User>
        );
      case "teamCount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {user.teamCount?.toLocaleString() || "0"}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">成员</p>
          </div>
        );
      case "level":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            Lv{user.level}
          </Chip>
        );
      default:
        return user[columnKey] || ""; // 安全访问属性
    }
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4"
      // style={{
      //   backgroundImage: "url('/bg.jpeg')", // 确保图片在public目录
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundAttachment: "fixed",
      //   backgroundRepeat: "no-repeat"
      // }}
      >
        <Card className="rounded-t-none rounded-b-[24px] w-full"
          style={{
            background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
          }}
        >
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/logo.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">DM Token</h4>
                <h5 className="text-small tracking-tight text-default-400">@BSCScan Address</h5>
              </div>
            </div>
            {/* <Button isIconOnly aria-label="节点" color={userInfo?.isNode ? "success" : "default"} isDisabled={!userInfo?.isNode}>
              <NodeIcon className={userInfo?.isNode ? "text-white" : ""} />
            </Button> */}
            {userInfo?.isNode && (
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="node.jpeg"
                width={38}
                height={38}
              />
            )}
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <Slider
              className="max-w-md"
              value={(() => {
                const level = Number(userInfo?.level ?? 0);
                if (isNaN(level) || level < 1) return 0;
                if (level > 5) return 1;
                return level * 0.2;
              })()}
              formatOptions={{ style: "percent" }}
              label={`LV${userInfo?.level ?? 0}`}
              marks={[
                { value: 0, label: "" },
                { value: 0.2, label: "LV1" },
                { value: 0.4, label: "LV2" },
                { value: 0.6, label: "LV3" },
                { value: 0.8, label: "LV4" },
                { value: 1, label: "LV5" }
              ]}
              minValue={0}
              maxValue={1}
              showTooltip={true}
              step={0.2}
            />
            <span className="pt-2">
              <span aria-label="wallet" className="py-2" role="img">
                <WalletIcon />#{address || "未连接钱包"}
              </span>
            </span>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">{new Decimal(userInfo?.dmAccount?.balance || 0).div(1e18).toFixed(2)}</p>
              <p className="text-default-400 text-small">DM Token</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                ${new Decimal(userInfo?.performance?.payment || 0).div(1e18).toFixed(2)} {/* 使用可选链访问 */}
              </p>
              <p className="text-default-400 text-small">Performance</p>
            </div>
          </CardFooter>
        </Card>

        <div className="w-full grid grid-cols-3 gap-2 px-2">
          {cardList.map((item, index) => (
            <Card
              key={index}
              className="py-2 text-white w-full"
              isPressable
              shadow="sm"
              style={{
                background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
                fontFamily: 'system-ui, sans-serif',
                boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
              }}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start w-full">
                <p className="text-tiny uppercase font-bold">{item.title}</p>
                <small className="text-default-500">人</small>
                <h4 className="font-bold text-large">{item.value.toLocaleString()}</h4>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 gap-2 px-2">
            <Card
              className="py-2 text-white w-full"
              isPressable
              shadow="sm"
              style={{
                background: 'linear-gradient(90deg, #6226CD, #D41E7F)',
                fontFamily: 'system-ui, sans-serif',
                boxShadow: "0 10px 30px rgba(128, 0, 128, 0.3)"
              }}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start w-full">
                <p className="text-tiny uppercase font-bold">总业绩</p>
                <small className="text-default-500">$</small>
                <h4 className="font-bold text-large">{new Decimal(teamInfo?.totalOrderAmount || 0).div(1e18).toFixed(2)}</h4>
              </CardHeader>
            </Card>
        </div>
          

        <div className="dark w-full">
          <Tabs
            aria-label="团队区域"
            color="secondary"
            fullWidth
            radius="full"
            className="p-2"
            selectedKey={activeArea.toString()}
            onSelectionChange={(key) => handleAreaChange(Number(key))}
          >
            <Tab key="0" title="A区" />
            <Tab key="1" title="B区" />
            <Tab key="2" title="C区" />
          </Tabs>

          <Table
            isHeaderSticky
            aria-label="团队成员列表"
            color="primary"
            baseRef={scrollerRef}
            bottomContent={
              hasMore && !isLoading ? (
                <div className="flex w-full justify-center py-4">
                  <Spinner ref={loaderRef} color="white" />
                </div>
              ) : null
            }
            classNames={{
              base: "max-h-[520px] overflow-scroll bg-black text-white",
              table: "min-h-[200px] bg-transparent",
            }}
          >
            <TableHeader>
              <TableColumn key="username">用户</TableColumn>
              <TableColumn key="teamCount">团队</TableColumn>
              <TableColumn key="level">等级Lv</TableColumn>
            </TableHeader>

            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner color="primary" className="my-8" />}
              items={teamMembers}
            >
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell>{renderTeamCell(item, "username")}</TableCell>
                  <TableCell>{renderTeamCell(item, "teamCount")}</TableCell>
                  <TableCell>{renderTeamCell(item, "level")}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {!isLoading && teamMembers.length === 0 && (
            <div className="flex justify-center py-8 text-white bg-black">
              当前区域暂无团队成员
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}