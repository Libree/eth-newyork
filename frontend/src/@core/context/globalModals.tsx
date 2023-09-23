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
    open: (arg?: MenuTypes) => void;
    close: (arg?: MenuTypes) => void;
};

export type MenuTypes = "createOportunity";

type Props = Record<"children", ReactNode>;

const GlobalModalsProvider: FC<Props> = ({ children }) => {
    const [isCreateOportunityOpen, setIsCreateOportunityOpen] =
        useState<GlobalModalsContextType["isCreateOportunityOpen"]>(false);

    const open = (type?: MenuTypes) => {
        switch (type) {
            default:
                setIsCreateOportunityOpen(true);
                break;
        }
    };

    const close = (type?: MenuTypes) => {
        switch (type) {
            default:
                setIsCreateOportunityOpen(false);
                break;
        }
    };

    const value = useMemo(
        (): GlobalModalsContextType => ({
            isCreateOportunityOpen,
            open,
            close,
        }),
        [isCreateOportunityOpen]
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
