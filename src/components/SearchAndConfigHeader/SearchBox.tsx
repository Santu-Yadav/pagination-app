interface SearchBoxType {
  searchInput: string;
  handleSearchBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({
  searchInput,
  handleSearchBoxChange,
}: SearchBoxType): React.JSX.Element => {
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
