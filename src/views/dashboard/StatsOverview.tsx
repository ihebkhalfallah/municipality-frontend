import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PageContainer from 'src/components/container/PageContainer';
import UsersOverview from './components/UsersOverview';
import DemandeOverview from './components/DemandeOverview';
import UserRolesDistribution from './components/UserRolesDistribution';
import EventOverview from './components/EventOverview';
import AuthorizationOverview from './components/AuthorizationOverview';
import MonthlyTrendCard from './components/shared/MonthlyTrendCard';
import { getStats, StatsData } from '../../services/statsService';
import MonthlyDemandeOverview from './components/shared/MonthlyDemandeOverview';

const StatsOverview = () => {
  const { t } = useTranslation();
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
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box color="error.main">Error: {error}</Box>;

  return (
    <PageContainer title="Dashboard" description="Statistics Overview">
      <Box>
        <Grid container spacing={3}>
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

          {/* Combined Demande Overview */}
          <Grid item xs={12}>
            <MonthlyDemandeOverview
              data={{
                demandes: stats?.demandeCountsByMonth.demande || {
                  accepted: [],
                  pending: [],
                  rejected: [],
                },
                contestations: stats?.demandeCountsByMonth.contestation || {
                  accepted: [],
                  pending: [],
                  rejected: [],
                },
                propositions: stats?.demandeCountsByMonth.proposition || {
                  accepted: [],
                  pending: [],
                  rejected: [],
                },
              }}
            />
          </Grid>

          {/* Individual Monthly Trends */}
          <Grid item xs={12} md={6}>
            <MonthlyTrendCard
              title="Demandes"
              data={
                stats?.demandeCountsByMonth.demande || { accepted: [], pending: [], rejected: [] }
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MonthlyTrendCard
              title="Events"
              data={stats?.eventCountsByMonth.event || { accepted: [], pending: [], rejected: [] }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MonthlyTrendCard
              title="News"
              data={stats?.eventCountsByMonth.news || { accepted: [], pending: [], rejected: [] }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MonthlyTrendCard
              title="Announcements"
              data={
                stats?.eventCountsByMonth.announcement || {
                  accepted: [],
                  pending: [],
                  rejected: [],
                }
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MonthlyTrendCard
              title="Contestations"
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
              title="Propositions"
              data={
                stats?.demandeCountsByMonth.proposition || {
                  accepted: [],
                  pending: [],
                  rejected: [],
                }
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MonthlyTrendCard
              title="Authorizations"
              data={
                stats?.authorizationCountsByMonth || { accepted: [], pending: [], rejected: [] }
              }
            />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default StatsOverview;
