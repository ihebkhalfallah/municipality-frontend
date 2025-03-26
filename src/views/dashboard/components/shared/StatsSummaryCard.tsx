import { Box, Card, Typography, Stack } from '@mui/material';

interface CountData {
  accepted: number;
  pending: number;
  rejected: number;
}

interface StatsSummaryCardProps {
  title: string;
  data: CountData;
}

const StatsSummaryCard = ({ title, data }: StatsSummaryCardProps) => {
  const total = data.accepted + data.pending + data.rejected;

  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <Stack spacing={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Total
          </Typography>
          <Typography variant="h6">{total}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="success.main">
            Accepted
          </Typography>
          <Typography variant="body1">{data.accepted}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="warning.main">
            Pending
          </Typography>
          <Typography variant="body1">{data.pending}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="error.main">
            Rejected
          </Typography>
          <Typography variant="body1">{data.rejected}</Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default StatsSummaryCard;
