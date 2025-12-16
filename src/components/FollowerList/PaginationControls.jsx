const PaginationControl = ({
  prevPage,
  eachPageData,
  page,
  handlePage,
  nextPage,
}) => {
  return (
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
  );
};

export default PaginationControl;
