import { ethers } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
require('dotenv').config()

const safeAddress = '0xbE653C043387342c037572aD642645bcCBBE6aDC';
const moduleAddress = '0x28b6Cfc8f6bf7921468e1373f0207b0695dC77c1';


(async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_RPC_URL)
    const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer
    })

    const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress })
    const safeTransaction = await safeSdk.createEnableModuleTx(moduleAddress)
    const txResponse = await safeSdk.executeTransaction(safeTransaction)
    await txResponse.transactionResponse?.wait()

})()