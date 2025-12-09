import Follower from "./../Follower";

const FollowerList = ({
  followers,
  loading,
  eachPageData,
  prevPage,
  nextPage,
  page,
}) => {
  return (
    <section className="followers">
      <div className="container">
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
  );
};

export default FollowerList;
