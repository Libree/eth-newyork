// ** React Imports
import { useState } from "react";

// ** MUI Imports
import {
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
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

export const CreateOportunityModal = () => {
    const { isCreateOportunityOpen, close } = useGlobalModalsContext();
    const [input, setInput] = useState<{
        name: string;
        type: string;
        maxAmount: string;
        currency: string;
    }>({
        name: '',
        type: '',
        maxAmount: '',
        currency: '',
    });

    const handleChangeInput = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = () => {
        console.log('input: ', input)
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
                                    <TextField
                                        fullWidth
                                        label='Name'
                                        placeholder='Oportunity name'
                                        defaultValue=''
                                        name="name"
                                        value={input?.name}
                                        onChange={handleChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Type</InputLabel>
                                        <Select
                                            label='Type'
                                            defaultValue='grant'
                                            name="type"
                                            value={input?.type}
                                            onChange={handleChangeInput}
                                        >
                                            <MenuItem value='grant'>Grant</MenuItem>
                                            <MenuItem value='loan'>Loan</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Max amount'
                                        defaultValue=''
                                        name="maxAmount"
                                        value={input?.maxAmount}
                                        onChange={handleChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                        <Select
                                            label='Curreny'
                                            defaultValue='usdc'
                                            name="currency"
                                            value={input?.currency}
                                            onChange={handleChangeInput}
                                        >
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