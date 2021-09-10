import React from "react";
import {Link} from 'react-router-dom';

const SignUp = ()=>{
    return(
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Infinity</h2>
            <input type="text"
            placeholder="name"/>

            <input type="text"
            placeholder="email"/>
            
            <input type="password"
            placeholder="password"/>

            <button className="btn waves-effect waves-light #645f6 blur">
                Sign-Up
            </button>

            <h6>
                <Link to="/signin">Don't have an account? Sign-In</Link>
            </h6>

        </div>
    </div>
    )
}

export default SignUp;