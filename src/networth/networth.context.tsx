import { handleStringArrayToggle } from 'common/common-helper';
import React, { createContext } from 'react';
import { NetworthActionEnum } from './networth.enum';
import { NetworthDispatch, NetworthState, NetworthProviderProps, Action } from './networth.type';

const initialState: NetworthState = {
  fTypes: [],
  fAccounts: [],
  fCategories: [],
  fToDate: undefined,
  fFromDate: undefined,
  fTimeInterval: undefined,

  accounts: undefined,
  networth: undefined,

  fToggleInvestment: true,
  fToggleOther: true,
  fToggleLiabilities: true,
  fToggleNet: true,
};

const NetworthStateContext = createContext<NetworthState | undefined>(undefined);
const NetworthDispatchContext = createContext<NetworthDispatch | undefined>(undefined);

function networthReducer(state: NetworthState, action: Action): any {
  switch (action.type) {
    case NetworthActionEnum.SET_F_CATEGORY: {
      return { ...state, fCategories: handleStringArrayToggle(state.fCategories, action.payload?.fCategory) };
    }

    case NetworthActionEnum.SET_F_ACCOUNT_TYPE: {
      return { ...state, fTypes: handleStringArrayToggle(state.fTypes, action.payload?.fAccountType) };
    }

    case NetworthActionEnum.SET_F_FROM_DATE: {
      return { ...state, fFromDate: action.payload?.fromDate };
    }

    case NetworthActionEnum.SET_F_TO_DATE: {
      return { ...state, fToDate: action.payload?.toDate };
    }

    case NetworthActionEnum.SET_F_TIME_INTERVAL: {
      return { ...state, fTimeInterval: action.payload?.fTimeInterval };
    }

    case NetworthActionEnum.SET_F_ACCOUNT: {
      return { ...state, fAccounts: handleStringArrayToggle(state.fAccounts, action.payload?.fAccountId) };
    }

    case NetworthActionEnum.SET_NETWORTH: {
      return { ...state, networth: action.payload?.networth };
    }

    case NetworthActionEnum.SET_ACCOUNTS: {
      return { ...state, accounts: action.payload?.accounts };
    }

    case NetworthActionEnum.SET_F_TOGGLE_INVESTMENT: {
      return { ...state, fToggleInvestment: action.payload?.fToggleInvestment };
    }

    case NetworthActionEnum.SET_F_TOGGLE_OTHER: {
      return { ...state, fToggleOther: action.payload?.fToggleOther };
    }

    case NetworthActionEnum.SET_F_TOGGLE_LIABILITIES: {
      return { ...state, fToggleLiabilities: action.payload?.fToggleLiabilities };
    }

    case NetworthActionEnum.SET_F_TOGGLE_NET: {
      return { ...state, fToggleNet: action.payload?.fToggleNet };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function NetworthProvider({ children }: NetworthProviderProps) {
  const [state, dispatch] = React.useReducer(networthReducer, initialState);

  return (
    <NetworthStateContext.Provider value={state}>
      <NetworthDispatchContext.Provider value={dispatch as any}>{children}</NetworthDispatchContext.Provider>
    </NetworthStateContext.Provider>
  );
}

function useNetworthState() {
  const context = React.useContext(NetworthStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a App Provider');
  }

  return context;
}

function useNetworthDispatch() {
  const context = React.useContext(NetworthDispatchContext);

  if (context === undefined) {
    throw new Error('Must be used within a Settings Provider');
  }

  return context;
}

export { NetworthProvider, useNetworthDispatch, useNetworthState };
