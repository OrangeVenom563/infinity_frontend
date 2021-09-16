import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from '../App'
import M from "materialize-css";

const SignIn = () => {
  const {_,dispatch} = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PostData = () => {
    if (!emailRegex.test(email)) 
      {
      M.toast({
        html: "Invalid Email Format",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch("https://dry-wave-33980.herokuapp.com/signin", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({password,email}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user",JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user})
          M.toast({ html:"Sign-In success", classes: "#43a047 green darken-1" });
          history.push("/");
        }
      })
      .catch(err=>{
        console.log(err)
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Infinity</h2>

        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light #645f6 blur"
          onClick={() => PostData()}
        >
          Sign-In
        </button>

        <h6>
          <Link to="/signup">Don't have an account? Sign-In</Link>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
