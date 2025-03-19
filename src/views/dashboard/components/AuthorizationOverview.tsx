import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface AuthStats {
  authorizationCounts: {
    accepted: number;
    pending: number;
    rejected: number;
  };
}

const AuthorizationOverview = ({ stats }: { stats: AuthStats | null }) => {
  const { t } = useTranslation();
  const theme = useTheme();

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
  };

  const series = [
    stats?.authorizationCounts.accepted || 0,
    stats?.authorizationCounts.pending || 0,
    stats?.authorizationCounts.rejected || 0,
  ];

  return (
    <DashboardCard title={t('Authorization Status') as string}>
      <Chart options={chartOptions} series={series} type="donut" height="300px" />
    </DashboardCard>
  );
};

export default AuthorizationOverview;
