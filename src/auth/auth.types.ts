import { FormikProps } from 'formik';
import { StringKeyObject } from 'common/common.types';

export type Dispatch = (args: StringKeyObject) => void;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  subscriptionPriceId: string;
  mailChimpSubscription: boolean;
}

export interface ResetPasswordPayload {
  password: string;
  token: string;
}

export interface VerifyResetPasswordTokenPayload {
  token: string;
}

export interface UserType {
  [key: string]: any;
}

export interface Account {
  id: number;
  yodleeId: number;
  accountName: string;
  accountNumber: string;
  providerName: string;
  providerLogo: string;
  profileId: number;
  category: any;
  accountDetails: any;
  isManual: boolean;
  balance: number;
  balancesFetchedAt: string;
}

export enum RoleEnum {
  ADMIN,
  GUEST,
}

export enum AuthState {
  INITIAL,
  LOGGED_OUT,
  LOGGING_OUT,
  AUTHENTICATED,
  AUTHENTICATING,
  SIGN_IN_REJECTED,
  LOG_OUT_REJECTED,
}

export interface ProfileDetails {
  dependants: number;
  dob: string | Date;
  minxWinks: boolean;
  id: number | string;
  maritalStatus: string;
  riskTolerance: string;
  minxMeasureUp: boolean;
  alreadyRetired: boolean;
  householdIncome: string;
  profileEnabled: boolean;
  spouseDob: string | Date;
  shareAssetValues: boolean;
  countryOfResidence: string;
  shareAssetAllocation: boolean;
  spouseAlreadyRetired: boolean;
  targetedRetirementAge: number;
  spouseTargetedRetirementAge: number;
}

export interface ProfileType {
  roles: any;
  bio: string;
  role: string;
  uuid: string;
  email: string;
  picture: string;
  website: string;
  lastName: string;
  username: string;
  firstName: string;
  id: string | number;
  investingSince: number;
  profileEnabled: boolean;
  profileDetails: ProfileDetails;
}

export interface AuthType {
  email: string;
  expires?: number;
  token?: string;
  user?: ProfileType;
  roles?: RoleEnum[];
  authState: AuthState;
  isSigningIn: boolean;
  isAuthenticated: boolean;
  accounts?: Account[];
}

export interface LoginFormProps {
  props: FormikProps<LoginPayload>;
}

export interface RegisterFormProps {
  props: FormikProps<RegisterPayload>;
}

export interface LoginServicePayload {
  dispatch: Dispatch;
  payload: LoginPayload;
}

export interface FBAssociationPayload {
  dispatch: Dispatch;
  token: string;
}
export interface RegisterServicePayload {
  dispatch: Dispatch;
  payload: RegisterPayload;
}

export interface ChangePasswordServicePayload {
  dispatch: Dispatch;
  payload: {
    newPassword: string;
    oldPassword: string;
  };
}

export interface DeleteAccountPayload {
  dispatch: Dispatch;
  accounts: Account[];
}
