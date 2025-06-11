import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

import '@rainbow-me/rainbowkit/styles.css';
import { AuthProvider } from '@/providers/AuthProvider';
import {
  getDefaultConfig,
  RainbowKitProvider,
  // connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  tokenPocketWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [tokenPocketWallet,metaMaskWallet,rainbowWallet, walletConnectWallet],
//     },
//   ],
//   {
//     appName: 'phantomBloc',
//     projectId: 'b5284eec2e9a2a680e1d7a86da84c5e0',
//   }
// );
import { WagmiProvider } from 'wagmi';
import {
  bsc,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'DM-DAPP',
  projectId: '68433b7e17a1a11a78f8f48fd1e880db',
  chains: [bsc, mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [tokenPocketWallet, metaMaskWallet, rainbowWallet, walletConnectWallet],
    }
  ]
});
const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider coolMode>
            <AuthProvider> {/* 注入自定义认证状态 */}
              {/* Your App */}
              <HeroUIProvider navigate={navigate} useHref={useHref}>
                {children}
              </HeroUIProvider>
              </AuthProvider>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  );
}
