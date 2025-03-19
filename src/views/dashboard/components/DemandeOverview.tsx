import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface StatsProps {
  stats: {
    demandeCounts: {
      [key: string]: {
        accepted: number;
        pending: number;
        rejected: number;
      };
    };
  } | null;
}

const DemandeOverview = ({ stats }: StatsProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const totalDemandes = Object.entries(stats?.demandeCounts || {}).reduce(
    (acc, [_, values]) => {
      return {
        accepted: acc.accepted + (values.accepted || 0),
        pending: acc.pending + (values.pending || 0),
        rejected: acc.rejected + (values.rejected || 0),
      };
    },
    { accepted: 0, pending: 0, rejected: 0 },
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
    },
    labels: [t('Accepted'), t('Pending'), t('Rejected')],
    colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main],
    legend: {
      position: 'bottom',
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const series = [totalDemandes.accepted, totalDemandes.pending, totalDemandes.rejected];

  return (
    <DashboardCard title={t('Demande Overview') as string}>
      <Chart options={chartOptions} series={series} type="donut" height="300px" />
    </DashboardCard>
  );
};

export default DemandeOverview;
