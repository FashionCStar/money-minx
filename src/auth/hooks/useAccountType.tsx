import useFetch from 'common/hooks/useFetch';
import { getAccountType } from 'api/request.api';

const useAccountType = () => {
  const { res, loading } = useFetch(getAccountType, {});
  return { loading, data: res?.data as string[], error: res?.error };
};

export default useAccountType;
