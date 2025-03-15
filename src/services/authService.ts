import axios from 'axios';
import Cookies from 'js-cookie';
import { getUserById } from './userService';

const API_URL = 'http://localhost:3000/auth/login';

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

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL, { email, password });
  const { accessToken, user } = response.data;
  Cookies.set('token', accessToken);

  const fullUserInfo = await getUserById(user.id);
  Cookies.set('user', JSON.stringify(fullUserInfo));

  return { ...response.data, user: fullUserInfo };
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};

export const getCurrentUser = () => {
  const user = Cookies.get('user');
  if (!user) {
    throw new Error('No user is currently logged in.');
  }
  return JSON.parse(user) as User;
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user.role;
};
