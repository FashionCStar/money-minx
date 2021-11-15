/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

import appEnv from 'app/app.env';
import { storage } from 'app/app.storage';
import { STATUS_CODE } from 'app/app.status';
import { refreshAccessToken } from 'api/request.api';
import { withError, withData } from 'common/common-helper';
import { appRouteConstants } from 'app/app-route.constant';

import { urls } from './api.url';

const axiosInstance = axios.create({
  baseURL: appEnv.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing: boolean = false;

let refreshSubscribers: (() => void)[] = [];

const subscribeTokenRefresh = (cb: any) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb: (token: string) => void) => cb(token));
};

axiosInstance.interceptors.response.use(
  (response: any): any => {
    return withData(response.data);
  },
  (error: any): any => {
    if (error.message === STATUS_CODE.NETWORK_ERROR) {
      return withError(error.message);
    }

    const status = error.response?.status;
    const url = error.response?.config?.url;
    const isAuthenticating = url === urls.auth.LOGIN_IN || url === urls.auth.REGISTER || url === urls.auth.PROFILE;

    const errorResponse = error.response?.data ? error.response.data : error;

    if (status === STATUS_CODE.UNAUTHORIZED && !isAuthenticating) {
      storage.clear();
      window.location.replace(`${appRouteConstants.auth.LOGIN}?expired=true`);

      return withError(errorResponse);
    }

    return withError(errorResponse);
  }
);

const handle401Error = async (error: any) => {
  const pendingRequest = error.config;

  if (!isRefreshing) {
    isRefreshing = true;

    const existingToken = storage.accessToken() || '';

    refreshAccessToken({ referenceToken: existingToken }).then((res: any) => {
      if (res.data) {
        const { data } = res;
        isRefreshing = false;
        onRefreshed(data.token);
        storage.changeAccessToken(data.token);
        return (refreshSubscribers = []);
      }
    });
  }

  const retryPendingRequest = new Promise((resolve) => {
    subscribeTokenRefresh((token: string) => {
      // replace the expired token and retry
      pendingRequest.headers.authorization = `Bearer ${token}`;
      resolve(axiosInstance(pendingRequest));
    });
  });

  return retryPendingRequest;
};

export function get<P>(url: string, params?: P): any {
  return axiosInstance({
    method: 'get',
    url,
    params,
    headers: {
      authorization: `Bearer ${storage.accessToken()}`,
    },
  });
}

export function post(url: string, data: any, auth: boolean = true, params?: any): any {
  return axiosInstance({
    method: 'post',
    url,
    data,
    params,
    headers: auth
      ? {
          authorization: `Bearer ${storage.accessToken()}`,
        }
      : undefined,
  });
}

export function put(url: string, data: any): any {
  return axiosInstance({
    method: 'put',
    url,
    data,
    headers: {
      authorization: `Bearer ${storage.accessToken()} `,
    },
  });
}
export function patch(url: string, data: any): any {
  return axiosInstance({
    method: 'patch',
    url,
    data,
    headers: {
      authorization: `Bearer ${storage.accessToken()} `,
    },
  });
}

export function remove(url: string, params: object = {}): any {
  return axiosInstance({
    method: 'delete',
    url,
    params,
    headers: {
      authorization: `Bearer ${storage.accessToken()} `,
    },
  });
}
