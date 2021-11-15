import errors from 'lang/en/errors.json';
import { StorageKey } from './app.types';
import { serialize, parse, withError, withData } from 'common/common-helper';

const hasLocalStorage = localStorage || window.localStorage;

export const storage = {
  get(key: string) {
    const { error, data } = parse(localStorage.getItem(key) || '');

    if (error) {
      return withError(error);
    }

    if (!hasLocalStorage) {
      return withError(errors.NO_LOCAL_STORAGE_FOUND);
    }

    return withData(data);
  },

  set(key: string, value: any) {
    if (!hasLocalStorage) {
      return withError(errors.NO_LOCAL_STORAGE_FOUND);
    }

    return withData(localStorage.setItem(key, serialize(value)));
  },

  clear(key: string | null = null) {
    if (!hasLocalStorage) {
      return withError(errors.NO_LOCAL_STORAGE_FOUND);
    }
    if (!key) {
      localStorage.clear();
    } else {
      localStorage.removeItem(key);
    }
    return withData(localStorage.getItem(key || ''));
  },

  accessToken(): string | null {
    const { data, error } = this.get(StorageKey.AUTH);
    return error ? null : data?.token ? data.token : null;
  },

  isSignedIn(): boolean {
    return !!this.accessToken();
  },

  changeAccessToken(token: string) {
    const { data, error } = this.get(StorageKey.AUTH);
    if (error || !data) {
      this.set(StorageKey.AUTH, { token });
    } else {
      const authDetails = { ...data, token };
      this.set(StorageKey.AUTH, authDetails);
    }
  },
};
