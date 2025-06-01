import { useEffect, useState } from "react";

const useFetchData = (url, options) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url, options]);
  return { data };
};

export default useFetchData;
