/* 17-11-2025 : implement case-insensitive prefix match */

import { useState, useEffect } from "react";

import SearchAndConfigHeader from "./components/SearchAndConfigHeader/SearchAndConfigHeader.js";
import FollowerList from "./components/FollowerList/FollowerList.js";

import { useFetch } from "./hooks/useFetch.tsx";
import { useFollowerPagination } from "./hooks/useFollowerPagination.jsx";
import { useDebounce } from "./hooks/useDebounce.jsx";

function App() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");

  const { loading, data } = useFetch();
  const debouncedString = useDebounce(searchInput, 1000);

  useEffect(() => {
    setDebouncedInput(debouncedString);
  }, [debouncedString]);

  const { followers, nextPage, prevPage, handlePage, eachPageData, page } =
    useFollowerPagination(debouncedInput, data, itemsPerPage);

  const handleDropDownChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10) || 8);
  };

  const handleSearchBoxChange = (e) => {
    setSearchInput(e.target.value);
  };

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
