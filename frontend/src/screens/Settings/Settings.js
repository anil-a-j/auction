import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectAuth, deleteUserImage } from "../../redux/store/auth/authSlice";
import "./Settings.scss";

import userImage from "../.././user-image.png";

import NavSettings from "../../components/Navigation/NavSettings";

const Settings = () => {
  const { userInfo } = useSelector(selectAuth);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div className="settings container-fluid">
      <div className="row fixed">
        <div className="col-md-3 px-0">
          <NavSettings />
        </div>
        <div className="col-md-6">
          <Outlet />
        </div>
        <div className="col-md-3 px-0">
          <div className="bg-white shadow-sm py-3 h-100">
            <img
              src={userInfo.image ? `/${userInfo.image}` : userImage}
              className="user-image d-block mx-auto shadow-sm"
            />
            {userInfo.image && (
              <button
                type="submit"
                onClick={() => {
                  let username = prompt("Are you sure?(type username)");
                  if (username == userInfo.username) {
                    dispatch(deleteUserImage());
                  }
                }}
                className="btn-dark m-2 py-1 rounded btn-dark border-0 mx-auto px-2 d-block"
              >
                Delete Image
              </button>
            )}

            <h6 className="text-center mt-1 fw-bold">{userInfo.username}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
