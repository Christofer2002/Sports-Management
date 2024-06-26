import { useState, useEffect } from 'react';
import axios from '../../../utils/axiosConfig';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method,
          url,
          data: body,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, loading, setData };
};

export default useFetch;
