import { AccountItem, Action, NetworthItem } from './networth.type';
import { AccountCategory, NetworthActionEnum, TimeIntervalEnum } from './networth.enum';

export const setFilterFromDate = (fromDate: string): Action => ({
  type: NetworthActionEnum.SET_F_FROM_DATE,
  payload: {
    fromDate,
  },
});

export const setFilterToDate = (toDate?: string): Action => ({
  type: NetworthActionEnum.SET_F_TO_DATE,
  payload: {
    toDate,
  },
});

export const setFilterCategories = (fCategory: string) => ({
  type: NetworthActionEnum.SET_F_CATEGORY,
  payload: { fCategory },
});

export const setFilterAccount = (fAccountId: number) => ({
  type: NetworthActionEnum.SET_F_ACCOUNT,
  payload: { fAccountId },
});

export const setFilterAccountType = (fAccountType: string) => ({
  type: NetworthActionEnum.SET_F_ACCOUNT_TYPE,
  payload: { fAccountType },
});

export const setFilterTimeInterval = (fTimeInterval: TimeIntervalEnum) => ({
  type: NetworthActionEnum.SET_F_TIME_INTERVAL,
  payload: { fTimeInterval },
});

export const setNetWorth = (networth: NetworthItem[]) => ({
  type: NetworthActionEnum.SET_NETWORTH,
  payload: { networth },
});

export const setAccounts = (accounts: Record<AccountCategory, AccountItem[]>) => ({
  type: NetworthActionEnum.SET_ACCOUNTS,
  payload: { accounts },
});

export const setToggleInvestment = (fToggleInvestment: boolean) => ({
  type: NetworthActionEnum.SET_F_TOGGLE_INVESTMENT,
  payload: { fToggleInvestment },
});

export const setToggleOther = (fToggleOther: boolean) => ({
  type: NetworthActionEnum.SET_F_TOGGLE_OTHER,
  payload: { fToggleOther },
});

export const setToggleLiabilities = (fToggleLiabilities: boolean) => ({
  type: NetworthActionEnum.SET_F_TOGGLE_LIABILITIES,
  payload: { fToggleLiabilities },
});

export const setToggleNet = (fToggleNet: boolean) => ({
  type: NetworthActionEnum.SET_F_TOGGLE_NET,
  payload: { fToggleNet },
});
