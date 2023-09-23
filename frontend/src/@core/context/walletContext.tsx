// ** React Imports
import { createContext, useState, ReactNode, useEffect, FC } from 'react'

// ** Web3Auth Imports 
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";

// ** Adapters
import {
    getWalletConnectV2Settings,
    WalletConnectV2Adapter,
} from "@web3auth/wallet-connect-v2-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

export type WalletContextType = {
    web3auth: Web3Auth | null;
    provider: IProvider | null;
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
}

// ** Create Context
export const WalletContext = createContext<WalletContextType>({} as WalletContextType);

const CLIENT_ID = "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

type Props = Record<"children", ReactNode>;

export const WalletProvider: FC<Props> = ({ children }) => {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    
    
    useEffect(() => {
        async function init() {
            try {
                const web3auth = new Web3Auth({
                    clientId: CLIENT_ID,
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x1",
                        rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                    },
                    // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
                    // Please remove this parameter if you're on the Base Plan
                    uiConfig: {
                        appName: "Web3Auth Demo",
                        mode: "light",
                        // loginMethodsOrder: ["apple", "google", "twitter"],
                        logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
                        logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
                        defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
                        loginGridCol: 3,
                        primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
                    },
                    web3AuthNetwork: "cyan",
                });
    
                // plugins and adapters are optional and can be added as per your requirement
                // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/
    
                // adding wallet connect v2 adapter
                const defaultWcSettings = await getWalletConnectV2Settings(
                    "eip155",
                    [1],
                    "04309ed1007e77d1f119b85205bb779d"
                );
                const walletConnectV2Adapter = new WalletConnectV2Adapter({
                    adapterSettings: { ...defaultWcSettings.adapterSettings },
                    loginSettings: { ...defaultWcSettings.loginSettings },
                });
    
                web3auth.configureAdapter(walletConnectV2Adapter);
    
                // adding metamask adapter
                const metamaskAdapter = new MetamaskAdapter({
                    clientId: CLIENT_ID,
                    sessionTime: 3600, // 1 hour in seconds
                    web3AuthNetwork: "cyan",
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x1",
                        rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                    },
                });
                // we can change the above settings using this function
                metamaskAdapter.setAdapterSettings({
                    sessionTime: 86400, // 1 day in seconds
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x89",
                        rpcTarget: "https://rpc-mainnet.matic.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                    },
                    web3AuthNetwork: "cyan",
                });
    
                // it will add/update  the metamask adapter in to web3auth class
                web3auth.configureAdapter(metamaskAdapter);
    
                setWeb3auth(web3auth);
    
                // await web3auth.initModal(); // -> its broking the app
                setProvider(web3auth.provider);
    
                if (web3auth.connected) {
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        try {
            if (!web3auth) return;
            await web3auth.initModal(); // -> this line brokes the app
            const web3authProvider = await web3auth.connect();
            setProvider(web3authProvider);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            if (!web3auth) return;
            await web3auth.logout();
            setProvider(null);
            setLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    };

    const value = {
        web3auth,
        provider,
        loggedIn,
        login,
        logout,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}
