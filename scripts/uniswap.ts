import { ethers } from "hardhat";

async function main() {

  // Setting state variables
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const IMPACC = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";


  // Getting contract implementation
  const Uniswap = await ethers.getContractAt("IUniswap", ROUTER);
  const UsdcContract = await ethers.getContractAt("IERC20", DAI);
  const WETHContract = await ethers.getContractAt("IERC20", WETH);
  const MaticContract = await ethers.getContractAt("IERC20", UNI);
  

  // Setting up impersonator
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(IMPACC);
  const impersonatedSigner = await ethers.getSigner(IMPACC);

  // Setting up transaction variables

  // First transaction
  const tx1 = {
      tokenA: DAI,
      tokenB:UNI,
      amountADesired: ethers.utils.parseEther("40"),
      amountBDesired: ethers.utils.parseEther("60"),
      amountAMin: ethers.utils.parseEther("10"),
      amountBMin: ethers.utils.parseEther("20"),
      to: impersonatedSigner.address,
      deadline: 1696588399
  }

  // Second transaction
  const tx2 = {
    token: "",
    amountTokenDesired: "",
    amountTokenMin: "",
    amountETHMin: "",
    to: "",
    deadline: ""
  }

  // Third transaction
  const tx3 = {
      tokenA: "",
      tokenB: "",
      liquidity: "",
      amountAMin: "",
      amountBMin: "",
      to: "",
      deadline: ""
  }
    


  // Transactions

  // First Transaction
  Uniswap.connect(impersonatedSigner).addLiquidity(
    tx1.tokenA,
    tx1.tokenB,
    tx1.amountADesired,
    tx1.amountBDesired,
    tx1.amountAMin,
    tx1.amountBMin,
    tx1.to,
    tx1.deadline
  );


  // Second Transaction
  //Uniswap.connect(impersonatedSigner).addLiquidityETH()


  // Third Transaction
  //Uniswap.connect(impersonatedSigner).removeLiquidity()
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});