import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { PROXY_PREFIX } from '@/common/constants';

type RequestType = 'DEFAULT' | 'FILE';
const getInterceptedInstance = (requestType: RequestType) =>
  setInterceptors(
    axios.create({
      baseURL: `${PROXY_PREFIX}${process.env.NEXT_PUBLIC_SERVICE_API_SUBFIX}`,
    }),
    requestType
  );

const setInterceptors = (instance: AxiosInstance, requestType: RequestType) => {
  instance.interceptors.request.use((config) => {
    if (requestType === 'FILE') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  });

  return instance;
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

const instance = {
  default: getInterceptedInstance('DEFAULT'),
  file: getInterceptedInstance('FILE'),
};

export const http = {
  get: attachMethod('get')(instance.default),
  post: attachMethod('post')(instance.default),
  patch: attachMethod('patch')(instance.default),
  put: attachMethod('put')(instance.default),
  delete: attachMethod('delete')(instance.default),
  file: {
    get: attachMethod('get')(instance.file),
    post: attachMethod('post')(instance.file),
    patch: attachMethod('patch')(instance.file),
    put: attachMethod('put')(instance.file),
    delete: attachMethod('delete')(instance.file),
  },
} as const;
