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

const currencyOptions = [
    { value: 'usdc', label: 'USDC' },
    { value: 'dai', label: 'DAI' },
];

const typeOptions = [
    { value: 'grant', label: 'Grant' },
    { value: 'loan', label: 'Loan' },
];

export const CreateOportunityModal = () => {
    const { isCreateOportunityOpen, close } = useGlobalModalsContext();
    const [input, setInput] = useState<{
        name: string;
        type: string;
        maxAmount: string;
        currency: string;
        minRevenue: string;
        minFollowers: string
    }>({
        name: '',
        type: '',
        maxAmount: '',
        currency: '',
        minRevenue: '',
        minFollowers: ''
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
                                            {typeOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
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
                                            {currencyOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Min followers'
                                        defaultValue=''
                                        name="minFollowers"
                                        value={input?.minFollowers}
                                        onChange={handleChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Min Revenue'
                                        defaultValue=''
                                        name="minRevenue"
                                        value={input?.minRevenue}
                                        onChange={handleChangeInput}
                                    />
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