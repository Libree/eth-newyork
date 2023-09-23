import { ethers } from "hardhat";

async function main() {

  const LenderModule = await ethers.getContractAt('LenderModule', '0x28b6Cfc8f6bf7921468e1373f0207b0695dC77c1')
  const safeAddress = '0xbE653C043387342c037572aD642645bcCBBE6aDC';
  const tx = await LenderModule.withdraw(
    safeAddress,
    '0xaaA60CFeA072797c07cc8CE5049dC5fb4531E4D4',
    1000000000000,
    '0x7C61C48919805eDC3Bd75ace9d7211Fb3b0Ed13D'
  )

  await tx.wait()

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
