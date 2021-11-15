import { useEffect, useState } from 'react';

import { getNetworth } from 'api/request.api';
import { useNetworthDispatch, useNetworthState } from 'networth/networth.context';
import { NetworthType } from 'networth/networth.type';
import { setAccounts, setNetWorth } from 'networth/networth.actions';

const useNetworth = () => {
  const dispatch = useNetworthDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NetworthType>();

  const {
    fToDate: toDate,
    fTimeInterval: timeInterval,
    fFromDate: fromDate,
    fAccounts,
    fCategories,
    fTypes,
  } = useNetworthState();

  const accountType = fTypes.length ? fTypes.toString() : undefined;
  const category = fCategories.length ? fCategories.toString() : undefined;
  const accountId = fAccounts.length ? fAccounts.toString() : undefined;

  useEffect(() => {
    const fetchNetworth = async () => {
      setLoading(true);
      const { data, error: networthError } = await getNetworth({
        accountType,
        timeInterval,
        category,
        fromDate,
        toDate,
        accountId,
      });

      if (networthError) {
        setLoading(false);

        return setError(networthError);
      }

      if (data?.networth) {
        dispatch(setNetWorth(data.networth));
      }

      if (data?.accounts) {
        dispatch(setAccounts(data.accounts));
      }

      setLoading(false);

      return setResponse(data);
    };

    fetchNetworth();
  }, [accountType, timeInterval, category, fromDate, dispatch, toDate, accountId]);

  return { loading, error, accounts: response?.accounts, networth: response?.networth };
};

export default useNetworth;
