const SearchBox = ({ searchInput, handleSearchBoxChange }) => {
  return (
    <div className="search-box">
      <input
        className="search-box-style"
        value={searchInput}
        placeholder="Search"
        onChange={handleSearchBoxChange}
      />
    </div>
  );
};

export default SearchBox;
