import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { forgotPassword } from 'src/services/authService';

const AuthForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('textSecondary');

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      setMessage('تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.');
      setMessageColor('green');
    } catch (error) {
      setMessage('فشل في إرسال رابط إعادة التعيين.');
      setMessageColor('red');
    }
  };

  return (
    <>
      <Stack mt={4} spacing={2}>
        <Typography color="textSecondary" textAlign="center" variant="subtitle2" fontWeight="400">
          يرجى إدخال عنوان بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور.
        </Typography>
        <TextField
          id="reset-email"
          label="عنوان البريد الإلكتروني"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleForgotPassword}
        >
          إرسال رابط إعادة التعيين
        </Button>
        {message && (
          <Typography color={messageColor} textAlign="center" variant="subtitle2" fontWeight="400">
            {message}
          </Typography>
        )}
        <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
          العودة إلى تسجيل الدخول
        </Button>
      </Stack>
    </>
  );
};

export default AuthForgotPassword;
