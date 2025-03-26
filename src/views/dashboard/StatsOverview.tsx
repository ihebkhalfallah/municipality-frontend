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

const StatsOverview = () => {
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
          {/* Summary Stats */}
          <Grid item xs={12}>
            <Typography variant="h5" mb={2}>
              Overview
            </Typography>
          </Grid>
          {/* Requests Stats */}
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>
              Requests
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsSummaryCard
              title="Demandes"
              data={stats?.demandeCounts.demande || { accepted: 0, pending: 0, rejected: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsSummaryCard
              title="Contestations"
              data={stats?.demandeCounts.contestation || { accepted: 0, pending: 0, rejected: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsSummaryCard
              title="Propositions"
              data={stats?.demandeCounts.proposition || { accepted: 0, pending: 0, rejected: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsSummaryCard
              title="Authorizations"
              data={stats?.authorizationCounts || { accepted: 0, pending: 0, rejected: 0 }}
            />
          </Grid>

          {/* Events Stats */}
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>
              Events & Communications
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsSummaryCard
              title="Events"
              data={stats?.eventCounts.event || { accepted: 0, pending: 0, rejected: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsSummaryCard
              title="News"
              data={stats?.eventCounts.news || { accepted: 0, pending: 0, rejected: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsSummaryCard
              title="Announcements"
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
              Monthly Trends
            </Typography>
          </Grid>
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
