import type React from "react";

interface ItemsPerPageSelectorType {
  handleDropDownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
}

const ItemsPerPageSelector = ({
  handleDropDownChange,
  itemsPerPage,
}: ItemsPerPageSelectorType): React.JSX.Element => {
  return (
    <div>
      <label htmlFor="test">Items per page</label>
      <select id="test" onChange={handleDropDownChange} value={itemsPerPage}>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
