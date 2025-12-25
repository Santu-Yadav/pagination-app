import HeaderTitle from "./HeaderTitle.tsx";
import ItemsPerPageSelector from "./ItemsPerPageSelector.tsx";
import SearchBox from "./SearchBox.tsx";

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
