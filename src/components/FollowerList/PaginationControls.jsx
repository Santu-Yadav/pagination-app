import Button from "./Button";

// interface paginationControlProps {
//   prevPage: () => voidl;
//   eachPageData: []; // array of objects
// }

const PaginationControl = ({
  prevPage,
  eachPageData,
  page,
  handlePage,
  nextPage,
}) => {
  return (
    <div className="btn-container">
      <Button className="prev-btn" onClick={prevPage}>
        prev
      </Button>

      {eachPageData.map((item, index) => {
        return (
          <Button
            className={`page-btn ${index === page ? "active-btn" : ""}`}
            key={index}
            onClick={() => handlePage(index)}
          >
            {index + 1}
          </Button>
        );
      })}
      <Button className="next-btn" onClick={nextPage}>
        next
      </Button>
    </div>
  );
};

export default PaginationControl;
