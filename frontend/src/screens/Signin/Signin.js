import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, selectAuth } from "../../redux/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Signin.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { userInfo, userError } = useSelector(selectAuth);

  let navigate = useNavigate();

  const submitRegister = (e) => {
    e.preventDefault();
    if (email && username && password === rePassword) {
      dispatch(register({ email, username, password }));
    } else {
      setError("All fields should be correctly filled!");
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
      <div className="credentials rounded-L bg-white shadow-sm py-4 px-4 d-block mx-auto">
        <h2 className="text-center">Sign In</h2>
        <form onSubmit={submitRegister}>
          <div className="d-flex flex-column">
            <input
              type="email"
              className="custom-input m-2 p-1 px-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="custom-input m-2 p-1 px-2"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="custom-input m-2 p-1 px-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="custom-input m-2 p-1 px-2"
              placeholder="Re-type password"
              onChange={(e) => setRePassword(e.target.value)}
            />
            <button type="submit" className="btn-blue m-2 py-1 rounded">
              Sign In
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

export default SignIn;
