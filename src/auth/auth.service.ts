import { storage } from 'app/app.storage';
import { ApiResponse } from 'api/api.types';
import {
  postLogin,
  getProfile,
  postRegister,
  getRefreshedAccount,
  patchChangePassword,
  postFacebookAssociation,
  deleteAccount,
  getAccount,
} from 'api/request.api';

import { auth } from './auth-context.types';
import {
  Account,
  Dispatch,
  LoginServicePayload,
  FBAssociationPayload,
  RegisterServicePayload,
  ChangePasswordServicePayload,
  DeleteAccountPayload,
} from './auth.types';
import { groupByProviderName } from './auth.helper';
import exp from 'constants';

export const login = async ({ dispatch, payload }: LoginServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.LOGIN });

  const { data, error } = await postLogin(payload);
  if (error) {
    storage.clear();
    dispatch({ type: auth.LOGIN_FAILURE });
  } else {
    dispatch({
      type: auth.LOGIN_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};

export const associateFacebookUser = async ({ dispatch, token }: FBAssociationPayload): Promise<ApiResponse> => {
  dispatch({ type: auth.LOGIN });

  const { data, error } = await postFacebookAssociation(token);
  if (error) {
    storage.clear();
    dispatch({ type: auth.LOGIN_FAILURE });
  } else {
    dispatch({
      type: auth.LOGIN_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};

export const signup = async ({ dispatch, payload }: RegisterServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.REGISTER });
  const { data, error } = await postRegister(payload);
  if (error) {
    dispatch({ type: auth.REGISTER_FAILURE });
  } else {
    dispatch({
      type: auth.REGISTER_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};

export const pickByProviderName = (data: Account[], count: number = 2) => {
  const accountByProviderName = groupByProviderName(data);

  const filteredData = Object.values(accountByProviderName).map((accountArr) => accountArr.slice(0, count));

  return filteredData.flat();
};

export const getRefreshedProfile = async ({ dispatch }: { dispatch: Dispatch }): Promise<ApiResponse> => {
  dispatch({ type: auth.FETCH_ACCOUNT });
  const { data, error } = await getRefreshedAccount();

  if (error) {
    dispatch({ type: auth.FETCH_ACCOUNT_FAILURE });
  } else {
    // const pickedData = pickByProviderName(data);

    dispatch({
      type: auth.FETCH_ACCOUNT_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const deleteAccounts = async ({ dispatch, accounts }: DeleteAccountPayload): Promise<ApiResponse> => {
  const deleteAccountById = async () => {
    return Promise.all(
      accounts.map(async (account) => {
        await deleteAccount(`${account.id}`);
      })
    );
  };

  const result = await deleteAccountById();
  const { data, error } = await getAccount();

  if (error) {
    dispatch({ type: auth.FETCH_ACCOUNT_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_ACCOUNT_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const fetchProfile = async ({ dispatch }: { dispatch: Dispatch }): Promise<ApiResponse> => {
  dispatch({ type: auth.FETCH_PROFILE });
  const { data, error } = await getProfile();
  if (error) {
    dispatch({ type: auth.FETCH_PROFILE_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_PROFILE_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const changePassword = async ({ dispatch, payload }: ChangePasswordServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.SIGN_OUT });
  const { data, error } = await patchChangePassword(payload);

  if (error) {
    dispatch({ type: auth.SIGN_OUT_FAILURE });
  } else {
    dispatch({ type: auth.SIGN_OUT_SUCCESS });
  }

  return { data, error };
};
