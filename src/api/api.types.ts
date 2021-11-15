import { StringKeyObject } from 'common/common.types';

export interface ApiResponse {
  data: StringKeyObject | null;
  error: StringKeyObject | null;
}
