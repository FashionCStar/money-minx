import { useEffect } from 'react';

import { getRefreshedProfile } from 'auth/auth.service';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';

const useAccountRefresh = () => {
  const dispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      getRefreshedProfile({ dispatch });
    }
  }, [dispatch, isAuthenticated]);
};

export default useAccountRefresh;
