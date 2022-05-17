import React from "react";
import logo from "../.././logo.svg";
import "./Nav.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectAuth } from "../../redux/store/auth/authSlice";

const NavHeader = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(selectAuth);

  const logoutUser = () => {
    dispatch(logOut());
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm navbar-light bg-white">
      <div className="container-fluid">
        <a className="navbar-brand ms-2" href="#">
          <img src={logo} alt="logo" height="40" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {userInfo && (
              <li className="nav-item">
                <Link
                  className="nav-link btn-blue text-white rounded"
                  to="/items"
                >
                  Ask Items
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>

            {userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
            )}
            {!userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log in
                </Link>
              </li>
            )}
            {!userInfo && (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign in
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                About us
              </Link>
            </li>
            {userInfo && (
              <li className="nav-item">
                <a className="nav-link" onClick={logoutUser} href="#">
                  Log out
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;
