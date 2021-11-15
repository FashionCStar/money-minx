import useFetch from 'common/hooks/useFetch';
import { getCurrentSubscription } from 'api/request.api';
import { CurrentSubscription } from 'setting/setting.type';

const useCurrentSubscription = () => {
  const { res, loading } = useFetch(getCurrentSubscription, {});

  return {
    fetchingCurrentSubscription: loading,
    currentSubscription: res?.data as CurrentSubscription,
    currentSubError: res?.error,
  };
};

export default useCurrentSubscription;
