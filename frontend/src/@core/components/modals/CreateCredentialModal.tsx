// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Modal,
    TextField,
} from "@mui/material";

// ** Modal Context
import { useGlobalModalsContext } from "../../context/globalModals"

const modalContentStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: 600 }
}

export const CreateCredentialModal = () => {
    const { isCreateCredentialOpen, close } = useGlobalModalsContext();
    const [data, setData] = useState<{
        subscribers: number;
        revenue: string;
    }>({
        subscribers: 0,
        revenue: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        setData({
            subscribers: 1000,
            revenue: '1000'
        })

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [isCreateCredentialOpen])

    const handleSubmitForm = async () => {
        setSending(true);

        setTimeout(() => {
            setSending(false);
            window.open(
                'https://user-ui:password-ui@issuer-ui.polygonid.me/credentials/scan-link/11c29a14-a966-4c7b-8225-c823c08575cd',
                '_blank',
            )
            close("createCredential");
        }, 2500);
    }

    return (
        <>
            <Modal open={isCreateCredentialOpen} onClose={() => close("createCredential")}>
                <Card sx={modalContentStyle}>
                    {loading ? (
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress />
                        </CardContent>
                    ) : (
                        <CardContent>
                            <form>
                                <Grid container spacing={7}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label='Name'
                                            placeholder='Oportunity name'
                                            name="subscribers"
                                            value={data?.subscribers}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label='Revenue'
                                            name="revenue"
                                            value={data?.revenue}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Button variant='contained' onClick={handleSubmitForm}>
                                            {sending ? (
                                                <CircularProgress color="secondary" />
                                            ) : 'Issue'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    )}
                </Card>
            </Modal>
        </>
    );
};