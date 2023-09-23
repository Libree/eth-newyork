import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

const GlobalModalsContext = createContext<GlobalModalsContextType>(
    {} as GlobalModalsContextType
);

type GlobalModalsContextType = {
    isCreateOportunityOpen: boolean;
    isCreateCredentialOpen: boolean;
    isShowQROpen: boolean;
    open: (arg?: MenuTypes) => void;
    close: (arg?: MenuTypes) => void;
};

export type MenuTypes = "createOportunity" | "showQR" | "createCredential";

type Props = Record<"children", ReactNode>;

const GlobalModalsProvider: FC<Props> = ({ children }) => {
    const [isCreateOportunityOpen, setIsCreateOportunityOpen] =
        useState<GlobalModalsContextType["isCreateOportunityOpen"]>(false);
    const [isShowQROpen, setIsShowQROpen] =
        useState<GlobalModalsContextType["isShowQROpen"]>(false);
    const [isCreateCredentialOpen, setIsCreateCredentialOpen] =
        useState<GlobalModalsContextType["isCreateCredentialOpen"]>(false);

    const open = (type?: MenuTypes) => {
        switch (type) {
            case "showQR":
                setIsShowQROpen(true);
                break;
            case "createCredential":
                setIsCreateCredentialOpen(true);
                break;
            default:
                setIsCreateOportunityOpen(true);
                break;
        }
    };

    const close = (type?: MenuTypes) => {
        switch (type) {
            case "showQR":
                setIsShowQROpen(false);
                break;
            case "createCredential":
                setIsCreateCredentialOpen(false);
                break;
            default:
                setIsCreateOportunityOpen(false);
                break;
        }
    };

    const value = useMemo(
        (): GlobalModalsContextType => ({
            isCreateOportunityOpen,
            isShowQROpen,
            isCreateCredentialOpen,
            open,
            close,
        }),
        [isCreateOportunityOpen, isShowQROpen, isCreateCredentialOpen]
    );

    return (
        <GlobalModalsContext.Provider value={value}>
            {children}
        </GlobalModalsContext.Provider>
    );
};

function useGlobalModalsContext(): GlobalModalsContextType {
    return useContext(GlobalModalsContext) as GlobalModalsContextType;
}

export { useGlobalModalsContext, GlobalModalsProvider };
