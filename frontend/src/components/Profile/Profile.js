import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth, update } from "../../redux/store/auth/authSlice";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [userImage, setUserImage] = useState("");
  const [type, setType] = useState("No");

  const dispatch = useDispatch();
  const { userInfo, userError } = useSelector(selectAuth);

  const updateProfile = (e) => {
    e.preventDefault();

    if (!email) {
      setError("you can't leave email field as empty!");
      return;
    }
    if ((password && !rePassword) || (rePassword && !password)) {
      setError("Please fill both password fields");
      return;
    }
    if (password !== rePassword) {
      setError("Both passwords should be same!");
      return;
    }

    const updateData = {
      email,
      phone,
      password,
      type,
      userImage,
    };

    dispatch(update(updateData));
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setEmail(userInfo.email);
      userInfo.phone ? setPhone(userInfo.phone) : "";
      setType(userInfo.type);
    }
    if (userError) {
      setError(userError);
    }
  }, [userInfo, userError]);

  return (
    <div className="py-4 px-4  mt-2 bg-white shadow-sm d-block mx-auto rounded-L">
      <h2 className="text-center">Profile</h2>
      <form onSubmit={updateProfile}>
        <div className="d-flex flex-column">
          <input
            type="email"
            className="custom-input m-2 p-1 px-2"
            value={email ? email : ""}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mx-2">Upload user image</label>
          <input
            type="file"
            className="custom-input m-2 p-1"
            onChange={(e) => setUserImage(e.target.files[0])}
          />
          <input
            type="text"
            value={phone ? phone : ""}
            placeholder="Phone"
            className="custom-input m-2 p-1 px-2"
            onChange={(e) => setPhone(e.target.value)}
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
          <div className="m-2 p-1 align-items-baseline d-flex justify-content-evenly">
            <label>Is this Shop ?</label>
            <input
              type="checkbox"
              className="checkbox"
              checked={type == "Yes" ? true : false}
              onChange={(e) =>
                e.target.checked ? setType("Yes") : setType("No")
              }
            />
            <p className="mb-0">{type}</p>
          </div>
          <button type="submit" className="btn-dark m-2 py-1 rounded">
            Update
          </button>
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

export default Profile;
