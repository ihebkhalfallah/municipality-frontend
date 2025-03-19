import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';

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

const DemandeTypesChart = ({ stats }: StatsProps) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar' as const,
      stacked: true,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main],
    xaxis: {
      categories: ['Demande', 'Contestation', 'Proposition'],
    },
    legend: {
      position: 'bottom',
    },
  };

  const series = [
    {
      name: 'Accepted',
      data: [
        stats?.demandeCounts?.demande?.accepted || 0,
        stats?.demandeCounts?.contestation?.accepted || 0,
        stats?.demandeCounts?.proposition?.accepted || 0,
      ],
    },
    {
      name: 'Pending',
      data: [
        stats?.demandeCounts?.demande?.pending || 0,
        stats?.demandeCounts?.contestation?.pending || 0,
        stats?.demandeCounts?.proposition?.pending || 0,
      ],
    },
    {
      name: 'Rejected',
      data: [
        stats?.demandeCounts?.demande?.rejected || 0,
        stats?.demandeCounts?.contestation?.rejected || 0,
        stats?.demandeCounts?.proposition?.rejected || 0,
      ],
    },
  ];

  return (
    <DashboardCard title="Demande Types Distribution">
      <Chart options={chartOptions} series={series} type="bar" height="400px" />
    </DashboardCard>
  );
};

export default DemandeTypesChart;
