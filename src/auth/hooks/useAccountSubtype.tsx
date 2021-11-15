import { useEffect, useState } from 'react';
import { getAccountSubType } from 'api/request.api';

const useAccountSubtype = (accountType: string) => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [subType, setSubType] = useState<string[]>(['']);

  useEffect(() => {
    if (accountType) {
      const fetchAccountSubType = async () => {
        setLoading(true);
        const { data, error: err } = await getAccountSubType(accountType);
        if (err) {
          setError(err);
        } else {
          setSubType(data);
        }
        setLoading(false);
      };
      fetchAccountSubType();
    }
  }, [accountType]);

  return { loading, subType, error };
};

export default useAccountSubtype;
