import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectAuth } from "../../redux/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const LogIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { userInfo, userError } = useSelector(selectAuth);

  let navigate = useNavigate();

  const submitLogIn = (e) => {
    e.preventDefault();
    if (emailOrUsername && password) {
      dispatch(logIn({ emailOrUsername, password }));
    } else {
      setError("All Fields are required!");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (userError) {
      setError(userError);
    }
  }, [userInfo, userError]);

  return (
    <div className="fixed bg-image">
      <div className="credentials rounded-L py-4 shadow-sm bg-white px-4 d-block mx-auto">
        <h2 className="text-center">Log In</h2>
        <form onSubmit={submitLogIn}>
          <div className="d-flex flex-column">
            <input
              type="email"
              className="custom-input m-2 p-1 px-2"
              placeholder="Email"
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <input
              type="password"
              className="custom-input m-2 p-1 px-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-blue m-2 py-1 rounded">
              Log In
            </button>
            {error && (
              <p className="text-danger text-center small p-0 m-2 alert alert-danger">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
