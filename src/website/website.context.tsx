import React, { createContext } from 'react';

interface WebsiteProviderProps {
  children: React.ReactNode;
}

type Dispatch = (action: any) => void;

interface WebsiteProps {}

const initialState: WebsiteProps = {};

const WebsiteStateContext = createContext<WebsiteProps | undefined>(undefined);
const WebsiteDispatchContext = createContext<Dispatch | undefined>(undefined);

function websiteReducer(state: WebsiteProps, action: any) {
  switch (action.type) {
    case 'TYPE': {
      return { ...state };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function WebsiteProvider({ children }: WebsiteProviderProps) {
  const [state, dispatch] = React.useReducer(websiteReducer, initialState);
  return (
    <WebsiteStateContext.Provider value={state}>
      <WebsiteDispatchContext.Provider value={dispatch as any}>{children}</WebsiteDispatchContext.Provider>
    </WebsiteStateContext.Provider>
  );
}

function useWebsiteState() {
  const context = React.useContext(WebsiteStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a App Provider');
  }
  return context;
}

function useWebsiteDispatch() {
  const context = React.useContext(WebsiteDispatchContext);
  if (context === undefined) {
    throw new Error('Must be used within a Website Provider');
  }
  return context;
}

export { WebsiteProvider, useWebsiteDispatch, useWebsiteState };
