import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton, Stack } from '@mui/material';
import * as dropdownData from './data';
import { IconMail } from '@tabler/icons';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import unlimitedImg from 'src/assets/images/backgrounds/unlimited-bg.png';
import { removeToken, getCurrentUser } from 'src/services/authService';
import { useTranslation } from 'react-i18next';
import { PersonOutline } from '@mui/icons-material';

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

const Profile = () => {
  const { t } = useTranslation();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/auth/login');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          sx={{
            width: 35,
            height: 35,
            bgcolor: 'primary.main',
          }}
        ></Avatar>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">{t('User Profile')}</Typography>
        {user && (
          <Stack direction="row" py={3} spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 95,
                height: 95,
                bgcolor: 'primary.main',
              }}
            >
              <PersonOutline sx={{ width: 40, height: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.role}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <IconMail width={15} height={15} />
                {user.email}
              </Typography>
            </Box>
          </Stack>
        )}
        <Divider />
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link to={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {t(profile.title)}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {t(profile.subtitle)}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            {t('Logout')}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
