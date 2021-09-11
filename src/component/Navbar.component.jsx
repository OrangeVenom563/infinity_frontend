import React, {useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();

  const RenderList = () => {
    if(state){
      return [
        // <li><Link to="/">Home</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><a onClick={()=>{
          localStorage.clear(); 
          dispatch({type:"CLEAR"})
          history.push("/signin")
          }}>Logout</a></li>
      ]
    }
    else{
      return [
      <li><Link to="/signin">Sign-In</Link></li>,
      <li><Link to="/signup">Sign-up</Link></li>
    ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo"> Infinity </Link>
        {/* hide-on-med-and-down */}
        <ul id="nav-mobile" className="right ">
          <RenderList/>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
