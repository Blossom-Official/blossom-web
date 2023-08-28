import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios';
import axios, { isAxiosError } from 'axios';

import { RequestError, RequestState } from './types';

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
  async (error: AxiosError<RequestError>) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const config = error.config as AxiosRequestConfig;
    const code = error.response?.data.code;

    if (config.url === '/auth/reissue') {
      /**
       * NOTE
       * Refresh 요청에서 RT가 만료되거나 AT, RT를 입력하지 않은 경우
       */
      if (code === 'U001' || code === 'V001') {
        AuthService.deleteAccessToken();
        AuthService.deleteRefreshToken();
      }
      return Promise.reject(error);
    }
    if (config.headers?.retry) return Promise.reject(error);

    /**
     * NOTE
     * Refresh 요청을 제외한 요청에 대해 AT가 만료된 경우에만 refresh 요청 호출
     */
    if (code === 'U001') {
      const token = await AuthService.refresh();
      if (token) {
        AuthService.setAccessToken(token);
        return authAxiosInstance.request({
          ...config,
          headers: {
            ...config.headers,
            authorization: `Bearer ${token}`,
            retry: true,
          },
        });
      } else {
        return Promise.reject(error);
      }
    }
    // 그 외 에러는 모두 reject
    return Promise.reject(error);
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

    try {
      const {
        data: { data },
      } = await authHttp.post<RequestState<Response>>(`/auth/reissue`, {
        data: { accessToken, refreshToken },
      });
      AuthService.setAccessToken(data!.accessToken);
      return data!.accessToken;
    } catch (error) {
      console.error(error);
      return null;
    }
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
