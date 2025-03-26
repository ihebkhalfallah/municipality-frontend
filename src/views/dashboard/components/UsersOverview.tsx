import React from 'react';
import { Grid } from '@mui/material';
import { IconUsers, IconUserCircle, IconBuildingStore, IconUser } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import { USER_ROLE } from '../../../services/statsService';
import { useTranslation } from 'react-i18next';

interface StatsProps {
  stats: {
    userCount: number;
    userCountsByRole: {
      [key in USER_ROLE]: number;
    };
  } | null;
}

const UsersOverview = ({ stats }: StatsProps) => {
  const { t } = useTranslation();

  const userCards = [
    {
      title: t('Total Users'),
      count: stats?.userCount || 0,
      icon: IconUsers,
      color: 'primary.main',
    },
    {
      title: t('Total Admins'),
      count:
        (stats?.userCountsByRole?.SUPER_ADMIN || 0) +
        (stats?.userCountsByRole?.PERMISSION_ADMIN || 0) +
        (stats?.userCountsByRole?.CONTESTATION_ADMIN || 0) +
        (stats?.userCountsByRole?.DEMANDE_ADMIN || 0),
      icon: IconUserCircle,
      color: 'error.main',
    },
    {
      title: t('Super Admins'),
      count: stats?.userCountsByRole?.SUPER_ADMIN || 0,
      icon: IconUserCircle,
      color: 'error.main',
    },
    {
      title: t('Demande Admins'),
      count: stats?.userCountsByRole?.DEMANDE_ADMIN || 0,
      icon: IconUserCircle,
      color: 'error.main',
    },
    {
      title: t('Contestations Admins'),
      count: stats?.userCountsByRole?.CONTESTATION_ADMIN || 0,
      icon: IconUserCircle,
      color: 'error.main',
    },
    {
      title: t('Permissions Admins'),
      count: stats?.userCountsByRole?.PERMISSION_ADMIN || 0,
      icon: IconUserCircle,
      color: 'error.main',
    },
    {
      title: t('Citizens'),
      count: stats?.userCountsByRole?.CITIZEN || 0,
      icon: IconUser,
      color: 'info.main',
    },
    {
      title: t('Organizations'),
      count:
        (stats?.userCountsByRole?.ORGANIZATION || 0) + (stats?.userCountsByRole?.BUSINESS || 0),
      icon: IconBuildingStore,
      color: 'success.main',
    },
    {
      title: t('Business Accounts'),
      count: stats?.userCountsByRole?.BUSINESS || 0,
      icon: IconBuildingStore,
      color: 'success.main',
    },
  ];

  return (
    <Grid container spacing={3}>
      {userCards.map((card, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <DashboardCard
            title={card.title}
            // subtitle={`Total ${card.title.toLowerCase()}`}
            action={<card.icon width={40} height={40} stroke={1.5} style={{ color: card.color }} />}
          >
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{card.count}</div>
          </DashboardCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersOverview;
