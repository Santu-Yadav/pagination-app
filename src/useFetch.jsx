import { useState, useEffect } from "react";
// import paginate from "./utils";
// const url = "https://api.github.com/users/john-smilga/followers?per_page=100";
// const url =
//   "https://api.github.com/users/octocat/followers?per_page=${limit}&page=${page}";

// const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
export const useFetch = (limit, page) => {
  console.log("page ### :", page);
  console.log("limit ### :", limit);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async () => {
    if (!hasMore) {
      setLoading(false);
      return;
    }

    const response = await fetch(
      `https://api.github.com/users/octocat/followers?per_page=${limit}&page=${page}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${GITHUB_TOKEN}`,

      //     "X-GitHub-Api-Version": "2022-11-28",
      //   },
      // }
    );
    const newData = await response.json();
    if (newData.length === 0) {
      setHasMore(false);
    }
    // setData((prevData) => [...prevData, ...data]);
    setData((prevData) => {
      const existingDataMap = new Map(prevData.map((item) => [item.id, item]));

      const uniqueNewData = newData.filter(
        (item) => !existingDataMap.has(item.id)
      );

      return [...prevData, ...uniqueNewData];
    });
    setLoading(false);
  };

  console.log("data @@@ :", data);

  useEffect(() => {
    if (hasMore) {
      setLoading(true);
      getProducts();
    }
  }, [page, limit, hasMore]);

  return { loading, data, hasMore };
};
