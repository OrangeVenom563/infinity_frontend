import React, {useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();

  const RenderList = () => {
    if(state){
      return [
        <li key="1"><Link to="/profile">Profile</Link></li>,
        <li key="2"><Link to="/createpost">Create Post</Link></li>,
        <li key="3"><a onClick={()=>{
          localStorage.clear(); 
          dispatch({type:"CLEAR"})
          history.push("/signin")
          }}>Logout</a></li>
      ]
    }
    else{
      return [
      <li key="4"><Link to="/signin">Sign-In</Link></li>,
      <li key="5"><Link to="/signup">Sign-up</Link></li>
    ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left"> Infinity </Link>
        {/* hide-on-med-and-down */}
        <ul id="nav-mobile" className="right ">
          <RenderList/>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
