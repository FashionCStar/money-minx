import { ApiResponse } from 'app/app.types';
import { EmailSubscriptionPayload } from 'setting/setting.type';
import { RegisterPayload, ResetPasswordPayload, VerifyResetPasswordTokenPayload } from 'auth/auth.types';

import { urls } from './api.url';
import * as http from './http.api';

export const postLogin = (payload: { email: string; password: string }) => {
  return http.post(urls.auth.LOGIN_IN, payload);
};

export const postFacebookLogin = (payload: {
  accessToken: string;
  mailChimpSubscription: boolean;
  subscriptionPriceId: string;
}): Promise<ApiResponse> => {
  return http.post(`${urls.auth.FACEBOOK_LOGIN}?access_token=${payload.accessToken}`, {
    subscriptionPriceId: payload.subscriptionPriceId,
    mailChimpSubscription: payload.mailChimpSubscription,
  });
};

export const postRegister = (payload: RegisterPayload) => {
  return http.post(urls.auth.REGISTER, payload);
};

export const postFacebookAssociation = (token: string) => {
  return http.post(urls.auth.ASSOCIATE_LOGIN, {}, false, { access_token: token });
};

export const postForgotPassword = (email: string): Promise<ApiResponse> => {
  return http.post(urls.auth.FORGOT_PASSWORD, { email }, false);
};

export const postResetPassword = (payload: ResetPasswordPayload): Promise<ApiResponse> => {
  return http.post(urls.auth.RESET_PASSWORD, payload, false);
};

export const checkResetPasswordToken = (payload: VerifyResetPasswordTokenPayload): Promise<ApiResponse> => {
  return http.post(urls.auth.VERIFY_RESET_PASSWORD_TOKEN, payload, false);
};

export const patchChangePassword = <T>(payload: T): Promise<ApiResponse> => {
  return http.patch(urls.auth.UPDATE_PASSWORD, payload);
};

export const getSubscription = <P>(params?: P) => {
  return http.get(urls.subscription.SUB, params);
};

export const postSubscriptionCheckout = <T>(payload: T): Promise<ApiResponse> => {
  return http.post(urls.subscription.STRIPE_CHECKOUT, payload);
};

export const getCurrentSubscription = () => {
  return http.get(urls.subscription.CURRENT_SUB);
};

export const patchCancelSubscription = (): Promise<ApiResponse> => {
  return http.patch(urls.subscription.CANCEL, {});
};

export const getFastlink = () => {
  return http.get(urls.yodlee.FAST_LINK);
};

export const getRefreshedAccount = () => {
  return http.get(urls.auth.ACCOUNTS_REFRESH);
};

export const getAccountsCount = () => {
  return http.get(urls.auth.ACCOUNTS_COUNT);
};

export const getAccount = (): Promise<ApiResponse> => {
  return http.get(urls.auth.ACCOUNTS);
};

export const getProfile = () => {
  return http.get(urls.auth.PROFILE);
};

export const getAccountCategory = (): Promise<ApiResponse> => {
  return http.get(urls.auth.ACCOUNT_CATEGORY);
};

export const getAccountType = (): Promise<ApiResponse> => {
  return http.get(urls.auth.ACCOUNT_TYPE);
};

export const getAccountSubType = (accountType: string): Promise<ApiResponse> => {
  return http.get(urls.auth.ACCOUNT_SUBTYPE.replace(':accountType', accountType));
};

export const getAssociateMortgage = (): Promise<ApiResponse> => {
  return http.get(urls.auth.ASSOCIATE_MORTGAGE);
};

export const getLoanAccounts = (): Promise<ApiResponse> => {
  return http.get(urls.auth.LOAN_ACCOUNT);
};

export const getFormFieldFilter = (accountType: string, accountSubtype: string): Promise<ApiResponse> => {
  return http.get(
    urls.auth.FORM_FIELD_FILTER.replace(':accountType', accountType).replace(':accountSubType', accountSubtype)
  );
};

export const refreshAccessToken = ({ referenceToken }: { referenceToken: string }): Promise<any> => {
  return Promise.resolve({ referenceToken });
};

export const getCurrentSettings = () => {
  return http.get(urls.auth.SETTINGS);
};

export const patchEmailSubscription = (payload: EmailSubscriptionPayload): Promise<ApiResponse> => {
  return http.patch(urls.auth.SETTINGS, payload);
};

export const patchProfilePicture = (payload: any): Promise<ApiResponse> => {
  return http.patch(urls.auth.PROFILE_PICTURE, payload);
};

export const patchProfile = <T>(payload: T): Promise<ApiResponse> => {
  return http.patch(urls.auth.PATCH_PROFILE, payload);
};

export const patchAccount = (id: string, data: any) => {
  return http.patch(urls.auth.PATCH_ACCOUNT.replace(':id', id), data);
};

export const deleteAccount = (id: string): Promise<ApiResponse> => {
  return http.remove(urls.auth.PATCH_ACCOUNT.replace(':id', id));
};

export const getNetworth = <P>(params?: P) => {
  return http.get(urls.networth.NETWORTH, params);
};

export const getAllocations = <P>(params?: P): Promise<ApiResponse> => {
  return http.get(urls.allocations.ALLOCATIONS, params);
};

export const getAllocationChartSetting = (): Promise<ApiResponse> => {
  return http.get(urls.allocations.CHART_SETTINGS);
};

export const patchAllocationChartSettings = <D>(data: D): Promise<ApiResponse> => {
  return http.patch(urls.allocations.CHART_SETTINGS, data);
};

export const postUploadChart = <D>(data: D): Promise<ApiResponse> => {
  return http.post(urls.allocations.UPLOAD_CHART, data);
};
