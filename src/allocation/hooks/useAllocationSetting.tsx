/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { getAllocationChartSetting } from 'api/request.api';
import { useAllocationDispatch, useAllocationState } from 'allocation/allocation.context';

export interface AllocationChartSetting {
  allocationStyle: string;
  description: string;
  displayProfile: boolean;
  id: number;
  showAmounts: boolean;
  title: string;
}

const useAllocationSetting = () => {
  const [settingData, setSettingData] = useState<{ loading: boolean; settings?: AllocationChartSetting; error: any }>({
    loading: false,
    settings: undefined,
    error: null,
  });

  const dispatch = useAllocationDispatch();
  const { allocationChartSetting } = useAllocationState();

  useEffect(() => {
    const getChartSetting = async () => {
      setSettingData({ ...settingData, loading: true });
      const { data, error } = await getAllocationChartSetting();
      setSettingData({ ...settingData, loading: false });
      if (error) {
        return setSettingData({ ...settingData, error });
      }

      dispatch({ type: 'SET_ALLOCATION_CHART_SETTING', payload: { allocationChartSettings: data } });

      return setSettingData({ ...settingData, settings: data });
    };

    if (!allocationChartSetting) {
      getChartSetting();
    }
  }, []);

  return { loading: settingData.loading, settings: settingData.settings, error: settingData.error };
};

export default useAllocationSetting;
