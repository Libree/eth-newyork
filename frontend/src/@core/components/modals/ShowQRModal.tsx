// ** MUI Imports
import {
    Card,
    CardContent,
    Modal,
} from "@mui/material";

// ** Modal Context
import { useGlobalModalsContext } from "../../context/globalModals";

import { QRCodeSVG } from 'qrcode.react';

const modalContentStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

export const ShowQRModal = () => {
    const { isShowQROpen, close } = useGlobalModalsContext();

    return (
        <>
            <Modal open={isShowQROpen} onClose={() => close("showQR")}>
                <Card sx={modalContentStyle}>
                    <CardContent>
                        <QRCodeSVG
                            value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            imageSettings={{
                                src: "https://static.zpao.com/favicon.png",
                                x: undefined,
                                y: undefined,
                                height: 24,
                                width: 24,
                                excavate: true,
                            }}
                        />
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
};
