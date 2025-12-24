// verify later : Button has converted to .tsx but still this component is imporrting it as .jsx. why?

import React from "react";
import Button from "./Button.jsx";

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  [key: string]: any;
}

interface PaginationControlProps {
  prevPage: () => void;
  eachPageData: GitHubUser[][];
  page: number;
  handlePage: (i: number) => void;
  nextPage: () => void;
}

const PaginationControl = ({
  prevPage,
  eachPageData,
  page,
  handlePage,
  nextPage,
}: PaginationControlProps): React.JSX.Element => {
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
