/* 17-11-2025 : implement case-insensitive prefix match */

import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

import paginate from "./utils";
import SearchAndConfigHeader from "./components/SearchAndConfigHeader";
import FollowerList from "./components/FollowerList";

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

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

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchInput]);

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

  const handleDropDownChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10) || 8);
  };

  const handleSearchBoxChange = (e) => {
    console.log("search box change @@@@@ : ", e.target.value);
    setSearchInput(e.target.value);
  };

  function matched(data, input) {
    if (!Array.isArray(data)) return [];

    const q = (input || "").trim().toLowerCase();
    if (q.length === 0) return data;

    return data.filter(({ login }) => {
      const loginLower = login.toLowerCase();

      if (q.length > loginLower.length) return false;

      for (let i = 0; i < q.length; i++) {
        if (q[i] !== loginLower[i]) return false;
      }

      return true;
    });
  }

  return (
    <main>
      <SearchAndConfigHeader
        searchInput={searchInput}
        handleSearchBoxChange={handleSearchBoxChange}
        eachPageDataLength={eachPageData.length}
        loading={loading}
        handleDropDownChange={handleDropDownChange}
        itemsPerPage={itemsPerPage}
      />

      <FollowerList
        followers={followers}
        loading={loading}
        eachPageData={eachPageData}
        handlePage={handlePage}
        prevPage={prevPage}
        nextPage={nextPage}
        page={page}
      />
    </main>
  );
}

export default App;
