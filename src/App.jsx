import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
import paginate from "./utils";

function App() {
  const { loading, data } = useFetch();
  const [eachPageData, setEachPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    if (loading) return;
    setEachPageData(paginate(data, itemsPerPage));
  }, [loading, data, itemsPerPage]);

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

  const handleDropDownChange = (e) => {
    console.log(" e.target.value @@ :", e.target.value);
    setItemsPerPage(parseInt(e.target.value, 10) || 8);
  };

  return (
    <main>
      <div className="section-title">
        <div>
          <h1>{loading ? "loading..." : "Followers"}</h1>
          {/* <div className="underline"></div> */}
        </div>

        {!loading && (
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
        {!loading && (
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
