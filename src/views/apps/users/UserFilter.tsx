import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';
import { USER_ROLE } from './UserView';

interface UserFilterProps {
  onFilter: (filters: any) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const customizer = useSelector((state: AppState) => state.customizer);
  const direction = customizer.isLanguage === 'ar' ? 'rtl' : 'ltr';
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
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
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    });
    onFilter({});
  };

  return (
    <Box mb={3} dir={direction}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label={t('First Name')}
          name="firstName"
          value={filters.firstName}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label={t('Last Name')}
          name="lastName"
          value={filters.lastName}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label={t('Email')}
          name="email"
          value={filters.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label={t('Role')}
          name="role"
          value={filters.role}
          onChange={handleChange}
          variant="outlined"
          select
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">{t('All')}</MenuItem>
          {Object.values(USER_ROLE).map((role) => (
            <MenuItem key={role} value={role}>
              {t(role)}
            </MenuItem>
          ))}
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

export default UserFilter;
