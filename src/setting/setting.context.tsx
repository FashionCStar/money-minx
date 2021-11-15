import React, { createContext } from 'react';

interface SettingsProviderProps {
  children: React.ReactNode;
}

type Dispatch = (action: any) => void;

interface SettingsProps {}

const initialState: SettingsProps = {};

const SettingsStateContext = createContext<SettingsProps | undefined>(undefined);
const SettingsDispatchContext = createContext<Dispatch | undefined>(undefined);

function settingsReducer(state: SettingsProps, action: any) {
  switch (action.type) {
    case 'TYPE': {
      return { ...state };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = React.useReducer(settingsReducer, initialState);
  return (
    <SettingsStateContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch as any}>{children}</SettingsDispatchContext.Provider>
    </SettingsStateContext.Provider>
  );
}

function useSettingsState() {
  const context = React.useContext(SettingsStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a App Provider');
  }
  return context;
}

function useSettingsDispatch() {
  const context = React.useContext(SettingsDispatchContext);
  if (context === undefined) {
    throw new Error('Must be used within a Settings Provider');
  }
  return context;
}

export { SettingsProvider, useSettingsDispatch, useSettingsState };
