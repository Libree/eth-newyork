// ** React Imports
import { createContext, useState, ReactNode, useEffect, FC } from 'react'

// ** Web3Auth Imports 
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";

// ** Adapters
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthEventListener, Web3AuthModalPack } from '@safe-global/auth-kit';

export type WalletContextType = {
    provider: SafeEventEmitterProvider | null;
    userInfo: any;
    safeAuthSignInResponse: any;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

// ** Create Context
export const WalletContext = createContext<WalletContextType>({} as WalletContextType);

const CLIENT_ID = "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

type Props = Record<"children", ReactNode>;

const connectedHandler: Web3AuthEventListener = (data) => console.log('CONNECTED', data)
const disconnectedHandler: Web3AuthEventListener = (data) => console.log('DISCONNECTED', data)


export const WalletProvider: FC<Props> = ({ children }) => {
    const [safeAuth, setSafeAuth] = useState<any>()
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any | null>(null)
    const [userInfo, setUserInfo] = useState<any>()
    const [provider, setProvider] = useState<any | null>(null)

    useEffect(() => {
        const options: Web3AuthOptions = {
            clientId: CLIENT_ID,
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x5",
                rpcTarget: "https://rpc.ankr.com/eth_goerli",
            },
            uiConfig: {
                loginMethodsOrder: ["google", "github"],
                defaultLanguage: "en",
            },
            web3AuthNetwork: "cyan",
        }

        const modalConfig = {
            [WALLET_ADAPTERS.TORUS_EVM]: {
                label: 'torus',
                showOnModal: false
            },
            [WALLET_ADAPTERS.METAMASK]: {
                label: 'metamask',
                showOnDesktop: true,
                showOnMobile: false
            }
        }

        const openloginAdapter = new OpenloginAdapter({
            loginSettings: {
                mfaLevel: 'default'
            },
            adapterSettings: {
                uxMode: 'redirect',
                whiteLabel: {
                    appName: 'Safe'
                }
            }
        })

        const init = async () => {
            try {
                const web3AuthModalPack = new Web3AuthModalPack({ txServiceUrl: 'https://safe-transaction-goerli.safe.global' })

                await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })

                web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)

                web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)

                setSafeAuth(web3AuthModalPack)

            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        if (!safeAuth) {
            console.log("safeAuth not initialized yet");
            return;
        }
        const signInInfo = await safeAuth.signIn();
        const userInfo = await safeAuth.getUserInfo();

        setSafeAuthSignInResponse(signInInfo)
        setUserInfo(userInfo || undefined)
        setProvider(safeAuth.getProvider() as SafeEventEmitterProvider)
    };

    const logout = async () => {
        if (!safeAuth) {
            console.log("safeAuth not initialized yet")
            return;
        }
        await safeAuth.signOut();
        setProvider(null)
        setSafeAuthSignInResponse(null)
    };

    const value = {
        provider,
        safeAuthSignInResponse,
        userInfo,
        login,
        logout
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}