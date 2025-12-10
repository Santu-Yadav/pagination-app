/* 17-11-2025 : implement case-insensitive prefix match */

import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { useDebounce } from "./useDebounce";

import SearchAndConfigHeader from "./components/SearchAndConfigHeader";
import FollowerList from "./components/FollowerList";
import { useFollowerPagination } from "./hooks/useFollowerPagination";

function App() {
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

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
    console.log("search box change @@@@@ : ", e.target.value);
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
