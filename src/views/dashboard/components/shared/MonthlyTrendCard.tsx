import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface MonthlyCount {
  month: string;
  count: string;
}

interface MonthlyTrendProps {
  title: string;
  data: {
    accepted: MonthlyCount[];
    pending: MonthlyCount[];
    rejected: MonthlyCount[];
  };
}

const MonthlyTrendCard = ({ title, data }: MonthlyTrendProps) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const allMonths = [
    ...new Set([
      ...data.accepted.map((d) => d.month),
      ...data.pending.map((d) => d.month),
      ...data.rejected.map((d) => d.month),
    ]),
  ].sort();

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
    colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main],
    xaxis: {
      categories: allMonths,
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value).toString(),
      },
    },
    legend: {
      position: 'bottom',
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: (value) => Math.round(value).toString(),
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: t('Accepted'),
      data: allMonths.map((month) => {
        const entry = data.accepted.find((d) => d.month === month);
        return entry ? parseInt(entry.count) : 0;
      }),
    },
    {
      name: t('Pending'),
      data: allMonths.map((month) => {
        const entry = data.pending.find((d) => d.month === month);
        return entry ? parseInt(entry.count) : 0;
      }),
    },
    {
      name: t('Rejected'),
      data: allMonths.map((month) => {
        const entry = data.rejected.find((d) => d.month === month);
        return entry ? parseInt(entry.count) : 0;
      }),
    },
  ];

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <DashboardCard title={`${t(title)}`}>
        <Chart options={chartOptions} series={series} type="bar" height="300px" />
      </DashboardCard>
    </div>
  );
};

export default MonthlyTrendCard;
