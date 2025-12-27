import HeaderTitle from "./HeaderTitle.js";
import ItemsPerPageSelector from "./ItemsPerPageSelector.js";
import SearchBox from "./SearchBox.js";

type SearchAndConfigHeaderType = {
  searchInput: string;
  handleSearchBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  eachPageDataLength: number;
  loading: boolean;
  handleDropDownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
};

const SearchAndConfigHeader = ({
  searchInput,
  handleSearchBoxChange,
  eachPageDataLength,
  loading,
  handleDropDownChange,
  itemsPerPage,
}: SearchAndConfigHeaderType): React.JSX.Element => {
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
