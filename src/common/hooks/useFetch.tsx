/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from 'app/app.types';

const useFetch = (cb: any, dep: any) => {
  const [res, setResponse] = useState<ApiResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const callback = useCallback(() => cb(dep), Object.values(dep));

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data, error } = await callback();
      setResponse({ data, error });
      setLoading(false);
    };
    getData();
  }, [callback, ...Object.values(dep)]);

  return { loading, res };
};

export default useFetch;
