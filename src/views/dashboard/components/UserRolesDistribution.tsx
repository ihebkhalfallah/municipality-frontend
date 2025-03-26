import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { USER_ROLE } from '../../../services/statsService';
import { useTranslation } from 'react-i18next';

interface StatsProps {
  stats: {
    userCountsByRole: {
      [key in USER_ROLE]: number;
    };
  } | null;
}

const UserRolesDistribution = ({ stats }: StatsProps) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
    },
    labels: [
      t('Super Admin'),
      t('Permission Admin'),
      t('Contestation Admin'),
      t('Demande Admin'),
      t('Citizens'),
      t('Organizations'),
      t('Business Accounts'),
    ],
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.grey[500],
    ],
    legend: {
      position: 'bottom',
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const series = [
    stats?.userCountsByRole?.SUPER_ADMIN || 0,
    stats?.userCountsByRole?.PERMISSION_ADMIN || 0,
    stats?.userCountsByRole?.CONTESTATION_ADMIN || 0,
    stats?.userCountsByRole?.DEMANDE_ADMIN || 0,
    stats?.userCountsByRole?.CITIZEN || 0,
    stats?.userCountsByRole?.ORGANIZATION || 0,
    stats?.userCountsByRole?.BUSINESS || 0,
  ];

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <DashboardCard title={t('User Roles Distribution') as string}>
        <Chart options={chartOptions} series={series} type="pie" height="300px" />
      </DashboardCard>
    </div>
  );
};

export default UserRolesDistribution;
