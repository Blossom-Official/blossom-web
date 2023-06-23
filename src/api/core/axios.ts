import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios';
import axios, { isAxiosError } from 'axios';

import { BaseResponse } from './types';

const serviceEndpoint = process.env.NEXT_PUBLIC_SERVICE_ENDPOINT;
const serviceSubfix = process.env.NEXT_PUBLIC_SERVICE_API_SUBFIX;

const axiosInstance = axios.create({
  baseURL: `${serviceEndpoint}${serviceSubfix}`,
});

const authAxiosInstance = axios.create({
  baseURL: `${serviceEndpoint}${serviceSubfix}`,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = AuthService.getAccessToken();
    const refreshToken = AuthService.getRefreshToken();

    if (config.url === '/auth/reissue' && (!accessToken || !refreshToken)) {
      AuthService.deleteAccessToken();
      AuthService.deleteRefreshToken();
      return Promise.reject('No AccessToken or RefreshToken');
    }
    if (config.url === '/auth/reissue') {
      return { ...config, data: { accessToken, refreshToken } };
    }
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<BaseResponse<unknown>>) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const config = error.config as AxiosRequestConfig;
    const code = error.response?.data.code;

    if (code === 'U001') {
      AuthService.deleteAccessToken();
      AuthService.deleteRefreshToken();
      return Promise.reject(error);
    }
    if (config.headers?.retry) return Promise.reject(error);

    const token = await AuthService.refresh();

    AuthService.setAccessToken(token);
    return authAxiosInstance.request({
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${token}`,
        retry: true,
      },
    });
  }
);

interface Response {
  accessToken: string;
  refreshToken: string;
}

export const AuthService = {
  setAccessToken: (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    authAxiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  deleteAccessToken: () => {
    localStorage.removeItem('accessToken'),
      delete authAxiosInstance.defaults.headers.common['Authorization'];
  },

  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  deleteRefreshToken: () => {
    localStorage.removeItem('refreshToken');
  },

  logout: () => {
    AuthService.deleteRefreshToken();
    return authHttp.post('/auth/logout');
  },

  refresh: async () => {
    const accessToken = AuthService.getAccessToken();
    const refreshToken = AuthService.getRefreshToken();

    const {
      data: { data },
    } = await authHttp.post<BaseResponse<Response>>(`/auth/reissue`, {
      data: { accessToken, refreshToken },
    });
    AuthService.setAccessToken(data.accessToken);
    return data.accessToken;
  },
};

type HTTPMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';
const attachMethod =
  (method: HTTPMethod) =>
  (axiosInstance: AxiosInstance) =>
  <T = unknown>(
    url: string,
    config?: Omit<AxiosRequestConfig, 'url' | 'method'>
  ): AxiosPromise<T> =>
    axiosInstance(url, { method, ...config });

export const http = {
  get: attachMethod('get')(axiosInstance),
  post: attachMethod('post')(axiosInstance),
  patch: attachMethod('patch')(axiosInstance),
  put: attachMethod('put')(axiosInstance),
  delete: attachMethod('delete')(axiosInstance),
} as const;

export const authHttp = {
  get: attachMethod('get')(authAxiosInstance),
  post: attachMethod('post')(authAxiosInstance),
  patch: attachMethod('patch')(authAxiosInstance),
  put: attachMethod('put')(authAxiosInstance),
  delete: attachMethod('delete')(authAxiosInstance),
} as const;
