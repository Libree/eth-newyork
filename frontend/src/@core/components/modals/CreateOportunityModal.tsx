import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useGlobalModalsContext } from "../../context/globalModals"

const modalContentStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: 600 }
}

export const CreateOportunityModal = () => {
    const { isCreateOportunityOpen, close } = useGlobalModalsContext();

    const handleSubmitForm = () => {
        close();
    }

    return (
        <>
            <Modal open={isCreateOportunityOpen} onClose={() => close()}>
                <Card sx={modalContentStyle}>
                    <CardContent>
                        <form>
                            <Grid container spacing={7}>

                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label='Name' placeholder='Oportunity name' defaultValue='' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Type</InputLabel>
                                        <Select label='Type' defaultValue='grant'>
                                            <MenuItem value='grant'>Grant</MenuItem>
                                            <MenuItem value='loan'>Loan</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label='Max amount' defaultValue='' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                        <Select label='Curreny' defaultValue='usdc'>
                                            <MenuItem value='usdc'>USDC</MenuItem>
                                            <MenuItem value='dai'>DAI</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Button variant='contained' onClick={handleSubmitForm}>
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
};