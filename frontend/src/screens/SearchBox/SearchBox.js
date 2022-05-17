import React from "react";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";
import SearchCard from "../../components/SearchCard/SearchCard";
import { selectItem } from "../../redux/store/item/itemSlice";

const SearchBox = () => {
  const { searchResult, searchResultStatus } = useSelector(selectItem);

  return (
    <div className="fixed bg-image">
      <div className="offset-md-3 col-md-6">
        <Search />
        {searchResult.length !== 0 &&
          searchResult.map((data, key) => {
            return <SearchCard key={key} data={data} />;
          })}
        {searchResultStatus === "loaded" && searchResult.length === 0 && (
          <div className="bg-white shadow-sm p-4">
            <p className="h4 text-center">No data available...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
