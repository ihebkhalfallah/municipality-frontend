import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:3000/demandes';

const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDemandes = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, getAuthHeaders());
  return response.data;
};

export const getDemandeById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createDemande = async (data: any) => {
  const response = await axios.post(API_URL, data, getAuthHeaders());
  return response.data;
};

export const updateDemande = async (id: number, data: any) => {
  const response = await axios.patch(`${API_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteDemande = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
