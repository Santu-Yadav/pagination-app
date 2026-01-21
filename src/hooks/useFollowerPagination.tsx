import { useState, useEffect } from "react";
import { paginate, matched } from "../utils.jsx";

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export const useFollowerPagination = (
  debouncedInput: string,
  data: GitHubUser[],
  itemsPerPage: number,
) => {
  const [page, setPage] = useState<number>(0);

  const filteredData: GitHubUser[] =
    debouncedInput.length !== 0 ? matched(data, debouncedInput) : data;

  const eachPageData: GitHubUser[][] =
    Array.isArray(filteredData) && filteredData.length > 0
      ? paginate(filteredData, itemsPerPage)
      : [];

  useEffect(() => {
    if (!eachPageData || eachPageData.length === 0) return;

    const lastIndex: number = eachPageData.length - 1;
    if (page > lastIndex) {
      setPage(0);
    }
  }, [eachPageData.length, page]);

  let followers: GitHubUser[] = [];
  if (eachPageData && eachPageData.length > 0) {
    const lastIndex = eachPageData.length - 1;
    followers =
      (page <= lastIndex ? eachPageData[page] : eachPageData[0]) ?? [];
  }

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > eachPageData.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = eachPageData.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index: number) => {
    console.log("handle page clicked !!");
    setPage(index);
  };

  return {
    eachPageData,
    followers,
    page,
    nextPage,
    prevPage,
    handlePage,
  };
};
