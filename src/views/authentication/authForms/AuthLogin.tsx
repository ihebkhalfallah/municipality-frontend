import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'src/services/authService';

import { loginType } from 'src/types/auth/auth';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

import AuthSocialButtons from './AuthSocialButtons';
import { useTranslation } from 'react-i18next';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.message === 'Your account is locked.') {
        setError('المستخدم محظور ولا يمكنه الاتصال.');
      } else {
        setError('فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك, حاول مرة أخرى.');
      }
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* <AuthSocialButtons title="Sign in with" /> */}
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            تسجيل الدخول
          </Typography>
        </Divider>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack>
        <Box>
          <CustomFormLabel
            htmlFor="email"
            sx={{ textAlign: 'right', display: 'block', fontSize: '1rem' }}
          >
            البريد الإلكتروني
          </CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <CustomFormLabel
            htmlFor="password"
            sx={{ fontSize: '1rem', textAlign: 'right', display: 'block' }}
          >
            كلمة المرور
          </CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          {/* <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup> */}
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              textAlign: 'right',
              display: 'block',
              fontSize: '1rem',
            }}
          >
            هل نسيت كلمة المرور؟
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          sx={{ fontSize: '1.2 rem' }}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
        >
          تسجيل الدخول
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
