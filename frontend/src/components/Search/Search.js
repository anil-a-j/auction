import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCountries,
  loadStates,
  selectLocation,
} from "../../redux/store/location/locationSlice";
import {
  loadItemTypes,
  searchItems,
  selectItem,
} from "../../redux/store/item/itemSlice";
import "./Search.scss";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { countries, locationError, states } = useSelector(selectLocation);
  const { itemTypes } = useSelector(selectItem);

  const search = (e) => {
    e.preventDefault(e);
    if (searchQuery && type && country && state) {
      const searchData = { searchQuery, type, country, state };
      dispatch(searchItems(searchData));
      setError("");
    } else {
      setError("can't leave any fields as empty!");
    }
  };

  useEffect(() => {
    if (locationError) {
      setError(locationError);
    }
  }, [locationError]);

  useEffect(() => {
    dispatch(loadCountries());
    dispatch(loadItemTypes());
  }, []);

  return (
    <div className="search rounded-L bg-white shadow-sm p-4 mt-5">
      <h2 className="text-center">Search</h2>
      <form onSubmit={search}>
        <input
          type="text"
          className="search-box px-3 custom-input"
          placeholder="Search keywords"
          name="search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="row">
          <div className="col-md-4">
            <select
              className="form-select my-2 custom-input rounded-0"
              onChange={(e) => setType(e.target.value)}
            >
              <option defaultValue={0}>Choose Type</option>
              {itemTypes &&
                itemTypes.map((data, k) => {
                  return (
                    <option value={data._id} key={k}>
                      {data.itemGroup}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select my-2 custom-input rounded-0"
              onChange={(e) => setCountry(e.target.value)}
              onBlur={() => dispatch(loadStates(country))}
              required
            >
              <option defaultValue={0}>Choose Country</option>
              {countries &&
                countries.map((data, k) => {
                  return (
                    <option value={data._id} key={k}>
                      {data.country}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select my-2 custom-input rounded-0"
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option defaultValue={0}>Choose State</option>
              <option value="all">All</option>

              {states &&
                states.map((data, k) => {
                  return (
                    <option value={data} key={k}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <button type="submit" className="w-100 btn btn-blue py-1 rounded">
          Search
        </button>
        {error && (
          <p className="text-danger text-center small p-0 m-2 alert alert-danger">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Search;
