import { useEffect, useState } from 'react';

import { ApiResponse } from 'app/app.types';
import { fetchProfile } from 'auth/auth.service';
import { useAuthDispatch } from 'auth/auth.context';

const useProfile = () => {
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse>({ data: null, error: null });

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data, error } = await fetchProfile({ dispatch });
      setLoading(false);
      setResponse({ data, error });
    };

    getUser();
  }, [dispatch]);

  return { loading, response };
};

export default useProfile;
