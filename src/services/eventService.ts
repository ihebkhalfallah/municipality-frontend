import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/events';

const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getEvents = async (page: number, limit: number, filters: any = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters,
  });

  const response = await axios.get(`${API_URL}?${params.toString()}`, getAuthHeaders());
  return response.data;
};

export const getEventById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createEvent = async (data: any) => {
  const response = await axios.post(API_URL, data, getAuthHeaders());
  return response.data;
};

export const updateEvent = async (id: number, data: any) => {
  const response = await axios.patch(`${API_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteEvent = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
