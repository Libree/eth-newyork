// ** React Imports
import { ElementType, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { Button, ButtonProps, Grid } from '@mui/material'
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
