import { WagmiProvider, createConfig, http } from "wagmi"
import { sepolia, baseSepolia } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"

const WALLETCONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLETCONNECT_PROJECT_ID as string

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia, baseSepolia],

    // Required API Keys
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Vite",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://zeneca.app", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

const queryClient = new QueryClient()

export const Web3Provider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="soft"
          options={{
            language: "es-ES",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
