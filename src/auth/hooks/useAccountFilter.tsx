import { useState, useEffect } from 'react';
import { getFormFieldFilter } from 'api/request.api';

const useAccountFilter = (accountType: string, accountSubtype: string) => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [accountFilters, setAccountFilters] = useState<string[]>(['']);

  useEffect(() => {
    if (accountType) {
      const fetchAccountSubType = async () => {
        setLoading(true);
        const { data, error: err } = await getFormFieldFilter(accountType, accountSubtype);
        if (err) {
          setError(err);
        } else {
          setAccountFilters(data);
        }
        setLoading(false);
      };
      fetchAccountSubType();
    }
  }, [accountType, accountSubtype]);

  return { fetchingFilters: loading, accountFilters, error };
};

export default useAccountFilter;
