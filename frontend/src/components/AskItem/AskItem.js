import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCountries,
  selectLocation,
  loadStates,
} from "../../redux/store/location/locationSlice";
import {
  loadItemTypes,
  selectItem,
  askItem,
} from "../../redux/store/item/itemSlice";

const AskItem = () => {
  const [item, setItem] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [expireDate, setExpireDate] = useState();
  const [error, setError] = useState("");

  const current = new Date();

  const currentDate = useMemo(() => {
    return `${current.getFullYear()}-${("0" + (current.getMonth() + 1)).slice(
      -2
    )}-${("0" + current.getDate()).slice(-2)}`;
  }, []);

  const dispatch = useDispatch();
  const { countries, locationError, states } = useSelector(selectLocation);
  const { itemTypes, itemAskedError, itemAskedStatus } =
    useSelector(selectItem);

  const makeARequest = (e) => {
    e.preventDefault();
    if (item && description && itemType && country && state && expireDate) {
      setError("");
      const data = {
        itemRequest: item,
        description,
        itemType,
        country,
        state,
        expireDate,
      };
      dispatch(askItem(data));
    } else {
      setError("All fields are required");
    }
  };

  useEffect(() => {
    if (itemAskedError) {
      setError(itemAskedError);
    }
    if (locationError) {
      setError(locationError);
    }
    if (itemAskedStatus === "Request added") {
      setItem("");
      setItemType("");
      setDescription("");
      setCountry("");
      setState("");
      setExpireDate("");
      setError("");
    }
  }, [locationError, itemAskedError, itemAskedStatus]);

  useEffect(() => {
    dispatch(loadCountries());
    dispatch(loadItemTypes());
  }, []);

  return (
    <div className="py-4 w-75 px-4 mt-2 bg-white shadow-sm d-block ml-auto">
      <h2>Ask Item</h2>
      <form onSubmit={makeARequest}>
        <div className="d-flex flex-column">
          <input
            type="text"
            className="custom-input m-2 p-1 px-2"
            placeholder="Looking for..."
            onChange={(e) => setItem(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your description here"
            className="custom-input m-2 p-1 px-2"
            maxLength="1000"
            spellCheck="true"
            autoCapitalize="sentences"
            minLength="20"
            rows="10"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="d-flex flex-column mx-2">
            <select
              className="form-select my-2 custom-input rounded-0"
              onChange={(e) => setItemType(e.target.value)}
              required
            >
              <option value="">Choose Type</option>
              {itemTypes &&
                itemTypes.map((data, k) => {
                  return (
                    <option value={data._id} key={k}>
                      {data.itemGroup}
                    </option>
                  );
                })}
            </select>
            <select
              className="form-select my-2 custom-input rounded-0"
              onChange={(e) => setCountry(e.target.value)}
              onBlur={() => dispatch(loadStates(country))}
              required
            >
              <option value="">Choose Country</option>
              {countries &&
                countries.map((data, k) => {
                  return (
                    <option value={data._id} key={k}>
                      {data.country}
                    </option>
                  );
                })}
            </select>
            <select
              className="form-select my-2 custom-input rounded-0"
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Choose State</option>
              <option value="1">All</option>
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
          <div className="d-flex justify-content-end align-items-center">
            <label>Expires In</label>
            <input
              type="date"
              className="custom-input m-2 p-1"
              min={currentDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
            />
            <button type="submit" className="btn-blue mx-2 px-3 py-1 rounded">
              Send
            </button>
          </div>

          {error && (
            <p className="text-danger text-center small p-0 m-2 alert alert-danger">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AskItem;
