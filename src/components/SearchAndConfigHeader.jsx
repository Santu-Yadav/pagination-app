const SearchAndConfigHeader = ({
  searchInput,
  handleSearchBoxChange,
  eachPageDataLength,
  loading,
  handleDropDownChange,
  itemsPerPage,
}) => {
  return (
    <div>
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
              : eachPageDataLength > 0
              ? "Followers"
              : "Please try again"}
          </h1>
        </div>

        {!loading && eachPageDataLength > 0 && (
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
    </div>
  );
};

export default SearchAndConfigHeader;
