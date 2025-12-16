import { useState, useEffect } from "react";
import { paginate, matched } from "../utils";

export const useFollowerPagination = (debouncedInput, data, itemsPerPage) => {
  const [page, setPage] = useState(0);

  const filteredData =
    debouncedInput.length !== 0 ? matched(data, debouncedInput) : data;

  const eachPageData =
    Array.isArray(filteredData) && filteredData.length > 0
      ? paginate(filteredData, itemsPerPage)
      : [];

  useEffect(() => {
    if (!eachPageData || eachPageData.length === 0) return;

    const lastIndex = eachPageData.length - 1;
    if (page > lastIndex) {
      setPage(0);
    }
  }, [eachPageData.length, page]);

  let followers = [];
  if (eachPageData && eachPageData.length > 0) {
    const lastIndex = eachPageData.length - 1;
    followers = page <= lastIndex ? eachPageData[page] : eachPageData[0];
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

  const handlePage = (index) => {
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
