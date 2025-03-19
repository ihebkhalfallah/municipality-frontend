import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Stack, Paper } from '@mui/material';
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
    <Box
      mb={3}
      dir={direction}
      component={Paper}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{
          '& .MuiTextField-root': {
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: 'rgba(0,0,0,0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      >
        <TextField
          label={t('First Name')}
          name="firstName"
          value={filters.firstName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label={t('Last Name')}
          name="lastName"
          value={filters.lastName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label={t('Email')}
          name="email"
          value={filters.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label={t('Role')}
          name="role"
          value={filters.role}
          onChange={handleChange}
          variant="outlined"
          select
          size="small"
          fullWidth
          sx={{ minWidth: { xs: '100%', md: 150 } }}
        >
          <MenuItem value="">{t('All')}</MenuItem>
          {Object.values(USER_ROLE).map((role) => (
            <MenuItem key={role} value={role}>
              {t(role)}
            </MenuItem>
          ))}
        </TextField>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            sx={{
              minWidth: 100,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {t('Filter')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            sx={{
              minWidth: 100,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            {t('Clear')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserFilter;
