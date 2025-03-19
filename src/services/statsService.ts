import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/stats';

export enum USER_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PERMISSION_ADMIN = 'PERMISSION_ADMIN',
  CONTESTATION_ADMIN = 'CONTESTATION_ADMIN',
  DEMANDE_ADMIN = 'DEMANDE_ADMIN',
  CITIZEN = 'CITIZEN',
  ORGANIZATION = 'ORGANIZATION',
  BUSINESS = 'BUSINESS',
}

export interface MonthlyCount {
  month: string;
  count: string;
}

export interface StatusByMonth {
  accepted: MonthlyCount[];
  pending: MonthlyCount[];
  rejected: MonthlyCount[];
}

interface StatusCount {
  accepted: number;
  pending: number;
  rejected: number;
}

export interface StatsData {
  userCount: number;
  userCountsByRole: {
    [key in USER_ROLE]: number;
  };
  demandeCounts: {
    demande: StatusCount;
    contestation: StatusCount;
    proposition: StatusCount;
  };
  demandeCountsByMonth: {
    demande: StatusByMonth;
    contestation: StatusByMonth;
    proposition: StatusByMonth;
  };
  eventCounts: {
    event: StatusCount;
    news: StatusCount;
    announcement: StatusCount;
  };
  eventCountsByMonth: {
    event: StatusByMonth;
    news: StatusByMonth;
    announcement: StatusByMonth;
  };
  authorizationCounts: StatusCount;
  authorizationCountsByMonth: StatusByMonth;
}

const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getStats = async (): Promise<StatsData> => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const getDailyStats = async (startDate: string, endDate: string): Promise<StatsData> => {
  const params = new URLSearchParams({
    startDate,
    endDate,
  });
  const response = await axios.get(`${API_URL}/daily?${params}`, getAuthHeaders());
  return response.data;
};
