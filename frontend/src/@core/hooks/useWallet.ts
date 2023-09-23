import { useContext } from 'react'
import { WalletContext, WalletContextType } from '../context/walletContext'

export const useWallet = (): WalletContextType => useContext(WalletContext);
