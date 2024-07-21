export const subgraphUrl =
  process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
  "https://api.studio.thegraph.com/query/18583/wavehack-grant-tracker/version/latest";

export const explorerUrl =
  process.env.NEXT_PUBLIC_EXPLORER_URL || "https://etherscan.io";

export const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "Mainnet";

export const supportedTokens = [
  {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name: "USDT",
    symbol: "USDT",
    decimals: 6,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  }
];