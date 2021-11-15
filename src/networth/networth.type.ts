import { AlertType } from 'common/components/alert';
import { AccountCategory, NetworthActionEnum, TimeIntervalEnum } from 'networth/networth.enum';

export interface ConnectionAlertProps {
  message: string;
  connectionAlert: AlertType;
}

export interface NetworthItem {
  interval: string;
  type: string;
  networth: number;
  liabilities: number;
  otherAssets: number;
  investmentAssets: number;
}

export interface AccountItem {
  category: number;
  accountId: number;
  accountName: number;
  accountType: number;
  balances: {
    balance: number;
    interval: string;
    type: string;
  }[];
}

export interface NetworthType {
  networth: NetworthItem[];
  accounts: Record<AccountCategory, AccountItem[]>;
}

export interface NetworthParam {
  category?: string;
  fromDate?: string;
  accountType?: string;
  timeInterval?: TimeIntervalEnum;
}

export interface NetworthProviderProps {
  children: React.ReactNode;
}

export type NetworthDispatch = (action: Action) => void;

export interface NetworthState {
  fTypes: string[];
  fFromDate?: string;
  fToDate?: string;
  fAccounts: number[];
  fCategories: string[];
  fTimeInterval?: TimeIntervalEnum;

  networth?: NetworthItem[];
  accounts?: Record<AccountCategory, AccountItem[]>;

  fToggleInvestment?: boolean;
  fToggleOther?: boolean;
  fToggleLiabilities?: boolean;
  fToggleNet?: boolean;
}

export type NetworthPayload = any;

export interface Action {
  type: NetworthActionEnum;
  payload?: NetworthPayload;
}

export interface NetworthBarGraphProps {
  networth: NetworthItem[];
  fCategories: string[];
}
