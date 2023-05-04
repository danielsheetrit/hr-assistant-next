import { useEffect, useState } from "react";

const HOST = process.env.HOST;

export default function useFetch({
  endpoint,
  method = "GET",
  payload,
  authHeader,
  isOnMount,
  onSuccess = null,
  onFailure = null,
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const refetch = async (manualPayload) => {
    setLoading(true);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      ...(method !== "GET" && {
        body: JSON.stringify(manualPayload || payload),
      }),
    };

    try {
      const res = await fetch(`${HOST}${endpoint}`, options);
      const resData = await res.json();

      if (!res.ok) {
        setErrorMsg(resData?.msg || "Something went wrong");
      } else {
        setData(resData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMsg && onFailure !== null) {
      onFailure(errorMsg);
    }
  }, [onFailure, errorMsg]);

  useEffect(() => {
    if (data && onSuccess !== null) {
      onSuccess(data);
    }
  }, [onSuccess, data]);

  useEffect(() => {
    if (isOnMount) {
      refetch();
    }
  }, []);

  return { data, loading, errorMsg, refetch };
}
