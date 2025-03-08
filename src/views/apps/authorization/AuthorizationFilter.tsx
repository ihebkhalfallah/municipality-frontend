import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface AuthorizationFilterProps {
  onFilter: (filters: any) => void;
}

const AuthorizationFilter: React.FC<AuthorizationFilterProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    createdByUserId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value),
    );

    onFilter(nonEmptyFilters);
  };

  const handleClear = () => {
    setFilters({
      name: '',
      status: '',
      createdByUserId: '',
    });
    onFilter({});
  };

  return (
    <Box mb={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label={t('Name')}
          name="name"
          value={filters.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label={t('Status')}
          name="status"
          value={filters.status}
          onChange={handleChange}
          variant="outlined"
          select
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">{t('All')}</MenuItem>
          <MenuItem value="PENDING">{t('Pending')}</MenuItem>
          <MenuItem value="ACCEPTED">{t('Accepted')}</MenuItem>
          <MenuItem value="REJECTED">{t('Rejected')}</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          {t('Filter')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          {t('Clear')}
        </Button>
      </Stack>
    </Box>
  );
};

export default AuthorizationFilter;
