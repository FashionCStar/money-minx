import useFetch from 'common/hooks/useFetch';
import { getFastlink } from 'api/request.api';

const useGetFastlink = () => {
  const { res, loading } = useFetch(getFastlink, {});
  return { loading, data: res?.data, error: res?.error };
};

export default useGetFastlink;
