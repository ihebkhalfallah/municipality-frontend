import axios from 'axios';
import Cookies from 'js-cookie';
import { getUserById } from './userService';

const API_URL = process.env.REACT_APP_API_URL + '/auth/login';

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
  try {
    const response = await axios.post(API_URL, { email, password });
    const { accessToken, user } = response.data;

    if (user.locked) {
      throw new Error('Your account is locked.');
    }

    Cookies.set('token', accessToken);

    const fullUserInfo = await getUserById(user.id);
    Cookies.set('user', JSON.stringify(fullUserInfo));

    return { ...response.data, user: fullUserInfo };
  } catch (error: any) {
    if (error.response && error.response.data.message === 'Your account is locked.') {
      throw new Error('Your account is locked.');
    }
    throw new Error('Login failed. Please check your credentials and try again.');
  }
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
    return null;
  }
  return JSON.parse(user) as User;
};

export const getUserRole = () => {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  return user.role;
};
