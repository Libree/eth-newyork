// ** MUI Imports
import {
    Card,
    CardContent,
    Modal,
} from "@mui/material";

// ** Modal Context
import { useGlobalModalsContext } from "../../context/globalModals";

import {QRCodeCanvas} from 'qrcode.react';

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
                        <QRCodeCanvas
                            value={'{"id":"a1862e84-3493-487f-827b-0db11b2ee35b","typ":"application/iden3comm-plain-json","type":"https://iden3-communication.io/authorization/1.0/request","thid":"a1862e84-3493-487f-827b-0db11b2ee35b","body":{"callbackUrl":"https://self-hosted-demo-backend-platform.polygonid.me/api/callback?sessionId=134636","reason":"test flow","scope":[{"id":1,"circuitId":"credentialAtomicQuerySigV2","query":{"allowedIssuers":["*"],"context":"https://dants.xyz/","credentialSubject":{"followers":{"$gt":1}},"type":"ProofOfInfluencer"}}]},"from":"did:polygonid:polygon:mumbai:2qLhNLVmoQS7pQtpMeKHDqkTcENBZUj1nkZiRNPGgV"}'}
                            size={180}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                        />
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
};
