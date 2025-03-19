import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';

export enum EVENT_TYPE {
  EVENT = 'EVENT',
  NEWS = 'NEWS',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

interface EventFilterProps {
  onFilter: (filters: any) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const customizer = useSelector((state: AppState) => state.customizer);
  const direction = customizer.isLanguage === 'ar' ? 'rtl' : 'ltr';

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    type: '',
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
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({
      name: '',
      status: '',
      type: '',
      createdByUserId: '',
    });
    onFilter({});
  };

  return (
    <Box
      mb={3}
      dir={direction}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 3,
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <TextField
          label={t('Name')}
          name="name"
          value={filters.name}
          onChange={handleChange}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.default',
            },
          }}
        />
        <TextField
          label={t('Status')}
          name="status"
          value={filters.status}
          onChange={handleChange}
          variant="outlined"
          select
          size="small"
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.default',
            },
          }}
        >
          <MenuItem value="">{t('All')}</MenuItem>
          <MenuItem value="PENDING">{t('Pending')}</MenuItem>
          <MenuItem value="ACCEPTED">{t('Accepted')}</MenuItem>
          <MenuItem value="REJECTED">{t('Rejected')}</MenuItem>
        </TextField>
        <TextField
          label={t('Type')}
          name="type"
          value={filters.type}
          onChange={handleChange}
          variant="outlined"
          select
          size="small"
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.default',
            },
          }}
        >
          <MenuItem value="">{t('All')}</MenuItem>
          <MenuItem value={EVENT_TYPE.EVENT}>{t('Event')}</MenuItem>
          <MenuItem value={EVENT_TYPE.NEWS}>{t('News')}</MenuItem>
          <MenuItem value={EVENT_TYPE.ANNOUNCEMENT}>{t('Announcement')}</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
            py: 1,
            fontWeight: 600,
          }}
        >
          {t('Filter')}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
            py: 1,
            fontWeight: 600,
          }}
        >
          {t('Clear')}
        </Button>
      </Stack>
    </Box>
  );
};

export default EventFilter;
