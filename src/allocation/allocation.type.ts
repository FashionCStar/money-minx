import { CurrencyOptions } from 'auth/enum/currency-options';

import { AllocationsFilter } from './allocation.enum';

export interface AllocationProps {}

export interface Allocation {
  id: string;
  per: number;
  value: number;
  accountId: number;
  allocation: number;
  description: string;
  holdingType: string;
  securityType: string;
  allocationValue: number;
  currency: CurrencyOptions;
  classificationType: string;
  classificationValue: string;
}

export interface ChartDatum {
  group: string;
  per: number;
  total: number;
}

export type ChartData = ChartDatum[];

export type Allocations = Record<string, Allocation[]>;

export interface AllocationSubNavigationProps {
  onTypeChange: (type: AllocationsFilter) => void;
  filter: AllocationsFilter;
}

export interface AllocationOverviewProps {
  chartData: ChartData;
  allocations: Allocations;
  filter: AllocationsFilter;
}

export interface SelectedAllocationProps {
  filter: AllocationsFilter;
}
