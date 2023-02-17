import { ethers } from "hardhat";

async function main() {
  
  const ScarFaceNFT = await ethers.getContractFactory("ScarFaceNFT");
  const deployScarFaceNFT = await ScarFaceNFT.deploy();
  await deployScarFaceNFT.deployed();
  console.log(`The NFT has been deployed to ${deployScarFaceNFT.address}`);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
