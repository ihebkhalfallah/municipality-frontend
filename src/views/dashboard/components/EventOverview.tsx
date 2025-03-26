import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface EventStats {
  eventCounts: {
    event: { accepted: number; pending: number; rejected: number };
    news: { accepted: number; pending: number; rejected: number };
    announcement: { accepted: number; pending: number; rejected: number };
  };
}

const EventOverview = ({ stats }: { stats: EventStats | null }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar' as const,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main],
    xaxis: {
      categories: [t('Event'), t('News'), t('Announcement')],
    },
    legend: {
      position: 'bottom',
    },
  };

  const series = [
    {
      name: t('Accepted'),
      data: [
        stats?.eventCounts.event.accepted || 0,
        stats?.eventCounts.news.accepted || 0,
        stats?.eventCounts.announcement.accepted || 0,
      ],
    },
    {
      name: t('Pending'),
      data: [
        stats?.eventCounts.event.pending || 0,
        stats?.eventCounts.news.pending || 0,
        stats?.eventCounts.announcement.pending || 0,
      ],
    },
    {
      name: t('Rejected'),
      data: [
        stats?.eventCounts.event.rejected || 0,
        stats?.eventCounts.news.rejected || 0,
        stats?.eventCounts.announcement.rejected || 0,
      ],
    },
  ];

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <DashboardCard title={t('Events Overview') as string}>
        <Chart options={chartOptions} series={series} type="bar" height="300px" />
      </DashboardCard>
    </div>
  );
};

export default EventOverview;
