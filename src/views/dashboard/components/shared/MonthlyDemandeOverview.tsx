import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyData {
  month: string;
  count: string;
}

interface StatusData {
  accepted: MonthlyData[];
  pending: MonthlyData[];
  rejected: MonthlyData[];
}

interface MonthlyDemandeOverviewProps {
  data: {
    demandes: StatusData;
    contestations: StatusData;
    propositions: StatusData;
  };
}

const MonthlyDemandeOverview: React.FC<MonthlyDemandeOverviewProps> = ({ data }) => {
  const { t } = useTranslation();

  const allMonths = new Set<string>();
  Object.values(data).forEach((type: StatusData) => {
    Object.values(type).forEach((status: MonthlyData[]) => {
      status.forEach((item: MonthlyData) => allMonths.add(item.month));
    });
  });

  const months = Array.from(allMonths).sort();

  const chartData = {
    labels: months,
    datasets: [
      {
        label: t('Demande') as string,
        data: months.map((month) => {
          const monthData = data.demandes.pending.find((d) => d.month === month);
          return monthData ? parseInt(monthData.count) : 0;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
      },
      {
        label: t('Contestation') as string,
        data: months.map((month) => {
          const monthData = data.contestations.pending.find((d) => d.month === month);
          return monthData ? parseInt(monthData.count) : 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: t('Proposition') as string,
        data: months.map((month) => {
          const monthData = data.propositions.pending.find((d) => d.month === month);
          return monthData ? parseInt(monthData.count) : 0;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: t('Monthly Demande Overview') as string,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: t('Count') as string,
        },
      },
      x: {
        title: {
          display: true,
          text: t('Month') as string,
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('Monthly Demande Overview')}
        </Typography>
        <Box height={300}>
          <Bar options={options} data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyDemandeOverview;
