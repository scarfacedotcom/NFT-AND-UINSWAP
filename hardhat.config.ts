// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
// import dotenv from "dotenv";
// dotenv.config();

// const config: HardhatUserConfig = {
//   solidity: "0.8.17",
//   defaultNetwork: "goerli",
//   networks: {
//     hardhat: {
//     },
//     goerli: {
//       url: process.env.GOERLI_RPC,
//       //@ts-ignore
//       accounts: [process.env.PRIVATE_KEY1]
//     }
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_APIKEY,
//   },
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: "https://eth-mainnet.alchemyapi.io/v2/IbkEKxpq0g2wcpd3XUqioRT4_-nsa0dv",
      }
    },
    goerli: {
      url: process.env.MAINNET_RPC,
      //@ts-ignore
      accounts: [process.env.PRIVATE_KEY1]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },

  gas: 2100000,
};

export default config;