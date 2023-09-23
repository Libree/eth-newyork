// ** React Imports
import { ElementType } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import { Button, ButtonProps, Grid } from '@mui/material'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useGlobalModalsContext } from 'src/@core/context/globalModals'
import { CreateCredentialModal } from 'src/@core/components/modals/CreateCredentialModal'

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const Credentials = () => {
  const { open } = useGlobalModalsContext();

  return (
    <ApexChartWrapper>
      <ButtonStyled component='label' variant='contained' onClick={() => open("createCredential")}>
        Create credential
      </ButtonStyled>
      <Grid container spacing={6}>
      </Grid>

      <CreateCredentialModal />
    </ApexChartWrapper>
  )
}

export default Credentials
