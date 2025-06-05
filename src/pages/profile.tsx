// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
// import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import React from "react";

import { Chip } from "@heroui/chip";
import { Listbox, ListboxItem } from "@heroui/listbox";
// 导入所有需要的Lucide图标
import {
  Bug as BugIcon,
  GitPullRequest as PullRequestIcon,
  MessageSquare as ChatIcon,
  PlayCircle as PlayCircleIcon,
  Layout as LayoutIcon,
  Tag as TagIcon,
  Users as UsersIcon,
  Eye as EyeIcon, // Watchers图标
  Book as BookIcon,
  // Shield as ShieldIcon,
  // Key as KeyIcon,
  // Bell as BellIcon,
  // CreditCard as CreditCardIcon,
  // Lock as LockIcon,
  // ShoppingBag as ShoppingBagIcon,
  // Star as StarIcon,
  // Settings as SettingsIcon,
  // LogOut as LogOutIcon
} from "lucide-react";

// 为没有直接对应图标的功能添加占位图标
// import {
//   Globe as RegionIcon, // 大区图标
//   Layers as ProjectIcon, // 项目图标
//   Activity as ActivityIcon, // 活动图标
// } from "lucide-react";
// 统计数据
const stats = [
  { title: "DM币", value: "42", change: "+5", color: "primary" },
  { title: "USDT", value: "128", change: "+18", color: "success" },
  { title: "总投资", value: "3,425", change: "+120", color: "warning" },
  { title: "总收益", value: "87%", change: "-2%", color: "secondary" },
];
// const lvColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

interface ItemCounterProps {
  number: number;
}
// 自定义图标包裹组件
const IconWrapper = ({ children, className = "" }: IconWrapperProps) => (
  <div className={`rounded-full p-3 ${className}`}>
    {children}
  </div>
);

// 计数器组件
const ItemCounter = ({ number }: ItemCounterProps) => (
  <span className="text-default-400 font-medium text-xs">
    {number}
  </span>
);

export default function ProfilePage() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 bg-[#000040]">
        <Card className="rounded-t-none rounded-b-[24px] max-w-[400px]"
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
                src="https://heroui.com/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
              </div>
            </div>
            <Button
              className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "LV1" : "LV1"}
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
            <span className="pt-2">
              #FrontendWithZoey
              <span aria-label="computer" className="py-2" role="img">
                💻
              </span>
            </span>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">4</p>
              <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">Followers</p>
            </div>
          </CardFooter>
        </Card>

        {/* 统计数据卡片 - 应用深色半透明背景 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-0">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
            >
              <CardBody className="p-4">
                <p className="text-slate-300 text-sm">{stat.title}</p>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <Chip
                    size="sm"
                    className="ml-2 bg-slate-700 text-slate-200"
                  >
                    {stat.change}
                  </Chip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

          <div className="w-full px-4">
        <Listbox
          aria-label="User Menu"
          className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium bg-[#000040] text-white"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-14 data-[hover=true]:bg-default-100/80",
          }}
          onAction={(key) => alert(key)}
        >
          <ListboxItem
            key="issues"
            endContent={<ItemCounter number={13} />}
            startContent={
              <IconWrapper className="bg-success/10 text-success">
                <BugIcon className="text-lg " />
              </IconWrapper>
            }
          >
            Issues
          </ListboxItem>
          <ListboxItem
            key="pull_requests"
            endContent={<ItemCounter number={6} />}
            startContent={
              <IconWrapper className="bg-primary/10 text-primary">
                <PullRequestIcon className="text-lg " />
              </IconWrapper>
            }
          >
            Pull Requests
          </ListboxItem>
          <ListboxItem
            key="discussions"
            endContent={<ItemCounter number={293} />}
            startContent={
              <IconWrapper className="bg-secondary/10 text-secondary">
                <ChatIcon className="text-lg " />
              </IconWrapper>
            }
          >
            Discussions
          </ListboxItem>
          <ListboxItem
            key="actions"
            endContent={<ItemCounter number={2} />}
            startContent={
              <IconWrapper className="bg-warning/10 text-warning">
                <PlayCircleIcon className="text-lg " />
              </IconWrapper>
            }
          >
            Actions
          </ListboxItem>
          <ListboxItem
            key="projects"
            endContent={<ItemCounter number={4} />}
            startContent={
              <IconWrapper className="bg-default/50 text-foreground">
                <LayoutIcon className="text-lg " />
              </IconWrapper>
            }
          >
            Projects
          </ListboxItem>
          <ListboxItem
            key="releases"
            className="group h-auto py-3"
            endContent={<ItemCounter number={399} />}
            startContent={
              <IconWrapper className="bg-primary/10 text-primary">
                <TagIcon className="text-lg" />
              </IconWrapper>
            }
            textValue="Releases"
          >
            <div className="flex flex-col gap-1">
              <span>Releases</span>
              <div className="px-2 py-1 rounded-small bg-default-100 group-data-[hover=true]:bg-default-200">
                <span className="text-tiny text-default-600">@heroui/react@2.0.10</span>
                <div className="flex gap-2 text-tiny">
                  <span className="text-default-500">49 minutes ago</span>
                  <span className="text-success">Latest</span>
                </div>
              </div>
            </div>
          </ListboxItem>
          <ListboxItem
            key="contributors"
            endContent={<ItemCounter number={79} />}
            startContent={
              <IconWrapper className="bg-warning/10 text-warning">
                <UsersIcon />
              </IconWrapper>
            }
          >
            Contributors
          </ListboxItem>
          <ListboxItem
            key="watchers"
            endContent={<ItemCounter number={82} />}
            startContent={
              <IconWrapper className="bg-default/50 text-foreground">
                <EyeIcon />
              </IconWrapper>
            }
          >
            Watchers
          </ListboxItem>
          <ListboxItem
            key="license"
            endContent={<span className="text-small text-default-400">MIT</span>}
            startContent={
              <IconWrapper className="bg-danger/10 text-danger dark:text-danger-500">
                <BookIcon />
              </IconWrapper>
            }
          >
            License
          </ListboxItem>
        </Listbox>
        </div>
        <div className="text-center text-sm text-slate-400">
          <p>© 2025 用户中心 | 当前版本 v1.2.4</p>
        </div>
      </section>
    </DefaultLayout>
  );
}
