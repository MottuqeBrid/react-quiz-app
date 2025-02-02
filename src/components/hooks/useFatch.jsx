import { useEffect, useState } from "react";

const useFatch = (url, method, headers) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    requestFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { loading, error, result };
};

export default useFatch;
