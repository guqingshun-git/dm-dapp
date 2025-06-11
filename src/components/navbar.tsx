// import { Button } from "@heroui/button";
// import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
// import { Input } from "@heroui/input";
import { title } from "@/components/primitives";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  // NavbarItem,
  // NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
// import { link as linkStyles } from "@heroui/theme";
// import clsx from "clsx";

import { siteConfig } from "@/config/site";
// import { ThemeSwitch } from "@/components/theme-switch";
// import { Logo } from "@/components/icons";

export const Navbar = () => {
  
  return (
    <HeroUINavbar maxWidth="xl" position="sticky"
    style={{
      backgroundImage: "url('/bg.jpeg')", // 确保图片在public目录
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      paddingLeft:"0 !important"
    }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            {/* <Logo /> */}
            <img src="/logo.png" className="w-10"/>
            <span className={title({ color: "violet" })}>TF-RWA&nbsp;</span>
            {/* <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600">
  TF-RWA
</p> */}
          </Link>
        </NavbarBrand>
        
      </NavbarContent>


      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link> */}
        <ConnectButton label="Sign" accountStatus="avatar" chainStatus="none"/>
        {/* <ThemeSwitch /> */}
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
