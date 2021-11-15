import { useEffect, useState } from 'react';

import { getAllocations } from 'api/request.api';
import { Allocations, ChartData } from 'allocation/allocation.type';
import { AllocationsFilter } from 'allocation/allocation.enum';

const useAllocation = (filter: AllocationsFilter = AllocationsFilter.TYPE, forDate?: string) => {
  const [error, setError] = useState();
  const [fetching, setFetching] = useState<boolean>(false);
  const [allocations, setAllocations] = useState<Allocations>();
  const [allocationChartData, setAllocationChartData] = useState<ChartData>();

  useEffect(() => {
    const fetchAllocations = async () => {
      setFetching(true);
      const params = {
        filter,
        forDate,
      };

      const { data, error: err } = await getAllocations(params);
      setFetching(false);

      if (!err) {
        if (data?.allocations) {
          setAllocations(data?.allocations);
        }

        if (data?.chartData) {
          setAllocationChartData(data?.chartData);
        }

        return data;
      }

      return setError(err?.message || 'Error on fetching Allocations');
    };

    fetchAllocations();
  }, [filter, forDate]);

  return { fetching, error, allocations, allocationChartData };
};

export default useAllocation;
