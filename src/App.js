import "./App.css";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import NavBar from "./component/Navbar.component";
import Home from "./screens/Home.screen";
import SignIn from "./screens/SignIn.screen";
import SignUp from "./screens/SignUp.screen";
import Profile from "./screens/Profile.screen";
import CreatePost from "./screens/CreatePost.screen";
import UserProfile from "./screens/UserProfile";
import Reset from "./screens/Reset";
import NewPassword from "./screens/Newpassword";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {_,dispatch} = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({type:"USER",payload:user})
      history.push("/");
    } else {
      if(!history.location.pathname.startsWith('/reset'))
      history.push("/signin");
    }
  },[]);

  return (
    <Switch exact path="/">
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route exact path="/reset/:token">
        <NewPassword/>
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
