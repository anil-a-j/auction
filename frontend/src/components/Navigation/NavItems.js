import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import { switchActiveClass } from "../../services/services";
const NavItems = () => {
  return (
    <ul className="nav sidebar bg-white shadow-sm flex-column ">
      <li className="nav-item">
        <Link
          className="nav-link active"
          to="askItem"
          onClick={switchActiveClass}
        >
          Ask Item
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="requests" onClick={switchActiveClass}>
          Requests
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="responses" onClick={switchActiveClass}>
          Responses
        </Link>
      </li>
    </ul>
  );
};

export default NavItems;
