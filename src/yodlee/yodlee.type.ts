export type ConfigType = 'Aggregation' | 'Verification' | 'Aggregation plus Verification';

export type TokenEnumType = 'AccessToken' | 'JwtToken';

export interface TokenType {
  tokenType: TokenEnumType;
  tokenValue: string;
}

export interface FastLinkOptionsType {
  fastLinkURL: string;
  token?: TokenType;
  configName?: ConfigType;
}

export interface YodleeHookPropsType {
  containerId?: string;
  createScriptTag?: boolean;
  fastLinkOptions: FastLinkOptionsType;
  onSuccess?: (args: any) => void;
  onError?: (args: any) => void;
  onClose?: (args: any) => void;
  onEvent?: (args: any) => void;
}

export interface YodleeHookReturnType {
  init: (token?: TokenType) => void;
  data: any;
  error: any;
  ready: boolean;
  active: boolean;
}

export type YodleeHookType = (props: YodleeHookPropsType) => YodleeHookReturnType;

declare global {
  interface Window {
    fastlink: any;
  }
}
