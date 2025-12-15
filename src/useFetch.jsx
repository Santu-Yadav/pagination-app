import { useState, useEffect } from "react";
// import paginate from "./utils";
// const url = "https://api.github.com/users/john-smilga/followers?per_page=100";
// const url =
//   "https://api.github.com/users/octocat/followers?per_page=${limit}&page=${page}";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const useFetch = (limit, page) => {
  console.log("page ### :", page);
  console.log("limit ### :", limit);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(
      `https://api.github.com/users/octocat/followers?per_page=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,

          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data = await response.json();
    console.log("data @@@ :", data);
    setData((prevData) => [...prevData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [page, limit]);

  return { loading, data };
};
