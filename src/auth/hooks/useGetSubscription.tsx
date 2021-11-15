import useFetch from 'common/hooks/useFetch';
import { getSubscription } from 'api/request.api';

const useGetSubscription = (priceId?: string) => {
  const { res, loading } = useFetch(getSubscription, { priceId });
  return { fetchingSubscription: loading, subscription: res?.data, subError: res?.error };
};

export default useGetSubscription;
