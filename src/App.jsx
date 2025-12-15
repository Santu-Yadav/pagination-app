/* 17-11-2025 : implement case-insensitive prefix match */

import { useFetch } from "./useFetch";
import Follower from "./Follower";
import { useRef, useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const followerRef = useRef();
  console.log("page--02 ### :", page);

  const { loading, data } = useFetch(9, page);

  const refFunction = (node) => {
    if (followerRef.current) {
      followerRef.current.disconnect();
    }

    followerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) followerRef.current.observe(node);
  };

  return (
    <main>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <section className="followers">
          <div className="container">
            {/* {console.log("followers @@ :", followers)} */}
            {data &&
              data.map((follower, index, array) => {
                return (
                  <Follower
                    refFunction={refFunction}
                    key={follower.id}
                    follower={follower}
                    index={index}
                    array={array}
                  />
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
