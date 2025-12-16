import Follower from "../../Follower";
import PaginationControls from "./PaginationControls";

const FollowerList = ({
  followers,
  loading,
  eachPageData,
  prevPage,
  nextPage,
  page,
  handlePage,
}) => {
  if (loading) {
    return (
      <section className="followers">
        <div className="container">
          <p>Loading followers...</p>
        </div>
      </section>
    );
  }

  if (!followers || followers.length === 0) {
    return (
      <section className="followers">
        <div className="container">
          {/* You might make this message smarter based on whether a search filter is active */}
          <p>
            No followers found. Please try adjusting your search or try again
            later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="followers">
      <div className="container">
        {followers &&
          followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
      </div>
      {!loading && eachPageData.length > 1 && (
        <PaginationControls
          prevPage={prevPage}
          eachPageData={eachPageData}
          page={page}
          handlePage={handlePage}
          nextPage={nextPage}
        />
      )}
    </section>
  );
};

export default FollowerList;
