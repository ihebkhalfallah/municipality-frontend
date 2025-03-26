import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import UsersOverview from './components/UsersOverview';
import DemandeOverview from './components/DemandeOverview';
import DemandeTypesChart from './components/DemandeTypesChart';
import UserRolesDistribution from './components/UserRolesDistribution';
import EventOverview from './components/EventOverview';
import AuthorizationOverview from './components/AuthorizationOverview';
import MonthlyTrendCard from './components/shared/MonthlyTrendCard';
import { getStats, StatsData } from '../../services/statsService';
import StatsSummaryCard from './components/shared/StatsSummaryCard';
import { useTranslation } from 'react-i18next';

const StatsOverview = () => {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : (t('Failed to fetch stats') as string));
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [t]);

  if (loading) return <Box>{t('Loading...')}</Box>;
  if (error)
    return (
      <Box color="error.main">
        {t('Error')}: {error}
      </Box>
    );

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <PageContainer
        title={t('Dashboard') as string}
        description={t('Statistics Overview') as string}
      >
        <Box>
          <Grid container spacing={3}>
            {/* Summary Stats */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Typography variant="h1">{t('Overview')}</Typography>
              </Box>
            </Grid>
            {/* Requests Stats */}
            <Grid item xs={12}>
              <Typography variant="h4" mb={2}>
                {t('Requests')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsSummaryCard
                title={t('DemandesOnly')}
                data={stats?.demandeCounts.demande || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsSummaryCard
                title={t('Contestations')}
                data={stats?.demandeCounts.contestation || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsSummaryCard
                title={t('Propositions')}
                data={stats?.demandeCounts.proposition || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsSummaryCard
                title={t('Authorizations')}
                data={stats?.authorizationCounts || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>

            {/* Events Stats */}
            <Grid item xs={12}>
              <Typography variant="h4" mb={2}>
                {t('Events & Communications')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsSummaryCard
                title={t('Events')}
                data={stats?.eventCounts.event || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsSummaryCard
                title={t('News')}
                data={stats?.eventCounts.news || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsSummaryCard
                title={t('Announcements')}
                data={stats?.eventCounts.announcement || { accepted: 0, pending: 0, rejected: 0 }}
              />
            </Grid>

            {/* Summary Cards */}
            <Grid item xs={12}>
              <UsersOverview stats={stats} />
            </Grid>

            {/* Distribution Charts */}
            <Grid item xs={12} md={6}>
              <DemandeOverview stats={stats} />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserRolesDistribution stats={stats} />
            </Grid>
            <Grid item xs={12} md={6}>
              <EventOverview stats={stats} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AuthorizationOverview stats={stats} />
            </Grid>

            {/* Monthly Trends */}
            <Grid item xs={12}>
              <Typography variant="h5" mb={2}>
                {t('Monthly Trends')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <MonthlyTrendCard
                title={t('Demandes')}
                data={
                  stats?.demandeCountsByMonth.demande || { accepted: [], pending: [], rejected: [] }
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MonthlyTrendCard
                title={t('Events')}
                data={
                  stats?.eventCountsByMonth.event || { accepted: [], pending: [], rejected: [] }
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MonthlyTrendCard
                title={t('Contestations')}
                data={
                  stats?.demandeCountsByMonth.contestation || {
                    accepted: [],
                    pending: [],
                    rejected: [],
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MonthlyTrendCard
                title={t('Authorizations')}
                data={
                  stats?.authorizationCountsByMonth || { accepted: [], pending: [], rejected: [] }
                }
              />
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </div>
  );
};

export default StatsOverview;
