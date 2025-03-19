import React, { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from 'src/services/authService';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('textSecondary');
  const token = searchParams.get('token');

  const handleResetPassword = async () => {
    if (!token) {
      setMessage('رمز غير صالح');
      setMessageColor('red');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('كلمات المرور غير متطابقة');
      setMessageColor('red');
      return;
    }
    try {
      await resetPassword(token, newPassword);
      setMessage('تم إعادة تعيين كلمة المرور بنجاح');
      setMessageColor('green');
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (error) {
      setMessage('فشل في إعادة تعيين كلمة المرور');
      setMessageColor('red');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Typography
              color="textSecondary"
              textAlign="center"
              variant="subtitle2"
              fontWeight="400"
            >
              يرجى إدخال كلمة المرور الجديدة الخاصة بك.
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="كلمة المرور الجديدة"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mt: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              label="تأكيد كلمة المرور"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mt: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleResetPassword}
              sx={{ mt: 2 }}
            >
              إعادة تعيين كلمة المرور
            </Button>
            {message && (
              <Typography
                color={messageColor}
                textAlign="center"
                variant="subtitle2"
                fontWeight="400"
                sx={{ mt: 2 }}
              >
                {message}
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
