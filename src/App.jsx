/* 17-11-2025 : implement case-insensitive prefix match */

import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
import paginate from "./utils";

function App() {
  const { loading, data } = useFetch();
  const [eachPageData, setEachPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    console.log(" *****Inside change debouncedInput****** ");
    if (loading) return;

    if (Array.isArray(data) && data.length > 0) {
      let filteredData =
        debouncedInput.length !== 0 ? matched(data, debouncedInput) : data;

      setEachPageData(paginate(filteredData, itemsPerPage));
    } else {
      setEachPageData([]);
    }
  }, [loading, data, itemsPerPage, debouncedInput]);

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
      <div className="search-box">
        <input
          className="search-box-style"
          value={searchInput}
          placeholder="Search"
          onChange={handleSearchBoxChange}
        />
      </div>
      <div className="section-title">
        <div>
          <h1>
            {loading
              ? "loading..."
              : eachPageData.length > 0
              ? "Followers"
              : "Please try again"}
          </h1>
        </div>

        {!loading && eachPageData.length > 0 && (
          <div>
            <label htmlFor="test">Items per page</label>
            <select
              id="test"
              onChange={handleDropDownChange}
              value={itemsPerPage}
            >
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
        )}
      </div>
      <section className="followers">
        <div className="container">
          {/* {console.log("followers @@ :", followers)} */}
          {followers &&
            followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
        </div>
        {!loading && eachPageData.length > 1 && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              prev
            </button>

            {eachPageData.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;

//----------------------------------------------------------------------------------
// {console.log(
//   "eachPageData @@@--######--@@@ :",
//   eachPageData.length
// )}
