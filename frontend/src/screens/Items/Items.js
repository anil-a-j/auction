import React, { useEffect, useState } from "react";
import NavItems from "../../components/Navigation/NavItems";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectAuth } from "../../redux/store/auth/authSlice";
import "./Items.scss";

const Items = () => {
  const { userInfo } = useSelector(selectAuth);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div className="items container-fluid">
      <div className="row fixed">
        <div className="col-md-3 px-0">
          <NavItems />
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Items;
