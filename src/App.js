import './App.css';
import NavBar from './component/Navbar.component';
import {Route} from 'react-router-dom';
import Home from './screens/Home.screen';
import SignIn from './screens/SignIn.screen';
import SignUp from './screens/SignUp.screen';
import Profile from './screens/Profile.screen';

function App() {
  return (
    <>
    <NavBar/>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/signin">
      <SignIn/>
    </Route>
    <Route exact path="/signup">
      <SignUp/>
    </Route>
    <Route exact path="/profile">
      <Profile/>
    </Route>
    </>
  );
}

export default App;
