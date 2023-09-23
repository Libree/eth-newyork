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
    isShowQROpen: boolean;
    open: (arg?: MenuTypes) => void;
    close: (arg?: MenuTypes) => void;
};

export type MenuTypes = "createOportunity" | "showQR";

type Props = Record<"children", ReactNode>;

const GlobalModalsProvider: FC<Props> = ({ children }) => {
    const [isCreateOportunityOpen, setIsCreateOportunityOpen] =
        useState<GlobalModalsContextType["isCreateOportunityOpen"]>(false);
    const [isShowQROpen, setIsShowQROpen] =
        useState<GlobalModalsContextType["isShowQROpen"]>(false);

    const open = (type?: MenuTypes) => {
        switch (type) {
            case "showQR":
                setIsShowQROpen(true);
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
            default:
                setIsCreateOportunityOpen(false);
                break;
        }
    };

    const value = useMemo(
        (): GlobalModalsContextType => ({
            isCreateOportunityOpen,
            isShowQROpen,
            open,
            close,
        }),
        [isCreateOportunityOpen, isShowQROpen]
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
