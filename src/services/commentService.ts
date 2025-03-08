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

export const getComments = async (filters: any = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_URL}?${params.toString()}`, getAuthHeaders());
  return response.data;
};

export const addComment = async (entityType: string, entityId: number, commentText: string) => {
  const response = await axios.post(
    API_URL,
    { [`${entityType}Id`]: entityId, commentText },
    getAuthHeaders()
  );
  return response.data;
};

export const updateComment = async (id: number, commentText: string) => {
  const response = await axios.patch(`${API_URL}/${id}`, { commentText }, getAuthHeaders());
  return response.data;
};

export const deleteComment = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
