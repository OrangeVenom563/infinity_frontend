import "./App.css";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
import NavBar from "./component/Navbar.component";
import Home from "./screens/Home.screen";
import SignIn from "./screens/SignIn.screen";
import SignUp from "./screens/SignUp.screen";
import Profile from "./screens/Profile.screen";
import CreatePost from "./screens/CreatePost.screen";
import { reducer, initialState } from "./reducers/userReducer";

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

// "proxy": "https://dry-wave-33980.herokuapp.com/",