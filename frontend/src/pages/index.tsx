import { ElementType } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'


// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useGlobalModalsContext } from 'src/@core/context/globalModals'
import { CreateOportunityModal } from 'src/@core/components/modals/CreateOportunityModal'

// ** Demo Components Imports

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))


const Dashboard = () => {
  const { open } = useGlobalModalsContext();

  const onChange = () => {
  }

  return (
    <ApexChartWrapper>
      <ButtonStyled component='label' variant='contained' onClick={() => open()}>
        Create oportunity
      </ButtonStyled>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={12}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='Small Grants'
                icon={<CurrencyUsd />}
                color='success'
                trendNumber=''
                title='Noun DAO'
                subtitle='Min folllowers 2k Min revenue 100$'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='Small Grants'
                title='Aave grants DAO'
                trend='negative'
                color='secondary'
                trendNumber=''
                subtitle='Min folllowers 2k Min revenue 200$'
                icon={<CurrencyUsd />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CreateOportunityModal />
    </ApexChartWrapper>
  )
}

export default Dashboard
