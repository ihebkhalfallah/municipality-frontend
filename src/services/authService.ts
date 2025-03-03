import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/auth/login';

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL, { email, password });
  const { accessToken } = response.data;
  Cookies.set('token', accessToken);

  return response.data;
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};
