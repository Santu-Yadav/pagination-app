import HeaderTitle from "./HeaderTitle";
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import SearchBox from "./searchBox";

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
      <SearchBox
        searchInput={searchInput}
        handleSearchBoxChange={handleSearchBoxChange}
      />

      <div className="section-title">
        <HeaderTitle
          loading={loading}
          eachPageDataLength={eachPageDataLength}
        />

        {!loading && eachPageDataLength > 0 && (
          <ItemsPerPageSelector
            handleDropDownChange={handleDropDownChange}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchAndConfigHeader;
