import { useState, useEffect } from "react";

export const useFetch = (apiFunc, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    apiFunc()
      .then(res => {
        if (isMounted) setData(res);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
};
