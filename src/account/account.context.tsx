import React, { createContext } from 'react';

interface AccountProviderProps {
  children: React.ReactNode;
}

type Dispatch = (action: any) => void;

interface AccountProps {}

const initialState: AccountProps = {};

const AccountStateContext = createContext<AccountProps | undefined>(undefined);
const AccountDispatchContext = createContext<Dispatch | undefined>(undefined);

function accountReducer(state: AccountProps, action: any) {
  switch (action.type) {
    case 'TYPE': {
      return { ...state };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function AccountProvider({ children }: AccountProviderProps) {
  const [state, dispatch] = React.useReducer(accountReducer, initialState);
  return (
    <AccountStateContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch as any}>{children}</AccountDispatchContext.Provider>
    </AccountStateContext.Provider>
  );
}

function useAccountState() {
  const context = React.useContext(AccountStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a App Provider');
  }
  return context;
}

function useAccountDispatch() {
  const context = React.useContext(AccountDispatchContext);
  if (context === undefined) {
    throw new Error('Must be used within a Account Provider');
  }
  return context;
}

export { AccountProvider, useAccountDispatch, useAccountState };
