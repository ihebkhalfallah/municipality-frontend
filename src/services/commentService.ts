import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:3000/comments';

const getAuthHeaders = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getComments = async (demandeId: number) => {
  const response = await axios.get(`${API_URL}?demandeId=${demandeId}`, getAuthHeaders());

  return response.data;
};

export const addComment = async (demandeId: number, commentText: string) => {
  const response = await axios.post(API_URL, { demandeId, commentText }, getAuthHeaders());

  return response.data;
};
