import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { providers } from "ethers";

async function main() {

  // Setting state variables
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const WHALE = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";


  // Getting contract implementation
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTRACT IMPLEMENTATION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  const Uniswap = await ethers.getContractAt("IUniswap", ROUTER);
  const DaiContract = await ethers.getContractAt("IToken", DAI);
  const WETHContract = await ethers.getContractAt("IToken", WETH);
  const UniContract = await ethers.getContractAt("IToken", UNI);
  

  // Setting up impersonator
  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(WHALE);
  const impersonatedSigner = await ethers.getSigner(WHALE);

  // Setting up transaction variables

  // First transaction
  const txA = {
      tokenA: DAI,
      tokenB:UNI,
      amountADesired: ethers.utils.parseEther("40"),
      amountBDesired: ethers.utils.parseEther("60"),
      amountAMin: ethers.utils.parseEther("1"),
      amountBMin: ethers.utils.parseEther("1"),
      to: impersonatedSigner.address,
      deadline: 2796588399
  }

  // Second transaction
  const txB = {
    token: DAI,
    amountTokenDesired: ethers.utils.parseEther("90"),
    amountTokenMin: 0,
    amountETHMin: 0,
    to: impersonatedSigner.address,
    deadline: 2796588399,
    value: ethers.utils.parseEther("1")
  }

  // Third transaction
  const txC = {
      tokenA: DAI,
      tokenB: UNI,
      liquidity: ethers.utils.parseEther("0"),
      amountAMin: 1,
      amountBMin: 1,
      to: impersonatedSigner.address,
      deadline: 2796588399
  }
    


  // Transactions
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FIRST TRANSACTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~APPROVE LIQUIDITY TOKENS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  await DaiContract.connect(impersonatedSigner).approve(ROUTER, txA.amountADesired)
  await UniContract.connect(impersonatedSigner).approve(ROUTER, txA.amountBDesired)
  

  console.log(`Adding DAI and UNI Liquidity...............`)
  Uniswap.connect(impersonatedSigner).addLiquidity(
    txA.tokenA,
    txA.tokenB,
    txA.amountADesired,
    txA.amountBDesired,
    txA.amountAMin,
    txA.amountBMin,
    txA.to,
    txA.deadline
  );

    const holderBalanceAfter = await DaiContract.balanceOf(WHALE);
    console.log(`Dai balance After ${holderBalanceAfter}`);

    const uniBalanceAfter = await UniContract.balanceOf(WHALE);
    console.log(`UNI Balance_After ${uniBalanceAfter}`);


  // Second Transaction

  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SECOND TRANSACTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~APPROVE LIQUIDITY TOKENS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  await DaiContract.connect(impersonatedSigner).approve(ROUTER, txB.amountTokenDesired)

  console.log(`Adding DAI and ETH Liquidity...............`)


  Uniswap.connect(impersonatedSigner).addLiquidityETH(
    txB.token,
    txB.amountTokenDesired,
    txB.amountTokenMin,
    txB.amountETHMin,
    txB.to,
    txB.deadline,
    {value: txB.value}
  );


  // Third Transaction
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~THIRD TRANSACTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~REMOVE LIQUIDITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

  //const FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const FACTORY = "0xf00e80f0DE9aEa0B33aA229a4014572777E422EE";

  const factoryConnect = await ethers.getContractAt("IToken", FACTORY);

  //const getPair = await factoryConnect.getPair(DAI, UNI);


  //console.log(` get Pair ${getPair}`);

  //const liquidityToken = await ethers.getContractAt("IToken", FACTORY);
  
  await factoryConnect.connect(impersonatedSigner).approve(ROUTER, txC.liquidity);

  console.log(factoryConnect.balanceOf(impersonatedSigner.address));
  
  Uniswap.connect(impersonatedSigner).removeLiquidity(
    txC.tokenA,
    txC.tokenB,
    txC.liquidity,
    txC.amountAMin,
    txC.amountBMin,
    txC.to,
    txC.deadline
  );


  console.log(`${DaiContract.balanceOf(impersonatedSigner.address)}`);
  console.log(`${UniContract.balanceOf(impersonatedSigner.address)}`);



    console.log("________________________THE END_____________________________")
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});