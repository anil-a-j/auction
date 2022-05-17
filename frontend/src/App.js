import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import Home from "./screens/Home/Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./screens/LogIn/LogIn";
import SignIn from "./screens/Signin/Signin";
import About from "./screens/About/About";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkToken, selectAuth } from "./redux/store/auth/authSlice";
import SearchBox from "./screens/SearchBox/SearchBox";
import Settings from "./screens/Settings/Settings";
import Items from "./screens/Items/Items";
import Profile from "./components/Profile/Profile";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import AskItem from "./components/AskItem/AskItem";
import Requests from "./components/Requests/Requests";
import Responses from "./components/Responses/Responses";
import notFound from "./not_found.svg";

function App() {
  const dispatch = useDispatch();

  const { userStatus } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(checkToken());
  }, []);
  return (
    <div className="App">
      <Router>
        <NavHeader />
        {userStatus === "loading" ? (
          <h2 className="text-center mt-5 fst-italic">Loading...</h2>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBox />} />
            <Route path="/settings" element={<Settings />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="accountSettings" element={<AccountSettings />} />
            </Route>
            <Route path="/items" element={<Items />}>
              <Route index element={<AskItem />} />
              <Route path="askItem" element={<AskItem />} />
              <Route path="requests" element={<Requests />} />
              <Route path="responses" element={<Responses />} />
            </Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/aboutus" element={<About />} />
            <Route
              path="*"
              element={
                <div className="d-flex justify-content-center flex-column mt-5 pt-5">
                  <img src={notFound} width="300" className="mx-auto" />
                  <h1 className="text-center text-dark m-5 p-5">
                    We are missing that piece of information.!
                  </h1>
                </div>
              }
            />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
