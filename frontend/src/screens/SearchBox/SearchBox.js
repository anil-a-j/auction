import React from "react";
import Search from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { selectLocation } from "../../redux/store/location/locationSlice";
import searchCard from "../../components/searchCard/searchCard";

const SearchBox = () => {
  const { searchResult } = useSelector(selectLocation);
  return (
    <div className="offset-md-3 col-md-6">
      <Search />
      {searchResult &&
        searchResult.map((data, key) => {
          return <searchCard data={data} />;
        })}
    </div>
  );
};

export default SearchBox;
