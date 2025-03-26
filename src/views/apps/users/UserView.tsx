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
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';
import { lockUser, unlockUser, getUsers, updateUser, createAdmins } from 'src/services/userService';
import UserFilter from './UserFilter';
import TopCards from 'src/components/dashboards/modern/TopCards';
import { TextFieldProps } from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getCurrentUser } from 'src/services/authService';

export enum USER_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PERMISSION_ADMIN = 'PERMISSION_ADMIN',
  CONTESTATION_ADMIN = 'CONTESTATION_ADMIN',
  DEMANDE_ADMIN = 'DEMANDE_ADMIN',
  CITIZEN = 'CITIZEN',
  ORGANIZATION = 'ORGANIZATION',
  BUSINESS = 'BUSINESS',
}
export enum ADMINS_ROLES {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PERMISSION_ADMIN = 'PERMISSION_ADMIN',
  CONTESTATION_ADMIN = 'CONTESTATION_ADMIN',
  DEMANDE_ADMIN = 'DEMANDE_ADMIN',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Add password field
  role: USER_ROLE | ADMINS_ROLES;
  birthDate: string;
  phoneNumber: string;
  cin?: string;
  idAssociation?: string;
  job?: string;
  profile_photo: string;
  locked: boolean;
}

// Update the CurrentUser interface to match the type from getCurrentUser
interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDate: string;
  phoneNumber: string;
  cin?: string;
  idAssociation?: number | null; // Changed from string to number | null
  job?: string;
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

  const [openCreate, setOpenCreate] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: USER_ROLE.CITIZEN,
    birthDate: '',
    phoneNumber: '',
    profile_photo: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        // Cast to unknown first, then to CurrentUser to avoid type mismatch
        setCurrentUser(user as unknown as CurrentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError(e.target.value !== newUser.password);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: USER_ROLE.CITIZEN,
      birthDate: '',
      phoneNumber: '',
      profile_photo: '',
    });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<USER_ROLE | ADMINS_ROLES>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value as USER_ROLE | ADMINS_ROLES });
  };

  const handleDateChange = (date: Date | null) => {
    setNewUser({ ...newUser, birthDate: date ? date.toISOString().split('T')[0] : '' });
  };

  const handleSubmitCreateUser = async () => {
    await handleCreateUser(newUser);
    handleCloseCreate();
  };

  const fetchUsers = useCallback(
    async (filters = {}) => {
      try {
        const response = await getUsers(page + 1, rowsPerPage, filters);
        // Filter out current user from the list
        const filteredUsers = response.data.filter((user: User) => user.id !== currentUser?.id);
        setUsers(filteredUsers);
        // Adjust total count to exclude current user
        setTotalUsers(response.total - (currentUser ? 1 : 0));
      } catch (error) {
        console.error('Error fetching users:', error);
        setAlert({ message: t('ErrorFetchingUsers'), severity: 'error' });
      }
    },
    [page, rowsPerPage, t, currentUser],
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

  const handleCreateUser = async (data: Partial<User>) => {
    try {
      await createAdmins(data);
      fetchUsers();
      setAlert({ message: t('UserCreatedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error creating user:', error);
      setAlert({ message: t('ErrorCreatingUser'), severity: 'error' });
    }
  };

  const handleFilter = (filters: any) => {
    fetchUsers(filters);
  };

  return (
    <Box p={3} dir={direction}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, #f7f7f7 0%, transparent 60%)',
            zIndex: -1,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2,
          }}
          dir={direction}
        >
          {t('Users')}
        </Typography>

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            onClick={handleOpenCreate}
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {t('Create User')}
          </Button>
        </Box>

        <UserFilter onFilter={handleFilter} />

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            '& .MuiTable-root': {
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
            },
          }}
        >
          <Table dir={direction}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('First Name')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Last Name')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Email')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Role')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
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
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#f5f9ff',
                      transform: 'scale(1.01)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
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
                return `${from}-${to} ${t('of')} ${
                  count !== -1 ? count : `${t('more than')} ${to}`
                }`;
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

        <Dialog
          dir={direction}
          open={openCreate}
          onClose={handleCloseCreate}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{t('Create User')}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label={t('First Name')}
              name="firstName"
              fullWidth
              value={newUser.firstName}
              onChange={handleTextFieldChange}
            />
            <TextField
              margin="dense"
              label={t('Last Name')}
              name="lastName"
              fullWidth
              value={newUser.lastName}
              onChange={handleTextFieldChange}
            />
            <TextField
              margin="dense"
              label={t('Email')}
              name="email"
              fullWidth
              value={newUser.email}
              onChange={handleTextFieldChange}
            />
            <TextField
              margin="dense"
              label={t('Password')}
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={newUser.password}
              onChange={handleTextFieldChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="dense"
              label={t('Confirm Password')}
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordError}
              helperText={passwordError ? t('Passwords do not match') : ''}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Select
              margin="dense"
              label={t('Role')}
              name="role"
              fullWidth
              value={newUser.role || ''}
              onChange={handleSelectChange}
            >
              {Object.values(ADMINS_ROLES).map((role) => (
                <MenuItem key={role} value={role}>
                  {t(role)}
                </MenuItem>
              ))}
            </Select>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={t('Birth Date')}
                value={newUser.birthDate ? new Date(newUser.birthDate) : null}
                onChange={handleDateChange}
                maxDate={new Date()}
                renderInput={(params: TextFieldProps) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              label={t('Phone Number')}
              name="phoneNumber"
              fullWidth
              value={newUser.phoneNumber}
              onChange={handleTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate} color="secondary">
              {t('Cancel')}
            </Button>
            <Button
              onClick={handleSubmitCreateUser}
              color="primary"
              disabled={passwordError || !newUser.password || !confirmPassword}
            >
              {t('Create')}
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
    </Box>
  );
};

export default UserView;
