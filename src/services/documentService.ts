import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:3000/documents';

const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const uploadDocuments = async (entityType: string, entityId: number, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await axios.post(
    `${API_URL}/upload/${entityType}/${entityId}`,
    formData,
    getAuthHeaders(),
  );
  return response.data;
};

export const getDocumentsByEntity = async (entityType: string, entityId: number) => {
  const response = await axios.get(`${API_URL}/${entityType}/${entityId}`, getAuthHeaders());
  return response.data;
};

export const downloadDocument = async (documentId: number) => {
  const response = await axios.get(`${API_URL}/file/${documentId}`, {
    ...getAuthHeaders(),
    responseType: 'blob',
  });
  return {
    data: response.data,
    fileName: response.headers['content-disposition'].split('filename=')[1].replace(/"/g, ''),
  };
};

export const downloadDocumentsByEntity = async (entityType: string, entityId: number) => {
  const response = await axios.get(`${API_URL}/download/${entityType}/${entityId}`, {
    ...getAuthHeaders(),
    responseType: 'blob',
  });
  return {
    data: response.data,
    fileName: 'documents.zip',
  };
};

export const deleteDocument = async (documentId: number) => {
  const response = await axios.delete(`${API_URL}/${documentId}`, getAuthHeaders());
  return response.data;
};
