import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Box, Alert, Snackbar } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { getCurrentUser } from 'src/services/authService';
import { updateUser } from 'src/services/userService';
import Cookies from 'js-cookie';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDate: string;
  phoneNumber: string;
  cin: string | null;
  idAssociation: number | null;
  job: string;
  profile_photo: string;
  locked: boolean;
  createdAt: string;
}

const UserProfile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    phoneNumber: '',
    job: '',
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setFormData({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            birthDate: currentUser.birthDate,
            phoneNumber: currentUser.phoneNumber,
            job: currentUser.job,
          });
        } else {
          console.error('No user is currently logged in.');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({ ...prevData, birthDate: date }));
  };

  const handleSave = async () => {
    if (user) {
      try {
        // Format the birthDate to YYYY-MM-DD
        const formattedData = {
          ...formData,
          birthDate: formData.birthDate ? format(new Date(formData.birthDate), 'yyyy-MM-dd') : null,
        };

        const updatedData = Object.keys(formattedData).reduce((acc: Partial<User>, key) => {
          const typedKey = key as keyof typeof formattedData;
          if (formattedData[typedKey] !== user[typedKey]) {
            if (formattedData[typedKey] !== null) {
              acc[typedKey] = formattedData[typedKey] as string;
            }
          }
          return acc;
        }, {} as Partial<User>);

        const updatedUser = await updateUser(user.id, updatedData);
        setUser(updatedUser);
        Cookies.set('user', JSON.stringify(updatedUser));
        setEditMode(false);
        setAlert({ type: 'success', message: 'User updated successfully' });
      } catch (error) {
        console.error('Failed to update user:', error);
        setAlert({ type: 'error', message: 'Error updating user' });
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageContainer
        title={t('User Profile') as string}
        description={t('this is User Profile page') as string}
      >
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <h2>{t('User Profile')}</h2>
              <Button variant="contained" color="primary" onClick={() => setEditMode(!editMode)}>
                {editMode ? t('Cancel') : t('Edit')}
              </Button>
            </Box>
          </Grid>
          <Grid item sm={12} lg={6}>
            {alert && (
              <Snackbar
                open
                autoHideDuration={6000}
                onClose={() => setAlert(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ zIndex: 9999 }}
              >
                <Alert
                  variant="filled"
                  onClose={() => setAlert(null)}
                  // severity={alert.severity}
                  sx={{ width: '100%', zIndex: 9999 }}
                >
                  {alert.message}
                </Alert>
              </Snackbar>
            )}
            <TextField
              label={t('First Name')}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
            <TextField
              label={t('Last Name')}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
            <TextField
              label={t('Email')}
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
            <DatePicker
              label={t('Birth Date')}
              value={formData.birthDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" disabled={!editMode} />
              )}
            />
            <TextField
              label={t('Phone Number')}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
            {user?.idAssociation && (
              <TextField
                label={t('Association ID')}
                name="idAssociation"
                value={user.idAssociation.toString()}
                fullWidth
                margin="normal"
                disabled
              />
            )}
            <TextField
              label={t('Job')}
              name="job"
              value={formData.job}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
            {user?.cin && (
              <TextField
                label={t('CIN')}
                name="cin"
                value={user.cin}
                fullWidth
                margin="normal"
                disabled
              />
            )}
            {editMode && (
              <Button variant="contained" color="primary" onClick={handleSave}>
                {t('Save')}
              </Button>
            )}
          </Grid>
        </Grid>
      </PageContainer>
    </LocalizationProvider>
  );
};

export default UserProfile;
