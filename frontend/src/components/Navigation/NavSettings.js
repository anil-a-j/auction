import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import { switchActiveClass } from "../../services/services";

const NavSettings = () => {
  return (
    <ul className="nav sidebar bg-white shadow-sm flex-column">
      <li className="nav-item">
        <Link
          className="nav-link active"
          to="profile"
          onClick={switchActiveClass}
        >
          Profile
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          to="accountSettings"
          onClick={switchActiveClass}
        >
          Account settings
        </Link>
      </li>
    </ul>
  );
};

export default NavSettings;
