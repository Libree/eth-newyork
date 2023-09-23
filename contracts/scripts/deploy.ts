import { ethers } from "hardhat";

async function main() {

  const verifierAddress = '0xbE653C043387342c037572aD642645bcCBBE6aDC';
  const safeAddress = '0xbE653C043387342c037572aD642645bcCBBE6aDC';
  const LenderModule = await ethers.getContractFactory("LenderModule");
  const lenderModule = await LenderModule.deploy(verifierAddress);

  await lenderModule.deployed();

  console.log(
    `Deployed to ${lenderModule.address}`
  );

  const FakeUSDC = await ethers.getContractFactory("FakeUSDC");
  const fakeUSDC = await FakeUSDC.deploy('FUSDC', 'FUSDC', safeAddress);

  await fakeUSDC.deployed();

  console.log(
    `Deployed to ${fakeUSDC.address}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
