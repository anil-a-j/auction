import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuth,
  deleteUserAccount,
} from "../../redux/store/auth/authSlice";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectAuth);
  return (
    <div className="py-4 px-4 mt-2 bg-white shadow-sm d-block mx-auto">
      <h2 className="text-center">Account Settings</h2>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <p className="m-0">
          Delete Account
          <br />
          <small>It's not retrievable!</small>
        </p>
        <button
          onClick={() => {
            let username = prompt(
              "Do you really want to delete account? (type username)"
            );
            if (username !== userInfo.username) return;
            dispatch(deleteUserAccount());
          }}
          className="btn-dark rounded p-2"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
