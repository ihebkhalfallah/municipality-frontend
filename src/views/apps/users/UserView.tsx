import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Box,
  Stack,
  Tooltip,
  Card,
  CardContent,
  Divider,
  Alert,
  Snackbar,
  createTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';
import { lockUser, unlockUser, getUsers, updateUser } from 'src/services/userService';
import UserFilter from './UserFilter';

export enum USER_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PERMISSION_ADMIN = 'PERMISSION_ADMIN',
  CONTESTATION_ADMIN = 'CONTESTATION_ADMIN',
  DEMANDE_ADMIN = 'DEMANDE_ADMIN',
  CITIZEN = 'CITIZEN',
  ORGANIZATION = 'ORGANIZATION',
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: USER_ROLE;
  birthDate: string;
  phoneNumber: string;
  cin: string;
  idAssociation: string;
  job: string;
  profile_photo: string;
  locked: boolean;
}

const UserView = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);
  const customizer = useSelector((state: AppState) => state.customizer);
  const direction = customizer.isLanguage === 'ar' ? 'rtl' : 'ltr';

  const fetchUsers = useCallback(
    async (filters = {}) => {
      try {
        const response = await getUsers(page + 1, rowsPerPage, filters);
        setUsers(response.data);
        setTotalUsers(response.total);
      } catch (error) {
        console.error('Error fetching users:', error);
        setAlert({ message: t('ErrorFetchingUsers'), severity: 'error' });
      }
    },
    [page, rowsPerPage],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleLockUser = async (id: number) => {
    try {
      await lockUser(id);
      fetchUsers();
      setAlert({ message: t('UserLockedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error locking user:', error);
      setAlert({ message: t('ErrorLockingUser'), severity: 'error' });
    }
  };

  const handleUnlockUser = async (id: number) => {
    try {
      await unlockUser(id);
      fetchUsers();
      setAlert({ message: t('UserUnlockedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error unlocking user:', error);
      setAlert({ message: t('ErrorUnlockingUser'), severity: 'error' });
    }
  };

  const handleUpdateUser = async (id: number, data: Partial<User>) => {
    try {
      await updateUser(id, data);
      fetchUsers();
      setAlert({ message: t('UserUpdatedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error updating user:', error);
      setAlert({ message: t('ErrorUpdatingUser'), severity: 'error' });
    }
  };

  const handleFilter = (filters: any) => {
    fetchUsers(filters);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom dir={direction}>
        {t('Users')}
      </Typography>
      <UserFilter onFilter={handleFilter} />
      <TableContainer component={Paper}>
        <Table dir={direction}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('First Name')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Last Name')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Email')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Role')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={t('View User')}>
                      <IconButton onClick={() => handleViewUser(user)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    {user.locked ? (
                      <Tooltip title={t('Unlock User')}>
                        <IconButton onClick={() => handleUnlockUser(user.id)}>
                          <LockOpenIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title={t('Lock User')}>
                        <IconButton onClick={() => handleLockUser(user.id)}>
                          <LockIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('rows per page')}
          labelDisplayedRows={({ from, to, count }) => {
            if (direction === 'rtl') {
              return ` ${count !== -1 ? count : `${t('more than')} ${to}`} ${t(
                'of',
              )} ${to}-${from}`;
            } else {
              return `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('more than')} ${to}`}`;
            }
          }}
          dir={direction}
          sx={{
            '& .MuiTablePagination-actions': {
              flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
            },
            '& .MuiTablePagination-actions .MuiIconButton-root': {
              transform: direction === 'rtl' ? 'scaleX(-1)' : 'none',
            },
          }}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ zIndex: 1300 }}>
        <DialogTitle sx={{ fontWeight: 600 }}>{t('User Details')}</DialogTitle>
        <DialogContent sx={{ zIndex: 1300 }}>
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
                severity={alert.severity}
                sx={{ width: '100%', zIndex: 9999 }}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          )}

          <Card variant="outlined" sx={{ p: 2, mb: 2, zIndex: 1300 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Email')}:</strong> {selectedUser?.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Role')}:</strong> {selectedUser?.role}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Birth Date')}:</strong>{' '}
                {new Date(selectedUser?.birthDate || '').toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Phone Number')}:</strong> {selectedUser?.phoneNumber}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('CIN')}:</strong> {selectedUser?.cin}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('ID Association')}:</strong> {selectedUser?.idAssociation}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Job')}:</strong> {selectedUser?.job}
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            {t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
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
            severity={alert.severity}
            sx={{ width: '100%', zIndex: 9999 }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UserView;
