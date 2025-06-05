// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
// import { Link } from "@heroui/link";
// import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  // getKeyValue,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";
const cardList = [
  {
    title: "直推",
    img: "/images/fruit-1.jpeg",
    price: "$5.50",
  },
  {
    title: "团队",
    img: "/images/fruit-2.jpeg",
    price: "$3.0000000",
  },
  {
    title: "大区",
    img: "/images/fruit-3.jpeg",
    price: "$10.00",
  }
];
// const lvColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// 在文件顶部添加类型定义
interface ListItem {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  skin_color: string;
  avatar?: string;
  [key: string]: any; // 允许其他未定义属性
}

export default function TeamPage() {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);

  let list = useAsyncList<ListItem>({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", { signal });
      let json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({ hasMore, onLoadMore: list.loadMore });

  const renderCell = React.useCallback((user: ListItem, columnKey: keyof ListItem) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.birth_year}
            name={cellValue}
          >
            {user.birth_year}
          </User>
        );
      case "gender":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.height}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.mass}</p>
          </div>
        );
      case "birth_year":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {user.skin_color}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4">
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

        <div className="gap-2 grid grid-cols-3 px-2">
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
                <small className="text-default-500">人</small>
                <h4 className="font-bold text-large">10000000</h4>
              </CardHeader>
              {/* <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={70}
                />
              </CardBody> */}
            </Card>


          ))}
        </div>
        
        <div className="dark">
          <Tabs aria-label="Tabs colors" color="secondary" fullWidth radius="full" className="p-2">
            <Tab key="photos" title="A区" />
            <Tab key="music" title="B区" />
            <Tab key="videos" title="C区" />
          </Tabs>
          <Table
            isHeaderSticky
            aria-label="Example table with infinite pagination"
            color="primary"
            baseRef={scrollerRef}
            bottomContent={
              hasMore ? (
                <div className="flex w-full justify-center">
                  <Spinner ref={loaderRef} color="white" />
                </div>
              ) : null
            }
            classNames={{
              base: "max-h-[820px] overflow-scroll bg-black",
              table: "min-h-[820px] bg-transparent",
            }}

          >
            <TableHeader>
              <TableColumn key="name">用户</TableColumn>
              <TableColumn key="gender">团队</TableColumn>
              <TableColumn key="birth_year">等级Lv</TableColumn>
            </TableHeader>

            <TableBody 
            emptyContent={"No users found"}
            isLoading={isLoading}
            items={list.items as ListItem[]}
            loadingContent={<Spinner color="primary" />}
          >
            {(item: ListItem) => (
              <TableRow key={item.name}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as keyof ListItem)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>


          </Table>
        </div>
      </section>
    </DefaultLayout>
  );
}
